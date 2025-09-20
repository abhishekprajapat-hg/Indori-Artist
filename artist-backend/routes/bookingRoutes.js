import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// Create a new booking for an artist
router.post("/:artistId", async (req, res) => {
  try {
    const { artistId } = req.params;
    const { name, email, date, message } = req.body;

    const booking = new Booking({
      name,
      email,
      date,
      message,
      artist: artistId, // ✅ linked to artist
    });

    await booking.save();
    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
