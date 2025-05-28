function filterUrl({ url }) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "");
}

module.exports = { filterUrl };
