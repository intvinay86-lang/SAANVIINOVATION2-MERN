import request from "supertest";
import app from "../src/app.js";
import SiteData from "../src/models/SiteData.js";
import User from "../src/models/User.js";
import { connectDB, disconnectDB } from "./setup/testDb.js";
import { generateToken } from "../src/utils/jwtHelper.js";

describe("SiteData API Tests", () => {
  let authToken;
  let testUserId;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    await SiteData.deleteMany({});
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

  describe("GET /api/v1/sitedata", () => {
    it("should get all site data", async () => {
      // Create test data
      await SiteData.create([
        { dataKey: "footer", data: { phone: "123456789" } },
        { dataKey: "header", data: { logo: "logo.png" } },
      ]);

      const response = await request(app).get("/api/v1/sitedata").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
    });

    it("should return empty array when no data exists", async () => {
      const response = await request(app).get("/api/v1/sitedata").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe("GET /api/v1/sitedata/:key", () => {
    it("should get site data by key", async () => {
      await SiteData.create({
        dataKey: "footer",
        data: { phone: "123456789", email: "test@example.com" },
      });

      const response = await request(app)
        .get("/api/v1/sitedata/footer")
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.dataKey).toBe("footer");
      expect(response.body.data.data.phone).toBe("123456789");
    });

    it("should fail with non-existent key", async () => {
      const response = await request(app)
        .get("/api/v1/sitedata/nonexistent")
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Site data not found");
    });
  });

  describe("POST /api/v1/sitedata", () => {
    it("should create new site data", async () => {
      const response = await request(app)
        .post("/api/v1/sitedata")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          dataKey: "footer",
          data: {
            phone: "123456789",
            email: "test@example.com",
            address: "Test Address",
          },
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Site data created successfully");
      expect(response.body.data.dataKey).toBe("footer");
      expect(response.body.data.data.phone).toBe("123456789");
    });

    it("should update existing site data with same key", async () => {
      // Create initial data
      await SiteData.create({
        dataKey: "footer",
        data: { phone: "111111111" },
      });

      const response = await request(app)
        .post("/api/v1/sitedata")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          dataKey: "footer",
          data: { phone: "999999999" },
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Site data updated successfully");
      expect(response.body.data.data.phone).toBe("999999999");
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .post("/api/v1/sitedata")
        .send({
          dataKey: "footer",
          data: { phone: "123456789" },
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it("should fail without dataKey", async () => {
      const response = await request(app)
        .post("/api/v1/sitedata")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          data: { phone: "123456789" },
        })
        .expect(422);

      expect(response.body.success).toBe(false);
    });

    it("should fail without data", async () => {
      const response = await request(app)
        .post("/api/v1/sitedata")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          dataKey: "footer",
        })
        .expect(422);

      expect(response.body.success).toBe(false);
    });

    it("should handle complex nested data", async () => {
      const complexData = {
        companyInfo: {
          name: "Test Company",
          address: {
            street: "123 Main St",
            city: "Test City",
            country: "Test Country",
          },
        },
        socialLinks: [
          { platform: "Facebook", url: "https://facebook.com" },
          { platform: "Twitter", url: "https://twitter.com" },
        ],
      };

      const response = await request(app)
        .post("/api/v1/sitedata")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          dataKey: "main",
          data: complexData,
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.data.companyInfo.name).toBe("Test Company");
      expect(response.body.data.data.socialLinks).toHaveLength(2);
    });
  });

  describe("PUT /api/v1/sitedata/:key", () => {
    it("should update site data by key", async () => {
      await SiteData.create({
        dataKey: "footer",
        data: { phone: "111111111" },
      });

      const response = await request(app)
        .put("/api/v1/sitedata/footer")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          data: { phone: "999999999", email: "new@example.com" },
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Site data updated successfully");
      expect(response.body.data.data.phone).toBe("999999999");
      expect(response.body.data.data.email).toBe("new@example.com");
    });

    it("should fail with non-existent key", async () => {
      const response = await request(app)
        .put("/api/v1/sitedata/nonexistent")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          data: { phone: "123456789" },
        })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Site data not found");
    });

    it("should fail without authentication", async () => {
      await SiteData.create({
        dataKey: "footer",
        data: { phone: "111111111" },
      });

      const response = await request(app)
        .put("/api/v1/sitedata/footer")
        .send({
          data: { phone: "999999999" },
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it("should fail without data", async () => {
      await SiteData.create({
        dataKey: "footer",
        data: { phone: "111111111" },
      });

      const response = await request(app)
        .put("/api/v1/sitedata/footer")
        .set("Authorization", `Bearer ${authToken}`)
        .send({})
        .expect(422);

      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /api/v1/sitedata/:key", () => {
    it("should delete site data by key", async () => {
      await SiteData.create({
        dataKey: "footer",
        data: { phone: "123456789" },
      });

      const response = await request(app)
        .delete("/api/v1/sitedata/footer")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Site data deleted successfully");

      // Verify deletion
      const siteData = await SiteData.findOne({ dataKey: "footer" });
      expect(siteData).toBeNull();
    });

    it("should fail with non-existent key", async () => {
      const response = await request(app)
        .delete("/api/v1/sitedata/nonexistent")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Site data not found");
    });

    it("should fail without authentication", async () => {
      await SiteData.create({
        dataKey: "footer",
        data: { phone: "123456789" },
      });

      const response = await request(app)
        .delete("/api/v1/sitedata/footer")
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("Data Integrity", () => {
    it("should maintain data structure after update", async () => {
      const initialData = {
        section1: { value: "test1" },
        section2: { value: "test2" },
      };

      await SiteData.create({
        dataKey: "main",
        data: initialData,
      });

      const updatedData = {
        section1: { value: "updated1" },
        section2: { value: "updated2" },
        section3: { value: "new3" },
      };

      await request(app)
        .put("/api/v1/sitedata/main")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ data: updatedData })
        .expect(200);

      const response = await request(app)
        .get("/api/v1/sitedata/main")
        .expect(200);

      expect(response.body.data.data.section1.value).toBe("updated1");
      expect(response.body.data.data.section3.value).toBe("new3");
    });

    it("should handle timestamps correctly", async () => {
      const response = await request(app)
        .post("/api/v1/sitedata")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          dataKey: "test",
          data: { value: "test" },
        })
        .expect(201);

      expect(response.body.data.createdAt).toBeDefined();
      expect(response.body.data.updatedAt).toBeDefined();
    });
  });
});
