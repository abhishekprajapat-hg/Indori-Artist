import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    message: { type: String },
    status:{ type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },

    // ✅ Always tied to an Artist
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist", // references the Artist model
      required: true,
    },
  },
  { timestamps: true },
  
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
