const { ObjectId } = require("mongodb");

module.exports = function (taskCollection) {
  const express = require("express");
  const router = express.Router();
  router.get("/", async (req, res) => {
    try {
      const tasks = await taskCollection.find().toArray();
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks", error);
      res.status(500).json({ message: "Error fetching tasks" });
    }
  });

  router.get("/:taskId", async (req, res) => {
    try {
      console.log(req.params.taskId);
      const nid = new ObjectId(req.params.taskId);
      const taskResult = await taskCollection.findOne({ _id: nid });
      if (!taskResult) {
        return res.status(404).send({ message: "Task not found" });
      }
      return res.status(200).json(taskResult);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error during task research" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newTask = req.body;
      await taskCollection.insertOne(newUser);
      res.status(201).json({
        message: "Task created successfully",
        task: newTask,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating task" });
    }
  });

  router.put("/:taskId", async (req, res) => {
    try {
      console.log(req.params.taskId);
      const nid = new ObjectId(req.params.taskId);
      const updates = req.body;

      const result = await taskCollection.updateOne(
        { _id: nid },
        { $set: updates }
      );
      if (result.modifiedCount === 0) {
        return res.status(404).send({ message: "Task not found" });
      }
      res.send({ message: "task updating successful" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error during the task updating" });
    }
  });

  return router;
};
