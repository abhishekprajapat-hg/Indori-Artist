import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    bio: { type: String },
    image: { type: String }, // main profile image
    photos: [{ type: String }], // array of photo URLs
    videos: [{ type: String }], // array of video URLs
    price: { type: Number }, // optional
  },
  { timestamps: true }
);

export default mongoose.model("Artist", artistSchema);
