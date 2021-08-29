const Board = require("../models/board.model");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.boardById = (req, res, next, id) => {
  Board.findById(id).exec((err, board) => {
    if (err || !board) {
      return res.status(400).json({
        error: "board does not exist",
      });
    }
    req.board = board;
    next();
  });
};

exports.update = (req, res) => {
  Board.findOneAndUpdate(
    { _id: req.params.boardId },
    { $set: req.body },
    { new: true },
    (err, board) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }

      res.json(board);
    }
  );
};

exports.create = (req, res) => {
  const board = new Board(req.body);

  board.save((err, data) => {
    if (err) {
      console.log("Error save method", err);
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({ data });
  });
};

exports.list = (req, res) => {
  Board.find({ owner: req.profile._id }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json(data);
  });
};

exports.read = (req, res) => {
  return res.json(req.board);
};

//Todo check when there will be tasks
exports.remove = (req, res) => {
  const board = req.board;
  Board.find({ board }).exec((err, data) => {
    if (data.length > 0) {
      return res.status(400).json({
        message: `Sorry. You can't delete ${board.name}. It has ${data.length} associated tasks.`,
      });
    } else {
      board.remove((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json({ message: "board deleted." });
      });
    }
  });
};
