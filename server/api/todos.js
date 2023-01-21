const router = require("express").Router();
const {
  models: { Todo },
} = require("../db");
module.exports = router;

router.get(`/:id`, async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      where: {
        userId: req.params.id,
        completed: false,
      },
      order: [["id", "ASC"]],
    });
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

router.get(`/:id/completed`, async (req, res, next) => {
  try {
    const completed = await Todo.findAll({
      where: {
        userId: req.params.id,
        completed: true,
      },
      order: [["id", "ASC"]],
    });
    res.json(completed);
  } catch (err) {
    next(err);
  }
});

router.post(`/:id`, async (req, res, next) => {
  try {
    const { desc } = req.body;
    const userId = req.params.id;
    const completed = false;
    const todos = await Todo.create({ desc, completed, userId });
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

router.put(`/:id`, async (req, res, next) => {
  try {
    const { desc, completed } = req.body;
    const todo = await Todo.findByPk(req.params.id);
    const updatedTodo = await todo.update({ desc, completed });
    res.json(updatedTodo);
  } catch (err) {
    next(err);
  }
});

router.delete(`/:id`, async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    res.json(await todo.destroy());
  } catch (err) {
    next(err);
  }
});
