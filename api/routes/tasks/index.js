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

  router.put("/tasks/:taskId", async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const updates = req.body;

      const result = await taskCollection
        .collection("task")
        .updateOne({ _id: taskId }, { $set: updates });
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
