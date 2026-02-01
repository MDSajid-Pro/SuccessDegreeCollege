import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    trim: true
  },
  course: {
    type: String,
    required: [true, 'Please select a course'],
    enum: ['B.Sc', 'B.A', 'B.Com', 'B.C.A', 'Undecided'] 
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Done', 'Not Done'], 
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;