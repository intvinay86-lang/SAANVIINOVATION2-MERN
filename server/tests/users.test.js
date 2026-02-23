import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";
import { connectDB, disconnectDB } from "./setup/testDb.js";
import { generateToken } from "../src/utils/jwtHelper.js";

describe("Users API Tests", () => {
  let authToken;
  let testUserId;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});

    // Create a test user and get auth token
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    testUserId = user._id.toString();
    authToken = generateToken(user._id);
  });

  describe("GET /api/v1/users", () => {
    it("should get all users", async () => {
      const response = await request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.users).toHaveLength(1);
      expect(response.body.data.total).toBe(1);
    });

    it("should fail without authentication", async () => {
      const response = await request(app).get("/api/v1/users").expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/users/:id", () => {
    it("should get user by id", async () => {
      const response = await request(app)
        .get(`/api/v1/users/${testUserId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("test@example.com");
    });

    it("should fail with invalid user id", async () => {
      const response = await request(app)
        .get("/api/v1/users/507f1f77bcf86cd799439011")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User not found");
    });
  });

  describe("POST /api/v1/users", () => {
    it("should create a new user", async () => {
      const response = await request(app)
        .post("/api/v1/users")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "New User",
          email: "newuser@example.com",
          password: "password123",
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("newuser@example.com");
    });

    it("should fail with duplicate email", async () => {
      const response = await request(app)
        .post("/api/v1/users")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Duplicate User",
          email: "test@example.com",
          password: "password123",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email already exists");
    });

    it("should fail without required fields", async () => {
      const response = await request(app)
        .post("/api/v1/users")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Incomplete User",
        })
        .expect(422);

      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /api/v1/users/:id", () => {
    it("should update user", async () => {
      const response = await request(app)
        .put(`/api/v1/users/${testUserId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Updated Name",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("Updated Name");
    });

    it("should fail with duplicate email", async () => {
      await User.create({
        name: "Another User",
        email: "another@example.com",
        password: "password123",
      });

      const response = await request(app)
        .put(`/api/v1/users/${testUserId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          email: "another@example.com",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email already exists");
    });
  });

  describe("DELETE /api/v1/users/:id", () => {
    it("should delete user", async () => {
      const anotherUser = await User.create({
        name: "Delete Me",
        email: "delete@example.com",
        password: "password123",
      });

      const response = await request(app)
        .delete(`/api/v1/users/${anotherUser._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User deleted successfully");
    });

    it("should fail when deleting own account", async () => {
      const response = await request(app)
        .delete(`/api/v1/users/${testUserId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("You cannot delete your own account");
    });
  });

  describe("GET /api/v1/users/me", () => {
    it("should get current user profile", async () => {
      const response = await request(app)
        .get("/api/v1/users/me")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("test@example.com");
    });
  });

  describe("PUT /api/v1/users/me", () => {
    it("should update current user profile", async () => {
      const response = await request(app)
        .put("/api/v1/users/me")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Updated Profile Name",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("Updated Profile Name");
    });
  });

  describe("PUT /api/v1/users/me/password", () => {
    it("should change password", async () => {
      const response = await request(app)
        .put("/api/v1/users/me/password")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          currentPassword: "password123",
          newPassword: "newpassword123",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Password changed successfully");
    });

    it("should fail with incorrect current password", async () => {
      const response = await request(app)
        .put("/api/v1/users/me/password")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          currentPassword: "wrongpassword",
          newPassword: "newpassword123",
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Current password is incorrect");
    });
  });
});
