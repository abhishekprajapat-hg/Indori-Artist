import express from "express";
import Booking from "../models/Booking.js";
import Admin from "../models/Admin.js";
import Artist from "../models/artist.js";   // ✅ import Artist model
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { protectAdmin } from "../middleware/adminAuth.js"; // ✅ for protection

const router = express.Router();

// ----------------- Admin Login -----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ----------------- Bookings -----------------
router.get("/bookings", protectAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("artist");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.put("/bookings/:id/approve", protectAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to approve booking" });
  }
});

router.delete("/bookings/:id", protectAdmin, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// ----------------- Artists Management -----------------
router.get("/artists", protectAdmin, async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch artists" });
  }
});

router.post("/artists", protectAdmin, async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: "Failed to add artist" });
  }
});

router.put("/artists/:id", protectAdmin, async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: "Failed to update artist" });
  }
});

router.delete("/artists/:id", protectAdmin, async (req, res) => {
  try {
    await Artist.findByIdAndDelete(req.params.id);
    res.json({ message: "Artist deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete artist" });
  }
});

export default router;
