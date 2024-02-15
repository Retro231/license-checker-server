import express from "express";
import cors from "cors";
import router from "./routes.js";
import scheduleDailyTask from "./utils/scheduleCsvDonwloader.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 9001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

// Schedule the task for 2:30 AM every day
scheduleDailyTask(0, 0);

/** Enable port */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
