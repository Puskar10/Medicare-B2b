
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Admin details
    const name = "CuraMed Admin";
    const email = "admin@curamed.in";
    const password = "Admin@123456";

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("User already exists");

      // Make existing user an admin
      existingAdmin.role = "admin";
      existingAdmin.isVerified = true;

      await existingAdmin.save();

      console.log("Existing user has been promoted to admin");
      console.log(`Email: ${existingAdmin.email}`);

      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      company: "CuraMed",
      phone: "",
      role: "admin",
      isVerified: true,
    });

    console.log("=================================");
    console.log("Admin created successfully");
    console.log("=================================");
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: ${admin.role}`);
    console.log("=================================");

    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:");
    console.error(error.message);

    process.exit(1);
  }
};

createAdmin();

