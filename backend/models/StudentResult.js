import mongoose from 'mongoose';

const studentResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  year: { type: String, required: true }, // e.g., "2024-25"
  percentage: { type: Number, required: true },
  grade: { type: String, required: true }, // e.g., "Distinction"
}, { timestamps: true },{ versionKey: false });

export default mongoose.model('StudentResult', studentResultSchema);