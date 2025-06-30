import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    isPublished: { type: Boolean, required: true },
  },
  { timestamps: true , versionKey: false }
);

const ImageModel = mongoose.model("Image", imageSchema);

export default ImageModel;
