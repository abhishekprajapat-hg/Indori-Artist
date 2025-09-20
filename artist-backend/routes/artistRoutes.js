import express from "express";
import Artist from "../models/Artist.js";

const router = express.Router();

// @desc Get all artists (with optional category filter)
// @route GET /api/artists
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let artists;

    if (category) {
      artists = await Artist.find({ category });
    } else {
      artists = await Artist.find();
    }

    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// @desc Get single artist by ID
// @route GET /api/artists/:id
router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// @desc Create a new artist
// @route POST /api/artists
router.post("/", async (req, res) => {
  try {
    const { name, category, bio, image, photos, videos, price } = req.body;

    const newArtist = new Artist({
      name,
      category,
      bio,
      image,
      photos,
      videos,
      price,
    });

    const savedArtist = await newArtist.save();
    res.status(201).json(savedArtist);
  } catch (err) {
    res.status(400).json({ message: "Invalid Data", error: err.message });
  }
});

// Update artist (photos/videos etc.)
router.put("/:id", async (req, res) => {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

export default router;
