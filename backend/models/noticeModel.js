import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Exams', 'Events', 'News', 'Admissions', 'General']
  },
  date: { 
    type: String, 
    required: true 
  },
  pdfUrl: { 
    type: String, 
    required: true // Saved document path or Cloudinary asset link
  },
  isNewBadge: { 
    type: Boolean, 
    default: true 
  },
}, { 
  timestamps: true, 
  versionKey: false 
});

const Notice = mongoose.model('notice', noticeSchema);

export default Notice;