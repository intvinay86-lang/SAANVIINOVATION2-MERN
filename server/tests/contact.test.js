import request from "supertest";
import app from "../src/app.js";
import Contact from "../src/models/Contact.js";
import User from "../src/models/User.js";
import { connectDB, disconnectDB } from "./setup/testDb.js";
import { generateToken } from "../src/utils/jwtHelper.js";

describe("Contacts API Tests", () => {
  let authToken;
  let testContactId;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    await Contact.deleteMany({});
    await User.deleteMany({});

    // Create a test user and get auth token
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    authToken = generateToken(user._id);

    // Create a test contact
    const contact = await Contact.create({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+91 1234567890",
      subject: "Test Subject",
      message: "This is a test message for contact form",
    });
    testContactId = contact._id.toString();
  });

  describe("POST /api/v1/contacts", () => {
    it("should create a new contact (public route)", async () => {
      const response = await request(app)
        .post("/api/v1/contacts")
        .send({
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          phone: "+91 9876543210",
          subject: "Inquiry about services",
          message: "I would like to know more about your services and pricing",
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("jane.smith@example.com");
      expect(response.body.data.firstName).toBe("Jane");
      expect(response.body.data.lastName).toBe("Smith");
    });

    it("should fail without phone (required field)", async () => {
      const response = await request(app)
        .post("/api/v1/contacts")
        .send({
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob@example.com",
          subject: "Question",
          message: "This is a test message without phone number",
        })
        .expect(422);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toHaveProperty("phone");
    });

    it("should fail without required fields", async () => {
      const response = await request(app)
        .post("/api/v1/contacts")
        .send({
          firstName: "Incomplete",
          email: "incomplete@example.com",
        })
        .expect(422);

      expect(response.body.success).toBe(false);
    });

    it("should fail with invalid email", async () => {
      const response = await request(app)
        .post("/api/v1/contacts")
        .send({
          firstName: "Test",
          lastName: "User",
          email: "invalid-email",
          subject: "Test",
          message: "This is a test message",
        })
        .expect(422);

      expect(response.body.success).toBe(false);
    });

    it("should fail with short message", async () => {
      const response = await request(app)
        .post("/api/v1/contacts")
        .send({
          firstName: "Test",
          lastName: "User",
          email: "test@example.com",
          subject: "Test",
          message: "Short",
        })
        .expect(422);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/contacts", () => {
    it("should get all contacts (authenticated)", async () => {
      const response = await request(app)
        .get("/api/v1/contacts")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.contacts).toHaveLength(1);
      expect(response.body.data.total).toBe(1);
    });

    it("should fail without authentication", async () => {
      const response = await request(app).get("/api/v1/contacts").expect(401);

      expect(response.body.success).toBe(false);
    });

    it("should search contacts", async () => {
      const response = await request(app)
        .get("/api/v1/contacts?search=john")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.contacts.length).toBeGreaterThan(0);
    });

    it("should support pagination", async () => {
      // Create additional contacts
      await Contact.create([
        {
          firstName: "Contact2",
          lastName: "Test",
          email: "contact2@example.com",
          phone: "+1 222 222 2222",
          subject: "Subject 2",
          message: "Message 2 for testing pagination",
        },
        {
          firstName: "Contact3",
          lastName: "Test",
          email: "contact3@example.com",
          phone: "+1 333 333 3333",
          subject: "Subject 3",
          message: "Message 3 for testing pagination",
        },
      ]);

      const response = await request(app)
        .get("/api/v1/contacts?page=1&limit=2")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.contacts).toHaveLength(2);
      expect(response.body.data.totalPages).toBe(2);
    });
  });

  describe("GET /api/v1/contacts/:id", () => {
    it("should get contact by id", async () => {
      const response = await request(app)
        .get(`/api/v1/contacts/${testContactId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("john.doe@example.com");
    });

    it("should fail with invalid contact id", async () => {
      const response = await request(app)
        .get("/api/v1/contacts/507f1f77bcf86cd799439011")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Contact not found");
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .get(`/api/v1/contacts/${testContactId}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /api/v1/contacts/:id", () => {
    it("should update contact successfully", async () => {
      const response = await request(app)
        .put(`/api/v1/contacts/${testContactId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({})
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(testContactId);
    });

    it("should fail with invalid contact id", async () => {
      const response = await request(app)
        .put("/api/v1/contacts/507f1f77bcf86cd799439011")
        .set("Authorization", `Bearer ${authToken}`)
        .send({})
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Contact not found");
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .put(`/api/v1/contacts/${testContactId}`)
        .send({})
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /api/v1/contacts/:id", () => {
    it("should delete contact", async () => {
      const response = await request(app)
        .delete(`/api/v1/contacts/${testContactId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Contact deleted successfully");

      const deletedContact = await Contact.findById(testContactId);
      expect(deletedContact).toBeNull();
    });

    it("should fail with invalid contact id", async () => {
      const response = await request(app)
        .delete("/api/v1/contacts/507f1f77bcf86cd799439011")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .delete(`/api/v1/contacts/${testContactId}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/contacts/stats", () => {
    beforeEach(async () => {
      await Contact.deleteMany({});

      // Create multiple contacts for statistics
      await Contact.create([
        {
          firstName: "Contact1",
          lastName: "Test",
          email: "contact1@example.com",
          phone: "+1 111 111 1111",
          subject: "Subject 1",
          message: "Message 1 for testing statistics",
        },
        {
          firstName: "Contact2",
          lastName: "Test",
          email: "contact2@example.com",
          phone: "+1 222 222 2222",
          subject: "Subject 2",
          message: "Message 2 for testing statistics",
        },
        {
          firstName: "Contact3",
          lastName: "Test",
          email: "contact3@example.com",
          phone: "+1 333 333 3333",
          subject: "Subject 3",
          message: "Message 3 for testing statistics",
        },
      ]);
    });

    it("should get contact statistics", async () => {
      const response = await request(app)
        .get("/api/v1/contacts/stats")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.total).toBe(3);
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .get("/api/v1/contacts/stats")
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
