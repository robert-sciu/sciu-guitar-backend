require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const { youTubeVideoData } = require("./data");

const apiBaseUrl = process.env.API_BASE_URL;

describe("GET /youTubeVideos", () => {
  test("GET /youTubeVideos", async () => {
    await request(app)
      .post(`${apiBaseUrl}/admin/youTubeVideos`)
      .send(youTubeVideoData.validCreate);

    const res = await request(app).get(`${apiBaseUrl}/open/youTubeVideos`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].title).toBe(youTubeVideoData.validCreate.title);
    expect(res.body.data[0].url).toBe(youTubeVideoData.validCreate.url);
    expect(res.body.data[0].role).toBe(youTubeVideoData.validCreate.role);
  });
});
