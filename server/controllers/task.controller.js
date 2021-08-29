const formidable = require("formidable");
const _ = require("lodash");
const Task = require("../models/task.model");
const { errorHandler } = require("../helpers/dbErrorHandler");
const fs = require("fs");

exports.taskById = (req, res, next, id) => {
  Task.findById(id).exec((err, task) => {
    if (err || !task) {
      return res.status(400).json({
        error: "task does not exist",
      });
    }
    req.task = task;
    next();
  });
};

exports.list = (req, res) => {
  Task.find(
    { boardId: req.board._id },
    "_id content backgroundColor fontColor position boardId"
  )
    .sort({ position: 1 })
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      console.log("Data from task controller Sorted", data);
      res.json(data);
    });
};

exports.create = (req, res) => {
  const task = new Task(req.body);

  task.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    const result = { _id: data._id, content: data.content };
    res.json({ result });
  });
};

exports.read = (req, res) => {
  req.task.image = undefined;
  return res.json(req.task);
};

exports.remove = (req, res) => {
  const task = req.task;
  Task.find({ task }).exec(() => {
    task
      .remove()
      .then(res.json({ message: "task deleted." }))
      .catch((err) => {
        return res.status(400).json({
          error: errorHandler(err),
        });
      });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    console.log("Fields ", fields);
    console.log("Files", files);
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fields
    const { content, boardId } = fields;

    if (!content || !boardId) {
      return res.status(400).json({
        error: "Content and boardId are required",
      });
    }
    let task = req.task;
    task = _.extend(task, fields);
    console.log("Task controller update server", task);
    //Todo add task.updated ...

    // 1kb = 1000
    // 1mb = 1000000
    console.log("Files", files);
    if (files.image) {
      console.log("FILES PHOTO: ", files.image);
      if (files.image.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      task.image.data = fs.readFileSync(files.image.path);
      task.image.contentType = files.image.type;
      task.availableImages = true;
    }
    console.log("Task from task controller", task);
    task.updated = Date.now();
    task.save((err, result) => {
      if (err) {
        console.log("Error", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.image = (req, res, next) => {
  if (req.task.image.data) {
    res.set("Content-Type", req.task.image.contentType);
    return res.send(req.task.image.data);
  }
  next();
};

exports.updateMany = (req, res) => {
  console.log("req.body", req.body);
  let bulkOps = req.body.map((task) => {
    return {
      updateOne: {
        filter: { _id: task._id },
        update: { position: task.position, boardId: task.boardId },
      },
    };
  });

  console.log("bulk Ops", bulkOps);

  Task.bulkWrite(bulkOps, {}, (error, tasks) => {
    if (error) {
      return res
        .status(400)
        .json({ error: "Could not update tasks Task.bulkWrite" });
    }
  });
  res.json("All good");

  //Todo finish method
  console.log("Done.............", bulkOps);

  // console.log("Tasks to update", tasksToUpdate);
};
