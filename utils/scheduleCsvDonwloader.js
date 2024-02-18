const { globalVariables } = require("../config.js");
const { downloadCsvFile } = require("../helper/downloadCsv.js");
const { deleteFile } = require("./deleteFileAsync.js");

async function downloadSomething() {
  await downloadCsvFile();
}

/** This will download csv database from https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers . */

async function scheduleDailyTask(hour, minute) {
  const now = new Date();
  const scheduledTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0
  );

  let timeUntilScheduled = scheduledTime - now;

  if (timeUntilScheduled < 0) {
    // If the scheduled time has already passed for today, schedule it for the next day
    timeUntilScheduled += 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  }

  console.log(timeUntilScheduled);
  await new Promise((resolve) => setTimeout(resolve, timeUntilScheduled));
  await downloadSomething();
  await deleteFile(globalVariables.twoDaysAgoFilePath);
  console.log(`Function executed at ${hour}:${minute} daily.`);
  // Schedule the task for the next day
  await scheduleDailyTask(hour, minute);
}

module.exports = scheduleDailyTask;
