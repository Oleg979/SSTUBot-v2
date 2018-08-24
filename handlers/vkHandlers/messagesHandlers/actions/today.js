var todaySchedule = require("./schedule");

module.exports = async id => {
  var [res, num] = await todaySchedule(id);
  return [
    num > 0
      ? `Сегодня у тебя ${num} пар${
          num > 4 ? "" : num > 1 ? "ы" : "а"
        }:\n${res.join("\n")}`
      : "Сегодня у тебя нет пар, можешь отдыхать!",
    null,
    null
  ];
};
