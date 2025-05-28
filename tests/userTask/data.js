const userTaskData = {
  validCreate: {
    taskId: 1,
  },
  invalid: {
    taskIdList: ["", undefined, null, 0, NaN, "string", true, false],
    userNotesList: [true, false, null, NaN, 21, 0, 1],
    isCompletedList: ["", undefined, null, NaN, "string", 21, 0, 1],
  },
  validIsCompletedList: [true, false, "true", "false"],
  invalidQueryList: ["", undefined, null, 0, NaN, "string", true, false],
};

module.exports = {
  userTaskData,
};
