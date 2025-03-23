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
  constructor() {
    this.model = Tag;
    this._tag = {};
    this._allTags = [];
  }
  async fetchAllTags() {
    // return await findAllRecords({ model: Tag });
    this._allTags = await findAllRecords({ model: Tag });
  }

  get allTags() {
    return this._allTags;
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
