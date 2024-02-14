import path from "path";
import { getCurrentDate } from "./helper/getCurrentDate.js";
import { getPreviousDate } from "./helper/getPreviousDate.js";
import { getTwoDaysAgoDate } from "./helper/twoDaysAgoDate.js";

const currentDate = getCurrentDate();
const previousDate = getPreviousDate(currentDate);
const twoDaysAgoDate = getTwoDaysAgoDate(currentDate);

const prevCsvFileName = `${previousDate}.csv`;
const currCsvFileName = `${currentDate}.csv`;
const twoDaysAgoCsvFileName = `${twoDaysAgoDate}.csv`;
const prevCsvFilePath = path.join(process.cwd(), prevCsvFileName);
const currCsvFilePath = path.join(process.cwd(), currCsvFileName);
const twoDaysAgoFilePath = path.join(process.cwd(), twoDaysAgoCsvFileName);

console.log("twago", twoDaysAgoFilePath);
console.log("prev", prevCsvFilePath);
console.log("cur", currCsvFilePath);

export const globalVariables = {
  twoDaysAgoFilePath,
  prevCsvFilePath,
  currCsvFilePath,
};
