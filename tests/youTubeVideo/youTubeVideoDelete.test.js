require("dotenv").config();
const request = require("supertest");
const app = require("../../app");

const { youTubeVideoData } = require("./data");

const apiBaseUrl = process.env.API_BASE_URL;

describe("DELETE /youTubeVideos", () => {
  beforeEach(async () => {
    await request(app)
      .post(`${apiBaseUrl}/admin/youTubeVideos`)
      .send(youTubeVideoData.validCreate);
  });

  test("DELETE /youTubeVideos with valid id", async () => {
    const res = await request(app).delete(
      `${apiBaseUrl}/admin/youTubeVideos/1`
    );
    expect(res.statusCode).toEqual(204);
    expect(res.body.success).toBe(undefined);
    const res2 = await request(app).get(`${apiBaseUrl}/open/youTubeVideos`);
    expect(res2.body.data.length).toBe(0);
  });

  test("DELETE /youTubeVideos with invalid id", async () => {
    for (const invalid of youTubeVideoData.invalid.idList) {
      const res = await request(app).delete(
        `${apiBaseUrl}/admin/youTubeVideos/${invalid}`
      );
      expect([403, 404]).toContain(res.statusCode);
      expect([false, undefined]).toContain(res.body.success);
    }
  });
});
