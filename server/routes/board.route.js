const express = require("express");
const { userById } = require("../controllers/user.controller");
const { requireSignin, isAuth } = require("../controllers/auth.controller");
const router = express.Router();

const {
  list,
  create,
  update,
  boardById,
  remove,
  read,
} = require("../controllers/board.controller");
//1
router.get("/board/:userId", requireSignin, isAuth, list);
//2
router.post("/board/create/:userId", requireSignin, isAuth, create);
//3
router.get("/board/:boardId/:userId", requireSignin, isAuth, read);
router.put("/board/:boardId/:userId", requireSignin, isAuth, update);
router.delete("/board/:boardId/:userId", requireSignin, isAuth, remove);

router.param("userId", userById);
router.param("boardId", boardById);

module.exports = router;
