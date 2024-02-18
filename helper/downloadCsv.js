const axios = require("axios");
const cheerio = require("cheerio");
// const path =  require("path");
const fs = require("fs");
const { getCurrentDate } = require("./getCurrentDate.js");

// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);

const getUrl = async () => {
  try {
    const url =
      "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers";

    const response = await axios.get(url); // Add headers to axios request
    const $ = cheerio.load(response.data);
    const downloadBtn = $(".gem-c-attachment__title a");
    const csv_url = downloadBtn.attr("href");
    return csv_url;
  } catch (error) {
    console.log(error);
  }
};

/** Use to donwload register-of-licensed-sponsors-workers list from official site */
exports.downloadCsvFile = async () => {
  console.log("i am in downlaod csv file func");
  const currentDate = getCurrentDate();
  const url = await getUrl();
  const outputPath = `${currentDate}.csv`;
  try {
    const response = await axios({
      method: "get",
      url: url,
      responseType: "stream", // Set the response type to stream to handle large files
    });

    // Pipe the response stream to a file
    response.data.pipe(fs.createWriteStream(outputPath));

    // Wait for the file to finish downloading
    await new Promise((resolve, reject) => {
      response.data.on("end", () => {
        console.log("File downloaded successfully.");
        resolve();
      });

      response.data.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error("Error downloading the file:", error.message);
  }
};

// const download = async (req, res) => {
//   // const url =
//   //   "https://assets.publishing.service.gov.uk/media/65af9e18fd784b000de0c6e1/2024-01-23_-_Worker_and_Temporary_Worker.csv";
//   const url = await getUrl();
//   const outputPath = "downloaded_file.csv";

//   await downloadCsvFile(url, outputPath);

//   // Send the downloaded file as a response
//   const filePath = path.join(process.cwd(), outputPath);
//   if (fs.existsSync(filePath)) {
//     res.download(filePath, "downloaded_file.csv", (err) => {
//       if (err) {
//         console.error("Error sending the file:", err.message);
//         res.status(500).send("Internal Server Error");
//       } else {
//         console.log("File sent successfully.");
//       }
//     });
//   } else {
//     res.status(404).send("File not found");
//   }
// };
