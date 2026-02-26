import { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { uploadService } from "../features/upload/uploadService";

/**
 * Generic hook for handling image upload and deletion with form integration
 * @param {Object} options - Configuration options
 * @param {Function} options.onUploadSuccess - Callback after successful upload (receives url)
 * @param {Function} options.onDeleteSuccess - Callback after successful deletion
 * @param {Function} options.onSaveForm - Function to save the entire form after upload/delete
 * @param {string} options.saveSuccessMessage - Custom success message after form save (default: "Changes saved successfully")
 * @param {number} options.maxSizeMB - Maximum file size in MB (default: 5)
 * @param {string[]} options.allowedTypes - Allowed MIME types
 * @returns {Object} - Upload utilities and state
 */
export const useImageUpload = ({
  onUploadSuccess,
  onDeleteSuccess,
  onSaveForm,
  saveSuccessMessage = "Changes saved successfully",
  maxSizeMB = 5,
  allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ],
} = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef(null);

  /**
   * Extract filename from URL
   * @param {string} url - Image URL
   * @returns {string|null} - Filename or null
   */
  const extractFilename = useCallback((url) => {
    if (!url) return null;

    // Handle /uploads/filename.ext format
    const match = url.match(/\/uploads\/([^/?#]+)/);
    return match ? match[1] : null;
  }, []);

  /**
   * Handle file selection and upload
   * @param {Event} event - File input change event
   */
  const handleFileSelect = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only image files are allowed (JPEG, PNG, GIF, WEBP, SVG)");
        return;
      }

      // Validate file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        toast.error(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      setIsUploading(true);
      try {
        const response = await uploadService.uploadImage(file);
        if (response.success) {
          const uploadedUrl = response.data.url;

          // Call success callback
          if (onUploadSuccess) {
            onUploadSuccess(uploadedUrl);
          }

          // Save form after upload if callback provided
          if (onSaveForm) {
            await onSaveForm();
            toast.success(saveSuccessMessage);
          } else {
            toast.success("Image uploaded successfully");
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to upload image");
      } finally {
        setIsUploading(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [allowedTypes, maxSizeMB, onUploadSuccess, onSaveForm, saveSuccessMessage],
  );

  /**
   * Handle image deletion
   * @param {string} imageUrl - URL of the image to delete
   */
  const handleDeleteImage = useCallback(
    async (imageUrl) => {
      if (!imageUrl) return;

      const filename = extractFilename(imageUrl);
      if (!filename) {
        toast.error("Invalid image URL");
        return;
      }

      setIsDeleting(true);
      try {
        const response = await uploadService.deleteImage(filename);
        if (response.success) {
          // Call success callback
          if (onDeleteSuccess) {
            onDeleteSuccess();
          }

          // Save form after deletion if callback provided
          if (onSaveForm) {
            await onSaveForm();
            toast.success(saveSuccessMessage);
          } else {
            toast.success("Image deleted successfully");
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete image");
      } finally {
        setIsDeleting(false);
      }
    },
    [extractFilename, onDeleteSuccess, onSaveForm, saveSuccessMessage],
  );

  /**
   * Trigger file input click
   */
  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  /**
   * Reset file input
   */
  const resetFileInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return {
    // State
    isUploading,
    isDeleting,

    // Refs
    fileInputRef,

    // Methods
    handleFileSelect,
    handleDeleteImage,
    triggerFileInput,
    resetFileInput,
    extractFilename,
  };
};
