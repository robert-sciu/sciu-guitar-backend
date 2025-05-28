const { YouTubeVideo } = require("../../models").sequelize.models;
const {
  findRecordByValue,
  createRecord,
  findAllRecords,
  deleteRecord,
} = require("../../utilities/sequelizeUtilities");
const { destructureData } = require("../../utilities/serviceUtilities");
const config = require("../../config/config")[process.env.NODE_ENV];

class youTubeVideosService {
  async getAllYouTubeVideos() {
    return await findAllRecords({ model: YouTubeVideo });
  }
  async isVideoUnique({ data }) {
    const existingVideo =
      (await findRecordByValue({
        model: YouTubeVideo,
        value: { title: data.title },
      })) ||
      (await findRecordByValue({
        model: YouTubeVideo,
        value: { url: data.url },
      }));
    return !existingVideo;
  }

  isRoleAllowed({ data }) {
    return config.youTubeVideosRoles.includes(data.role);
  }

  async createYouTubeVideoLink({ data }) {
    return await createRecord({ model: YouTubeVideo, data });
  }

  async deleteYouTubeVideoLink({ id }) {
    return await deleteRecord({ model: YouTubeVideo, id });
  }

  destructureYouTubeVideoData({ data }) {
    return destructureData({ data, keys: ["title", "role", "url"] });
  }
}

const youtubeVideosService = new youTubeVideosService();

module.exports = youtubeVideosService;
