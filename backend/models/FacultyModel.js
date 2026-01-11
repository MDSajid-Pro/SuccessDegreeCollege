import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g., Dean, HOD, Assistant Professor
  dept: { type: String, required: true }, // e.g., Computer Science, Sciences
  bio: { type: String, required: true },
  email: { type: String, required: true },
  qualification: { type: String, required: true },
  linkedin: { type: String, default: "" }, // Optional
}, { timestamps: true });

const FacultyModel = mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);

export default FacultyModel;