require("dotenv").config();
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const PORT = 3000;
const app = express();
app.use(express.json());

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
    const taskRouter = require("./routes/tasks/index.js")(taskCollection);
    app.use("/api/tasks", taskRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
);
