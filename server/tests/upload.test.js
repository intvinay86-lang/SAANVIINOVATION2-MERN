import request from "supertest";
import app from "../src/app.js";
import { connectDB, disconnectDB } from "./setup/testDb.js";
import User from "../src/models/User.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Upload API Tests", () => {
  let authToken;
  let uploadedFilename;

  beforeAll(async () => {
    await connectDB();

    // Create test user
    const testUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "admin",
      isActive: true,
    });

    // Login to get token
    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    authToken = loginResponse.body.data.token;
  });

  afterAll(async () => {
    // Clean up uploaded test files
    const uploadsDir = path.join(__dirname, "../uploads");
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      files.forEach((file) => {
        fs.unlinkSync(path.join(uploadsDir, file));
      });
    }

    await disconnectDB();
  });

  describe("POST /api/v1/upload/image", () => {
    it("should upload an image successfully", async () => {
      // Create a test image file
      const testImagePath = path.join(__dirname, "test-image.png");

      // Create a simple PNG file (1x1 pixel)
      const pngBuffer = Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
        0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
        0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49,
        0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
      ]);

      fs.writeFileSync(testImagePath, pngBuffer);

      const response = await request(app)
        .post("/api/v1/upload/image")
        .set("Authorization", `Bearer ${authToken}`)
        .attach("image", testImagePath);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("filename");
      expect(response.body.data).toHaveProperty("url");
      expect(response.body.data.url).toContain("/uploads/");

      uploadedFilename = response.body.data.filename;

      // Clean up test image
      fs.unlinkSync(testImagePath);
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .post("/api/v1/upload/image")
        .attach("image", Buffer.from("fake"), "test.png");

      expect(response.status).toBe(401);
    });

    it("should fail without file", async () => {
      const response = await request(app)
        .post("/api/v1/upload/image")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("No file uploaded");
    });
  });

  describe("GET /api/v1/upload/images", () => {
    it("should get all uploaded images", async () => {
      const response = await request(app)
        .get("/api/v1/upload/images")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should fail without authentication", async () => {
      const response = await request(app).get("/api/v1/upload/images");

      expect(response.status).toBe(401);
    });
  });

  describe("DELETE /api/v1/upload/image/:filename", () => {
    it("should delete an uploaded image", async () => {
      if (!uploadedFilename) {
        // Skip if no file was uploaded
        return;
      }

      const response = await request(app)
        .delete(`/api/v1/upload/image/${uploadedFilename}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it("should fail without authentication", async () => {
      const response = await request(app).delete(
        "/api/v1/upload/image/test.png",
      );

      expect(response.status).toBe(401);
    });

    it("should fail with non-existent file", async () => {
      const response = await request(app)
        .delete("/api/v1/upload/image/nonexistent.png")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });
});
