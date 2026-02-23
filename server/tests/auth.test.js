import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";
import { connectDB, disconnectDB } from "./setup/testDb.js";

describe("Auth API Tests", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/v1/auth/login", () => {
    const testUser = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };

    beforeEach(async () => {
      await User.create(testUser);
    });

    it("should login successfully with valid credentials", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Login successful");
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user.email).toBe(testUser.email);
      expect(response.body.data.user.password).toBeUndefined();
    });

    it("should fail with incorrect password", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: testUser.email,
          password: "wrongpassword",
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should fail with non-existent email", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "nonexistent@example.com",
          password: testUser.password,
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should fail without email", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          password: testUser.password,
        })
        .expect(422);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation failed");
    });

    it("should fail without password", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: testUser.email,
        })
        .expect(422);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation failed");
    });

    it("should fail with inactive account", async () => {
      await User.create({
        name: "Inactive User",
        email: "inactive@example.com",
        password: "password123",
        isActive: false,
      });

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "inactive@example.com",
          password: "password123",
        })
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Account is inactive");
    });
  });
});
