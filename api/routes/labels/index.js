module.exports = function (labelCollection) {
  const express = require("express");
  const router = express.Router();
  router.get("/", async (req, res) => {
    try {
      const labels = await labelCollection.find().toArray();
      res.json(labels);
    } catch (error) {
      console.error("Error fetching labels", error);
      res.status(500).json({ message: "Error fetching labels" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newLabel = req.body;
      await labelCollection.insertOne(newUser);
      res.status(201).json({
        message: "Label created successfully",
        label: newLabel,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating label" });
    }
  });

  router.put("/labels/:labelId", async (req, res) => {
    try {
      const labelId = req.params.labelId;
      const updates = req.body;

      const result = await labelCollection
        .collection("label")
        .updateOne({ _id: labelId }, { $set: updates });
      if (result.modifiedCount === 0) {
        return res.status(404).send({ message: "Label not found" });
      }
      res.send({ message: "Label updating successful" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error during the label updating" });
    }
  });

  return router;
};
