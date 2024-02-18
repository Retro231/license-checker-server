const path = require("path");
const fs = require("fs");
const { downloadCsvFile } = require("../helper/downloadCsv.js");
const { getCurrentDate } = require("../helper/getCurrentDate.js");

const currentDate = getCurrentDate();

/** check csv file is exist or not */
exports.checkCsvFile = async (req, res, next) => {
  const fileName = `${currentDate}.csv`;
  const filePath = path.join(process.cwd(), fileName);

  /** check if file is exist */
  if (fs.existsSync(filePath)) {
    console.log("csv exist,go to serachController");
    next();
  } else {
    console.log("no csv,go to downloadCsvFile");
    await downloadCsvFile();
    console.log("after await download");

    next();
  }
};
