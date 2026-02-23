import dotenv from "dotenv";

// Load test environment variables BEFORE any other imports
dotenv.config({ path: ".env.test" });

// Ensure NODE_ENV is set to test
process.env.NODE_ENV = "test";
