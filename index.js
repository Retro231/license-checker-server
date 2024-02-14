import express from "express";
import cors from "cors";
import router from "./routes.js";
import scheduleDailyTask from "./utils/scheduleCsvDonwloader.js";
import dotenv from "dotenv";
import { getCurrentDate } from "./helper/getCurrentDate.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
dotenv.config();

// Schedule the task for 2:30 AM every day
scheduleDailyTask(0, 0);

/** Enable port */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
