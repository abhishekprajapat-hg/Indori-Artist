// scripts/createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);

    const email = "admin@example.com";
    const plainPassword = "admin123";

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("⚠️ Admin already exists:", email);
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    console.log("✅ Admin created successfully!");
    console.log("Email:", email);
    console.log("Password:", plainPassword);

    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
