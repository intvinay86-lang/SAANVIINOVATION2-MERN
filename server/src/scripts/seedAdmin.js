import mongoose from "mongoose";
import { ENV } from "../config/env.js";
import User from "../models/User.js";

const seedAdmin = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "admin123",
    });

    console.log("Admin user created successfully:");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin123");
    console.warn("\nPlease change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
