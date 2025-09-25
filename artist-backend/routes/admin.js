import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Admin from "../models/Admin.js";
import Artist from "../models/Artist.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { protectAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

//
// ----------------- ADMIN LOGIN -----------------
//
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//
// ----------------- BOOKINGS -----------------
//
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

//
// ----------------- ARTISTS -----------------
//

// ✅ Reorder route hamesha pehle rakho
router.put("/artists/reorder", protectAdmin, async (req, res) => {
  try {
    const { category, updates } = req.body; // frontend se category bhi milegi

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    const bulkOps = updates.map((u) => ({
      updateOne: {
        filter: { _id: u.id, category }, // ✅ ensure same category
        update: { $set: { order: u.order } },
      },
    }));

    if (bulkOps.length > 0) {
      await Artist.bulkWrite(bulkOps);
    }

    res.json({ message: `Artists in ${category} reordered successfully` });
  } catch (err) {
    console.error("Reorder error:", err);
    res.status(500).json({ error: err.message });
  }
});


// Get all artists (with optional category filter)
router.get("/artists", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const artists = await Artist.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(artists);
  } catch (err) {
    console.error("Public get artists error:", err.message);
    res.status(500).json({ error: "Failed to fetch artists" });
  }
});

// Add new artist
router.post("/artists", protectAdmin, async (req, res) => {
  try {
    const lastArtist = await Artist.findOne().sort({ order: -1 });
    const nextOrder = lastArtist ? lastArtist.order + 1 : 0;

    const artist = new Artist({
      ...req.body,
      order: nextOrder,
    });

    await artist.save();
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: "Failed to add artist" });
  }
});

// Update artist
router.put("/artists/:id", protectAdmin, async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    res.json(artist);
  } catch (err) {
    console.error("Update artist error:", err.message);
    res.status(500).json({ error: "Failed to update artist" });
  }
});

// Delete artist
router.delete("/artists/:id", protectAdmin, async (req, res) => {
  try {
    await Artist.findByIdAndDelete(req.params.id);
    res.json({ message: "Artist deleted" });
  } catch (err) {
    console.error("Delete artist error:", err.message);
    res.status(500).json({ error: "Failed to delete artist" });
  }
});

export default router;
