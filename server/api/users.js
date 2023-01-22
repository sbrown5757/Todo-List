const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ["id", "email"],
      });
      res.json(users);
    } else {
      res.json("Not Authorized");
    }
  } catch (err) {
    next(err);
  }
});
