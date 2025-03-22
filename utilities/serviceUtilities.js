function destructureData({ data, keys }) {
  const newData = keys.reduce((acc, key) => {
    if (data[key] !== undefined) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
  return newData;
}
module.exports = { destructureData };
