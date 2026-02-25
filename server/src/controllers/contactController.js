import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Contact from "../models/Contact.js";

// @desc    Get all contacts
// @route   GET /api/v1/contacts
// @access  Private
export const getAllContacts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, status } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { subject: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  const contacts = await Contact.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await Contact.countDocuments(query);

  res.status(200).json(
    new ApiResponse(200, "Contacts retrieved successfully", {
      contacts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    }),
  );
});

// @desc    Get contact by ID
// @route   GET /api/v1/contacts/:id
// @access  Private
export const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Contact retrieved successfully", contact));
});

// @desc    Create new contact
// @route   POST /api/v1/contacts
// @access  Public
export const createContact = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  const contact = await Contact.create({
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Contact message sent successfully", contact));
});

// @desc    Update contact
// @route   PUT /api/v1/contacts/:id
// @access  Private
export const updateContact = asyncHandler(async (req, res) => {
  const { status, isRead } = req.body;

  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  if (status !== undefined) contact.status = status;
  if (isRead !== undefined) contact.isRead = isRead;

  await contact.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Contact updated successfully", contact));
});

// @desc    Delete contact
// @route   DELETE /api/v1/contacts/:id
// @access  Private
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  await contact.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, "Contact deleted successfully", null));
});

// @desc    Get contact statistics
// @route   GET /api/v1/contacts/stats
// @access  Private
export const getContactStats = asyncHandler(async (req, res) => {
  const stats = await Contact.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const total = await Contact.countDocuments();
  const unread = await Contact.countDocuments({ isRead: false });

  res.status(200).json(
    new ApiResponse(200, "Contact statistics retrieved successfully", {
      total,
      unread,
      byStatus: stats,
    }),
  );
});
