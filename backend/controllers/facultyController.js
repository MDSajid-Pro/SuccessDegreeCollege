import FacultyModel from "../models/facultyModel.js";

// @desc    Add new faculty
// @route   POST /api/faculty
export const addFaculty = async (req, res) => {
  try {
    const newFaculty = await FacultyModel.create(req.body);
    res.status(201).json({ success: true, message: "Faculty added successfully", faculty: newFaculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all faculty
// @route   GET /api/faculty
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await FacultyModel.find().sort({ createdAt: -1 });
    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update faculty
// @route   PUT /api/faculty/:id
export const updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await FacultyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFaculty) return res.status(404).json({ success: false, message: "Faculty not found" });
    res.json({ success: true, message: "Updated successfully", faculty: updatedFaculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete faculty
// @route   DELETE /api/faculty/:id
export const deleteFaculty = async (req, res) => {
  try {
    await FacultyModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Faculty member deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderFaculty = async (req, res) => {
    try {
        const { updates } = req.body; // Expecting an array: [{ id: "...", order: 0 }, ...]

        if (!updates || !Array.isArray(updates)) {
            return res.status(400).json({ success: false, message: "Invalid data format" });
        }

        // Prepare bulk operations
        const bulkOps = updates.map((item) => ({
            updateOne: {
                filter: { _id: item.id },
                update: { $set: { order: item.order } }
            }
        }));

        // Execute all updates in database
        await FacultyModel.bulkWrite(bulkOps);

        return res.status(200).json({ success: true, message: "Faculty reordered successfully" });

    } catch (error) {
        console.error("Reorder Error:", error);
        return res.status(500).json({ success: false, message: "Server Error during reordering" });
    }
};