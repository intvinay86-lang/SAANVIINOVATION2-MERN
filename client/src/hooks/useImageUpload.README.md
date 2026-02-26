# useImageUpload Hook

A generic, reusable React hook for handling image uploads and deletions with automatic form saving integration.

## Features

- ✅ Image upload with validation (file type, size)
- ✅ Image deletion from server
- ✅ Automatic form saving after upload/delete
- ✅ Loading states for upload and delete operations
- ✅ Toast notifications for success/error
- ✅ File input management
- ✅ Filename extraction from URLs

## Installation

The hook is already available in `client/src/hooks/useImageUpload.js`

## Basic Usage

```jsx
import { useImageUpload } from "../../hooks/useImageUpload";
import { getFullImageUrl } from "../../utils/imageUtils";

function MyComponent() {
  const { setValue, watch } = useForm();
  const imageUrl = watch("imageUrl");

  const {
    isUploading,
    isDeleting,
    fileInputRef,
    handleFileSelect,
    handleDeleteImage,
    triggerFileInput,
  } = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("imageUrl", url);
    },
    onDeleteSuccess: () => {
      setValue("imageUrl", "");
    },
    onSaveForm: async () => {
      const formData = watch();
      await saveFormData(formData);
    },
    saveSuccessMessage: "Changes saved successfully", // Custom message
  });

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Image preview with delete button */}
      {imageUrl && (
        <div className="relative inline-block">
          <img src={getFullImageUrl(imageUrl)} alt="Preview" />
          <button
            type="button"
            onClick={() => handleDeleteImage(imageUrl)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Remove"}
          </button>
        </div>
      )}

      {/* Upload button */}
      <button type="button" onClick={triggerFileInput} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}
```

## API Reference

### Hook Options

```typescript
useImageUpload({
  onUploadSuccess?: (url: string) => void,
  onDeleteSuccess?: () => void,
  onSaveForm?: () => Promise<void>,
  saveSuccessMessage?: string,
  maxSizeMB?: number,
  allowedTypes?: string[]
})
```

#### Parameters

- `onUploadSuccess` - Callback function called after successful upload with the uploaded image URL
- `onDeleteSuccess` - Callback function called after successful deletion
- `onSaveForm` - Async function to save the entire form after upload/delete operations
- `saveSuccessMessage` - Custom success message shown after form save (default: "Changes saved successfully")
- `maxSizeMB` - Maximum file size in megabytes (default: 5)
- `allowedTypes` - Array of allowed MIME types (default: common image formats)

#### Returns

```typescript
{
  // State
  isUploading: boolean,
  isDeleting: boolean,

  // Refs
  fileInputRef: RefObject<HTMLInputElement>,

  // Methods
  handleFileSelect: (event: Event) => Promise<void>,
  handleDeleteImage: (imageUrl: string) => Promise<void>,
  triggerFileInput: () => void,
  resetFileInput: () => void,
  extractFilename: (url: string) => string | null
}
```

## Complete Example: HomeSettings Page

```jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiUpload, FiX } from "react-icons/fi";
import { updateSiteDataSection } from "../../features/siteData/siteDataSlice";
import { getFullImageUrl } from "../../utils/imageUtils";
import { useImageUpload } from "../../hooks/useImageUpload";

function HomeSettings() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      heroTitle: "",
      heroSubtitle: "",
      heroImage: "",
    },
  });

  const heroImage = watch("heroImage");

  // Initialize image upload hook
  const {
    isUploading,
    isDeleting,
    fileInputRef,
    handleFileSelect,
    handleDeleteImage,
    triggerFileInput,
  } = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("heroImage", url);
    },
    onDeleteSuccess: () => {
      setValue("heroImage", "");
    },
    onSaveForm: async () => {
      const formData = watch();
      await saveFormData(formData);
    },
    saveSuccessMessage: "Home settings saved successfully",
  });

  // Generic function to save form data
  const saveFormData = async (data) => {
    try {
      const cleanedData = {
        heroTitle: data.heroTitle?.trim() || "",
        heroSubtitle: data.heroSubtitle?.trim() || "",
        heroImage: data.heroImage?.trim() || "",
      };

      await dispatch(
        updateSiteDataSection({ section: "home", data: cleanedData }),
      ).unwrap();

      toast.success("Home settings saved successfully");
    } catch (error) {
      toast.error(error || "Failed to save home settings");
      throw error;
    }
  };

  const handleRemoveImage = async () => {
    const currentImage = heroImage;
    if (currentImage && currentImage.trim()) {
      await handleDeleteImage(currentImage);
    } else {
      setValue("heroImage", "");
    }
  };

  const onSubmit = async (data) => {
    await saveFormData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Hero Title</label>
        <input type="text" {...register("heroTitle")} />
      </div>

      <div>
        <label>Hero Subtitle</label>
        <input type="text" {...register("heroSubtitle")} />
      </div>

      <div>
        <label>Hero Image</label>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />

        {/* Image preview */}
        {heroImage && (
          <div className="relative inline-block mb-4">
            <img
              src={getFullImageUrl(heroImage)}
              alt="Hero preview"
              className="h-32 w-auto border rounded"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isDeleting}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiX size={16} />
              )}
            </button>
          </div>
        )}

        {/* Upload button */}
        <button
          type="button"
          onClick={triggerFileInput}
          disabled={isUploading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isUploading ? (
            <>
              <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            <>
              <FiUpload className="inline mr-2" />
              {heroImage ? "Change Image" : "Upload Image"}
            </>
          )}
        </button>
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
}

export default HomeSettings;
```

## Multiple Images Example

For handling multiple images (like a gallery), you can use the hook multiple times or create instances for each image:

```jsx
function GallerySettings() {
  const { setValue, watch } = useForm({
    defaultValues: {
      image1: "",
      image2: "",
      image3: "",
    },
  });

  // Create separate instances for each image
  const image1Upload = useImageUpload({
    onUploadSuccess: (url) => setValue("image1", url),
    onDeleteSuccess: () => setValue("image1", ""),
    onSaveForm: async () => await saveFormData(watch()),
  });

  const image2Upload = useImageUpload({
    onUploadSuccess: (url) => setValue("image2", url),
    onDeleteSuccess: () => setValue("image2", ""),
    onSaveForm: async () => await saveFormData(watch()),
  });

  const image3Upload = useImageUpload({
    onUploadSuccess: (url) => setValue("image3", url),
    onDeleteSuccess: () => setValue("image3", ""),
    onSaveForm: async () => await saveFormData(watch()),
  });

  return (
    <div>
      {/* Image 1 */}
      <ImageUploadField
        label="Image 1"
        imageUrl={watch("image1")}
        uploadHook={image1Upload}
      />

      {/* Image 2 */}
      <ImageUploadField
        label="Image 2"
        imageUrl={watch("image2")}
        uploadHook={image2Upload}
      />

      {/* Image 3 */}
      <ImageUploadField
        label="Image 3"
        imageUrl={watch("image3")}
        uploadHook={image3Upload}
      />
    </div>
  );
}

// Reusable component
function ImageUploadField({ label, imageUrl, uploadHook }) {
  const {
    isUploading,
    isDeleting,
    fileInputRef,
    handleFileSelect,
    handleDeleteImage,
    triggerFileInput,
  } = uploadHook;

  return (
    <div>
      <label>{label}</label>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {imageUrl && (
        <div className="relative inline-block">
          <img src={getFullImageUrl(imageUrl)} alt={label} />
          <button
            type="button"
            onClick={() => handleDeleteImage(imageUrl)}
            disabled={isDeleting}
          >
            Remove
          </button>
        </div>
      )}

      <button type="button" onClick={triggerFileInput} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
```

## Key Features Explained

### 1. Generic Success Messages

You can customize the success message shown after form save:

```jsx
useImageUpload({
  saveSuccessMessage: "Changes saved successfully", // Generic message
  onSaveForm: async () => {
    await saveFormData(watch());
  },
});
```

The hook will show:

- Your custom `saveSuccessMessage` when `onSaveForm` is provided
- "Image uploaded successfully" when no `onSaveForm` (upload only)
- "Image deleted successfully" when no `onSaveForm` (delete only)

This allows you to use generic messages like "Changes saved successfully" instead of page-specific messages.

### 2. Automatic Form Saving

When you provide `onSaveForm`, the hook automatically saves the entire form after successful upload or deletion:

```jsx
onSaveForm: async () => {
  const formData = watch(); // Get all form values
  await saveFormData(formData); // Save to backend
};
```

### 3. Image Deletion

The hook extracts the filename from the URL and calls the delete API:

```jsx
// Handles URLs like: /uploads/image-123.jpg
await handleDeleteImage("/uploads/image-123.jpg");
```

### 4. Validation

Built-in validation for:

- File type (only images)
- File size (configurable, default 5MB)

### 5. Loading States

Track upload and delete operations:

```jsx
{
  isUploading && <Spinner />;
}
{
  isDeleting && <Spinner />;
}
```

## Best Practices

1. Always provide `onSaveForm` to ensure data consistency
2. Use `getFullImageUrl()` for displaying images
3. Handle both upload and delete in the same flow
4. Show loading states to improve UX
5. Reset file input after upload to allow re-uploading the same file
6. Use the hidden file input pattern for custom upload buttons

## Error Handling

The hook automatically handles errors and shows toast notifications. Errors are also re-thrown in `onSaveForm` so you can handle them if needed:

```jsx
onSaveForm: async () => {
  try {
    await saveFormData(watch());
  } catch (error) {
    // Handle error if needed
    console.error("Save failed:", error);
  }
};
```

## Notes

- The hook uses the `uploadService` from `client/src/features/upload/uploadService.js`
- Toast notifications are handled automatically via `react-hot-toast`
- File input is automatically reset after upload
- The hook is fully typed and provides IntelliSense support
