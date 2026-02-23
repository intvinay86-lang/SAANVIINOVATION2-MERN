import api from "./api";

export const uploadService = {
  // Upload image
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete image
  deleteImage: async (filename) => {
    const response = await api.delete(`/upload/image/${filename}`);
    return response.data;
  },

  // Get all images
  getAllImages: async () => {
    const response = await api.get("/upload/images");
    return response.data;
  },
};
