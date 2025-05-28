function customNotEmpty() {
  return (value) => {
    const checkedValue = noValuesToUndefined({ value });
    if (checkedValue.value === undefined) {
      throw new Error();
    }
    return true;
  };
}

function customIsJson() {
  return (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      throw new Error("Invalid JSON");
    }
  };
}

function customIsIsoString() {
  return (value) => {
    const date = new Date(value);
    if (
      isNaN(date.getTime()) || // Invalid date
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value)
    ) {
      throw new Error("End date must be a valid ISO UTC date string");
    }
    return true;
  };
}

module.exports = {
  customNotEmpty,
  customIsJson,
  customIsIsoString,
};
