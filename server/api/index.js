const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/todos", require("./todos"));
router.use("/*", (req, res, next) => {
  res.status(404).send("Not Found");
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
