require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const { youTubeVideoData } = require("./data");
const apiBaseUrl = process.env.API_BASE_URL;

describe("POST /youTubeVideos", () => {
  test("POST /youTubeVideos with valid data", async () => {
    const res = await request(app)
      .post(`${apiBaseUrl}/admin/youTubeVideos`)
      .send(youTubeVideoData.validCreate);
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("YouTube link created");
  });

  test("POST /youTubeVideos with invalid title", async () => {
    for (const invalid of youTubeVideoData.invalid.titleList) {
      const res = await request(app)
        .post(`${apiBaseUrl}/admin/youTubeVideos`)
        .send({
          ...youTubeVideoData.valid,
          title: invalid,
        });
      expect(res.statusCode).toEqual(403);
      expect(res.body.success).toBe(false);
    }
  });

  test("POST /youTubeVideos with invalid url", async () => {
    for (const invalid of youTubeVideoData.invalid.urlList) {
      const res = await request(app)
        .post(`${apiBaseUrl}/admin/youTubeVideos`)
        .send({
          ...youTubeVideoData.valid,
          url: invalid,
        });
      expect(res.statusCode).toEqual(403);
      expect(res.body.success).toBe(false);
    }
  });

  test("POST /youTubeVideos with invalid role", async () => {
    for (const invalid of youTubeVideoData.invalid.roleList) {
      const res = await request(app)
        .post(`${apiBaseUrl}/admin/youTubeVideos`)
        .send({
          ...youTubeVideoData.valid,
          role: invalid,
        });
      expect(res.statusCode).toEqual(403);
      expect(res.body.success).toBe(false);
    }
  });

  test("POST /youTubeVideos with not allowed role", async () => {
    const res = await request(app)
      .post(`${apiBaseUrl}/admin/youTubeVideos`)
      .send({
        ...youTubeVideoData.valid,
        role: "invalid",
      });
    expect(res.statusCode).toEqual(403);
    expect(res.body.success).toBe(false);
  });

  test("POST /youTubeVideos with duplicate data", async () => {
    await request(app)
      .post(`${apiBaseUrl}/admin/youTubeVideos`)
      .send(youTubeVideoData.validCreate);
    const res = await request(app)
      .post(`${apiBaseUrl}/admin/youTubeVideos`)
      .send(youTubeVideoData.validCreate);
    expect(res.statusCode).toEqual(409);
    expect(res.body.success).toBe(false);
  });

  test("POST /youTubeVideos with no data", async () => {
    const res = await request(app)
      .post(`${apiBaseUrl}/admin/youTubeVideos`)
      .send();
    expect(res.statusCode).toEqual(403);
    expect(res.body.success).toBe(false);
  });
});
