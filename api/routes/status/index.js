module.exports = function (statusCollection) {
  const express = require("express");
  const router = express.Router();
  router.get("/", async (req, res) => {
    try {
      const status = await statusCollection.find().toArray();
      res.json(status);
    } catch (error) {
      console.error("Error fetching status", error);
      res.status(500).json({ message: "Error fetching status" });
    }
  });
  return router;
};
