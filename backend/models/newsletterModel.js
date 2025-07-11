import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
    isApproved: { type: Boolean, default: false }, 
  },
  { versionKey: false }
);

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

export default Newsletter;
