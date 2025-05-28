const youTubeVideoData = {
  validCreate: {
    title: "Test title",
    role: "students",
    url: "https://www.youtube.com/watch?v=1234567890",
  },
  invalid: {
    titleList: ["", 0, 2, NaN, true, false, undefined, null],
    roleList: ["", 0, 2, NaN, true, false, undefined, null],
    urlList: [
      "",
      0,
      2,
      "123",
      NaN,
      true,
      false,
      undefined,
      null,
      "string",
      "htt://www.youtube.com/watch?v=1234567890",
      "wwwyoutubecom/watch?v=1234567890",
    ],
    idList: ["", "1n", NaN, "string", undefined, null],
  },
};

module.exports = { youTubeVideoData };
