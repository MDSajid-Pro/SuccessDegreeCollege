import mongoose from 'mongoose'

const newsletterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
},{ versionKey: false });

const newsletterModel = mongoose.model("Newsletter", newsletterSchema);

export default newsletterModel;