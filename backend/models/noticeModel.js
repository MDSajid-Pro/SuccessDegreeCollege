import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Exams', 'Events', 'News', 'Admissions', 'General'] // Optional: restrict categories
  },
  date: { 
    type: String, 
    required: true 
  },
  link: { 
    type: String, 
    default: '#' 
  },
  isNewBadge: { 
    type: Boolean, 
    default: true 
  },
}, { timestamps: true },{ versionKey: false }); // Automatically adds createdAt and updatedAt

const Notice = mongoose.model('notice', noticeSchema);

export default Notice;
