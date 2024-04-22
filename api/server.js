require("dotenv").config();
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const PORT = 3000;
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const dbName = "mean_to_do_list";

MongoClient.connect(
  process.env.DATABASE_URL,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.error("Failed to connect to MongoDB", err);
      return;
    }
    const db = client.db(dbName);
    const taskCollection = db.collection("task");
    const labelCollection = db.collection("label");
    const statusCollection = db.collection("status");
    const taskRouter = require("./routes/tasks/index.js")(taskCollection);
    const labelRouter = require("./routes/labels/index.js")(labelCollection);
    const statusRouter = require("./routes/status/index.js")(statusCollection);
    app.use("/api/tasks", taskRouter);
    app.use("/api/labels", labelRouter);
    app.use("/api/status", statusRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
);
