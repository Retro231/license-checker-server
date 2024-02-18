const express = require("express");
const cors = require("cors");
const router = require("./routes");
const scheduleDailyTask = require("./utils/scheduleCsvDonwloader");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/company", router);

app.get("/", (req, res) => {
  res.send("Hello Mr.Unknown");
});

// Schedule the task for 2:30 AM every day
scheduleDailyTask(0, 0);

/** Enable port */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
