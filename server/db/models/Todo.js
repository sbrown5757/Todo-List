const Sequelize = require("sequelize");
const db = require("../db");

const Todo = db.define("todo", {
  desc: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Todo;
