//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Todo = require("./models/Todo");

//associations could go here!

User.hasMany(Todo);
Todo.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Todo,
  },
};
