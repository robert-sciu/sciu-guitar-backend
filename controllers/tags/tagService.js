const {
  findAllRecords,
  createRecord,
  deleteRecord,
  findRecordByPk,
  findRecordByValue,
  updateRecord,
} = require("../../utilities/sequelizeUtilities");
const { destructureData } = require("../../utilities/serviceUtilities");
const { Tag } = require("../../models").sequelize.models;

class TagService {
  async getAllTags() {
    return await findAllRecords({ model: Tag });
  }

  async findTagById({ id }) {
    return await findRecordByPk({ model: Tag, id });
  }

  async findTagByTagName({ tagName }) {
    return await findRecordByValue({ model: Tag, value: { tagName: tagName } });
  }

  async createTag({ data }) {
    return await createRecord({ model: Tag, data });
  }

  async updateTag({ id, updateData }) {
    return await updateRecord({ model: Tag, updateData, id });
  }

  async deleteTag({ id }) {
    return await deleteRecord({ model: Tag, id });
  }

  destructureTagData({ data }) {
    return destructureData({ data, keys: ["tagName"] });
  }
}

const tagService = new TagService();

module.exports = tagService;
