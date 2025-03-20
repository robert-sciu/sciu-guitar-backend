/**
 * Updates a record in the database using the provided model, update data, ID, and transaction (optional).
 *
 * @param {Object} model - The model used to interact with the database.
 * @param {Object} updateData - The data used to update the record.
 * @param {number} id - The ID of the record to update.
 * @param {Object} [transaction] - The transaction object (optional).
 * @return {Promise<number>} The number of updated rows.
 */

async function updateRecord({ model, updateData, id, transaction }) {
  if (transaction) {
    const [updatedRowsCount] = await model.update(updateData, {
      where: {
        id,
      },
      transaction: transaction,
    });
    return updatedRowsCount;
  }
  const [updatedRowsCount] = await model.update(updateData, {
    where: {
      id,
    },
  });
  return updatedRowsCount;
}

/**
 * Creates a record in the database using the provided model, data, and optional transaction.
 *
 * @param {Object} model - The model used to interact with the database.
 * @param {Object} data - The data used to create the record.
 * @param {Object} [transaction] - The transaction object (optional).
 * @return {Promise<Object>} The created record.
 */
async function createRecord({ model, data, transaction }) {
  try {
    if (transaction) {
      return model.create(data, { transaction: transaction });
    }
    return model.create(data);
  } catch (error) {
    throw error;
  }
}

/**
 * Finds a record by primary key using the provided model and ID.
 *
 * @param {Object} model - The model used to interact with the database.
 * @param {number} id - The primary key of the record to find.
 * @param {Object} [transaction] - The transaction object (optional).
 * @return {Promise<Object>} A promise that resolves to the found record.
 */
async function findRecordByPk({ model, id, transaction }) {
  if (transaction) {
    return await model.findByPk(id, { transaction: transaction });
  }
  return await model.findByPk(id);
}

/**
 * Finds a record by foreign key using the provided model and ID.
 *
 * @param {Object} model - The model used to interact with the database.
 * @param {Object|number} id - The foreign key of the record to find. It can be an object with multiple keys or a single numeric ID.
 * @param {Object} [transaction] - The transaction object (optional).
 * @return {Promise<Object>} A promise that resolves to the found record.
 */
async function findRecordByFk({ model, id, transaction }) {
  if (transaction) {
    if (!Number(id) && Object.keys(id).length > 1) {
      return await model.findOne({
        where: { ...id },
        transaction: transaction,
      });
    }
    return await model.findOne({ where: { id }, transaction: transaction });
  }
  if (!Number(id) && Object.keys(id).length > 1) {
    return await model.findOne({ where: { ...id } });
  }
  return await model.findOne({ where: { id } });
}

/**
 * Finds a record from the database using the provided model and value.
 *
 * @param {Object} model - The model used to interact with the database.
 * @param {Object} value - The value used to filter the records.
 * @param {Object} [transaction] - The transaction object (optional).
 * @return {Promise<Object>} A promise that resolves to the found record.
 */
async function findRecordByValue({ model, value, transaction }) {
  if (transaction) {
    return await model.findOne({
      where: { ...value },
      transaction: transaction,
    });
  }
  return await model.findOne({ where: { ...value } });
}

/**
 * Finds all records from the database using the provided model and parameter.
 *
 * @param {Object} model - The model used to interact with the database.
 * @param {Object} id - The parameter used to filter the records. If provided, it filters the records by the ID.
 * @return {Promise<Array<Object>>} A promise that resolves to an array of records. If the parameter is provided, it filters the records by the ID. If the parameter is not provided, it returns all records.
 */
async function findAllRecords({ model, id }) {
  if (id) {
    return await model.findAll({ where: { ...id } });
  }
  return await model.findAll();
}

/**
 * Deletes a record from the database based on the provided model, ID, and transaction.
 *
 * @param {Object} model - The model used to interact with the database.
 * @param {number} id - The ID of the record to be deleted.
 * @param {Object} [transaction] - The transaction object (optional).
 * @return {Promise<void>} A promise that resolves when the record is successfully deleted.
 */
async function deleteRecord({ model, id, transaction }) {
  if (transaction) {
    return await model.destroy({ where: { id }, transaction: transaction });
  }
  return await model.destroy({ where: { id } });
}

module.exports = {
  findRecordByPk,
  findRecordByFk,
  findRecordByValue,
  findAllRecords,
  deleteRecord,
  createRecord,
  updateRecord,
};
