const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth.controller");
const {
  list,
  create,
  taskById,
  read,
  remove,
  update,
  image,
  updateMany,
} = require("../controllers/task.controller");
const { boardById } = require("../controllers/board.controller");
const { userById } = require("../controllers/user.controller");

router.get("/task/listTasks/:boardId/:userId", requireSignin, isAuth, list);
router.get("/task/image/:taskId", image);
router.post("/task/create/:boardId/:userId", requireSignin, isAuth, create);

router.get("/task/one/:taskId/:userId", requireSignin, isAuth, read);
router.delete("/task/:taskId/:userId", requireSignin, isAuth, remove);

//Todo check if update works correctly
router.put(
  "/task/updateMany/:userId",
  (req, res, next) => {
    console.log("here ...");
    next();
  },
  requireSignin,
  isAuth,
  updateMany
);

router.put("/task/:taskId/:userId", requireSignin, isAuth, update);
//check

router.param("taskId", taskById);
router.param("userId", userById);
router.param("boardId", boardById);
module.exports = router;
