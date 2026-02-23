import mongoose from "mongoose";
import dotenv from "dotenv";

// Load test environment variables
dotenv.config({ path: ".env.test" });

export const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      "mongodb://localhost:27017/saanviinovation_test_db";

    // Safety check: ensure we're using a test database
    if (!mongoUri.includes("_test") && process.env.NODE_ENV !== "test") {
      throw new Error(
        "DANGER: Attempting to use non-test database in tests! Database URI must contain '_test'",
      );
    }

    await mongoose.connect(mongoUri);
    console.log("Test database connected successfully");
  } catch (error) {
    console.error("Test database connection error:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    const dbName = mongoose.connection.name;

    // Safety check: only drop test databases
    if (!dbName.includes("_test")) {
      throw new Error(
        `DANGER: Attempting to drop non-test database: ${dbName}`,
      );
    }

    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log("Test database disconnected successfully");
  } catch (error) {
    console.error("Test database disconnection error:", error);
  }
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
