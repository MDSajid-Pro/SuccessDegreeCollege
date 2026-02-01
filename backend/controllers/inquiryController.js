import Inquiry from '../models/Inquiry.js'

// @desc    Create a new inquiry (User Form Submission)
// @route   POST /api/inquiries
export const createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    
    res.status(201).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all inquiries (For Admin Dashboard)
// @route   GET /api/inquiries
export const getInquiries = async (req, res) => {
  try {
    // Sort by newest first so recent inquiries appear at the top
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update inquiry status (e.g., Mark as Done/Not Done)
// @route   PUT /api/inquiries/:id
export const updateInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated object
      runValidators: true // Ensure status is valid
    });

    if (!inquiry) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }

    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete an inquiry
// @route   DELETE /api/inquiries/:id
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};