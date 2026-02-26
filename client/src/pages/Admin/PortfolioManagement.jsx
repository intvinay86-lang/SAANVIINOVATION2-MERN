import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiSave,
  FiExternalLink,
  FiRefreshCw,
  FiUpload,
  FiImage,
} from "react-icons/fi";
import {
  getMainSiteData,
  updateSiteDataSection,
} from "../../features/siteData/siteDataSlice";
import {
  selectSiteData,
  selectSiteDataLoading,
} from "../../features/siteData/siteDataSelectors";
import { getFullImageUrl } from "../../utils/imageUtils";
import { useImageUpload } from "../../hooks/useImageUpload";

function PortfolioManagement() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    fullDescription: "",
    image: "",
    technologies: "",
    features: "",
    liveUrl: "",
  });

  // Image upload hook
  const projectImageUpload = useImageUpload({
    onUploadSuccess: (url) => {
      setFormData((prev) => ({ ...prev, image: url }));
    },
    onDeleteSuccess: () => {
      setFormData((prev) => ({ ...prev, image: "" }));
      setImagePreview("");
    },
    saveSuccessMessage: "Project image uploaded successfully",
  });

  useEffect(() => {
    loadPortfolioProjects();
  }, []);

  // Update image preview when formData.image changes
  useEffect(() => {
    if (formData.image && formData.image.trim()) {
      setImagePreview(getFullImageUrl(formData.image));
    } else {
      setImagePreview("");
    }
  }, [formData.image]);

  useEffect(() => {
    if (siteData !== null) {
      const portfolioProjects = siteData?.portfolioProjects || [];
      setProjects(portfolioProjects);
      setIsFetching(false);
    }
  }, [siteData]);

  const loadPortfolioProjects = async () => {
    setIsFetching(true);
    try {
      await dispatch(getMainSiteData()).unwrap();
    } catch (error) {
      if (error !== "Failed to fetch site data") {
        toast.error("Failed to load portfolio projects");
      }
      setIsFetching(false);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || "",
        category: project.category || "",
        description: project.description || "",
        fullDescription: project.fullDescription || "",
        image: project.image || "",
        technologies: Array.isArray(project.technologies)
          ? project.technologies.join(", ")
          : "",
        features: Array.isArray(project.features)
          ? project.features.join("\n")
          : "",
        liveUrl: project.liveUrl || "",
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        category: "",
        description: "",
        fullDescription: "",
        image: "",
        technologies: "",
        features: "",
        liveUrl: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that image is uploaded
    if (!formData.image || !formData.image.trim()) {
      toast.error("Please upload a project image");
      return;
    }

    const newProject = {
      id: editingProject ? editingProject.id : Date.now(),
      title: formData.title,
      category: formData.category,
      description: formData.description,
      fullDescription: formData.fullDescription,
      image: formData.image,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech),
      features: formData.features
        .split("\n")
        .map((feature) => feature.trim())
        .filter((feature) => feature),
      liveUrl: formData.liveUrl,
    };

    let updatedProjects;
    if (editingProject) {
      updatedProjects = projects.map((p) =>
        p.id === editingProject.id ? newProject : p,
      );
    } else {
      updatedProjects = [...projects, newProject];
    }

    try {
      await dispatch(
        updateSiteDataSection({
          section: "portfolioProjects",
          data: updatedProjects,
        }),
      ).unwrap();

      toast.success(
        editingProject
          ? "Project updated successfully!"
          : "Project added successfully!",
      );
      setProjects(updatedProjects);
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to save project");
      console.error("Save error:", error);
    }
  };

  const handleRemoveProjectImage = async () => {
    const currentImageUrl = formData.image;
    if (currentImageUrl && currentImageUrl.trim()) {
      await projectImageUpload.handleDeleteImage(currentImageUrl);
    } else {
      setFormData((prev) => ({ ...prev, image: "" }));
      setImagePreview("");
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    const updatedProjects = projects.filter((p) => p.id !== projectId);

    try {
      await dispatch(
        updateSiteDataSection({
          section: "portfolioProjects",
          data: updatedProjects,
        }),
      ).unwrap();

      toast.success("Project deleted successfully!");
      setProjects(updatedProjects);
    } catch (error) {
      toast.error("Failed to delete project");
      console.error("Delete error:", error);
    }
  };

  const handleRefresh = () => {
    loadPortfolioProjects();
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Portfolio Management
            </h1>
            <p className="text-gray-600">
              Manage your portfolio projects - add, edit, or delete projects
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
              title="Refresh data"
            >
              <FiRefreshCw />
              Refresh
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2"
            >
              <FiPlus />
              Add Project
            </button>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technologies
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No projects found. Click "Add Project" to create one.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={getFullImageUrl(project.image)}
                        alt={project.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {project.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {project.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {project.technologies?.slice(0, 3).join(", ")}
                        {project.technologies?.length > 3 && "..."}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900"
                            title="View Live"
                          >
                            <FiExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleOpenModal(project)}
                          className="text-orange-600 hover:text-orange-900"
                          title="Edit"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="E-commerce Platform"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Web Development"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Brief description for the card view"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Detailed description for the project details page"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiImage className="inline mr-1" />
                    Project Image <span className="text-red-500">*</span>
                  </label>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-3">
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Project Image Preview"
                          className="h-48 w-auto max-w-full border-2 border-gray-300 rounded-lg object-cover bg-white shadow-sm"
                          onError={(e) => {
                            e.target.style.display = "none";
                            toast.error("Failed to load image preview");
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleRemoveProjectImage}
                          disabled={projectImageUpload.isDeleting}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove image"
                        >
                          {projectImageUpload.isDeleting ? (
                            <div className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <FiX size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div>
                    <input
                      type="file"
                      ref={projectImageUpload.fileInputRef}
                      onChange={projectImageUpload.handleFileSelect}
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={projectImageUpload.triggerFileInput}
                      disabled={projectImageUpload.isUploading}
                      className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      {projectImageUpload.isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <FiUpload size={16} />
                          <span>
                            {imagePreview ? "Change Image" : "Upload Image"}
                          </span>
                        </>
                      )}
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      Supported formats: JPEG, PNG, GIF, WEBP, SVG (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Technical Details
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="React, Node.js, MongoDB, Stripe (comma separated)"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate technologies with commas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Features <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="One feature per line&#10;Responsive design for all devices&#10;Secure payment processing&#10;Real-time inventory management"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    One feature per line
                  </p>
                </div>
              </div>

              {/* Project Links */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Project Links
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave />
                      <span>
                        {editingProject ? "Update" : "Create"} Project
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioManagement;
