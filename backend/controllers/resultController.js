import StudentResult from '../models/studentResult.js';

// Get all students
export const getResults = async (req, res) => {
  try {
    const results = await StudentResult.find().sort({ percentage: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new student
export const addResult = async (req, res) => {
  try {
    const newResult = await StudentResult.create(req.body);
    res.status(201).json(newResult);
  } catch (error) {
    // Check if the error is a Duplicate Key Error (MongoDB code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Registration Number already exists. Please use a unique Reg No." 
      });
    }

    // Handle other validation errors
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update student
export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResult = await StudentResult.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedResult) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(updatedResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete student
export const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    await StudentResult.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};