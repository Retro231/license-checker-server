import csv from "csv-parser";
import fs from "node:fs/promises";
import path from "path";
import { getData } from "./companyHouse.js";
import { getCurrentDate } from "../helper/getCurrentDate.js";

const currentDate = getCurrentDate();

const fileName = `${currentDate}.csv`;

// Get the absolute path to the CSV file using __dirname
const filePath = path.join(process.cwd(), fileName);
console.log(filePath);

const checkDuplicate = async (arrayOfObjects) => {
  const organizationMap = {};

  arrayOfObjects.forEach((item) => {
    const organizationName = item["Organisation Name"];

    if (!organizationMap[organizationName]) {
      // If the organizationName is not found in the map, add it with the current item
      organizationMap[organizationName] = { ...item };
    } else {
      // If organizationName is found, merge Route and Type & Rating values
      organizationMap[organizationName]["Route"] += `, ${item["Route"]}`;
      organizationMap[organizationName][
        "Type & Rating"
      ] += `, ${item["Type & Rating"]}`;
    }
  });

  // Convert the values of the map back to an array
  const mergedArray = Object.values(organizationMap);

  return mergedArray;
};

const getDataFromCsv = async (filePath, name) => {
  console.log("i'm in get data");
  const results = [];
  let headerRow = null;

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const rows = fileContent.split("\n");

    for (let i = 0; i < rows.length; i++) {
      const columns = rows[i].split(",");

      if (i === 0) {
        // Save the header row
        headerRow = columns.map((header) =>
          header.replace(/[\r\n"]+/g, "").trim()
        ); // Trim leading and trailing spaces
        continue;
      }

      // Assuming the column containing the organization name is named 'Organisation Name'
      const organizationName = columns[0].replace(/[\r\n"]+/g, "").trim(); // Trim leading and trailing spaces

      // Convert both the searched name and the organization name to lowercase for case-insensitive comparison
      if (organizationName.toLowerCase().includes(name.toLowerCase())) {
        const result = {};
        headerRow.forEach((header, index) => {
          result[header] = columns[index].replace(/[\r\n"]+/g, "").trim(); // Trim leading and trailing spaces
        });
        results.push(result);
        // break; // Stop the loop once a match is found
      }
    }
    return results;
  } catch (error) {
    throw error;
  }
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const capitalizeEachWord = (sentence) => {
  return sentence
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};

const getAdditoinalInfo = async (name) => {
  const response = await getData(name);
  const data = response.items;
  let uppercase = name.toUpperCase();
  let lowercase = name.toLowerCase();
  let capitalizedSentence = capitalizeEachWord(name);

  // return response;
  for (let i = 0; i < data.length; i++) {
    let title = data[i].title;
    if (
      title === uppercase ||
      title === lowercase ||
      title === capitalizedSentence
    ) {
      const status = capitalizeEachWord(data[i].company_status);
      const address_snippet = data[i].address_snippet;

      return { status, address_snippet };
    }
  }
  return null;
};

/** search requested company name */
export const serachController = async (req, res) => {
  let additonalInfo = null;
  console.log("im in serachController");
  const name = decodeURIComponent(req.params.name);
  const csvResult = await getDataFromCsv(filePath, name);

  if (csvResult.length === 1) {
    additonalInfo = await getAdditoinalInfo(csvResult[0]["Organisation Name"]);
  }
  if (csvResult.length === 1) {
    // expected types of json:
    // 1. csvResult.length === 1 , additonalInfo found / not found
    // 2. csvResult.length > 1, additonalInfo === null,
    // 3. csvResult.length === 0,additonalInfo === null

    if (additonalInfo === null) {
      // do something
      res.json({
        company_name: csvResult[0]["Organisation Name"],
        address: `${csvResult[0]["Town/City"]}, ${csvResult[0]["County"]}`,
        license_tier: `${csvResult[0]["Type & Rating"]}, ${csvResult[0]["Route"]}`,
        status: null,
        relatedResult: null,
      });
    } else {
      //do something
      res.json({
        company_name: csvResult[0]["Organisation Name"],
        address: additonalInfo["address_snippet"],
        license_tier: `${csvResult[0]["Type & Rating"]}, ${csvResult[0]["Route"]}`,
        status: additonalInfo["status"],
        relatedResult: null,
      });
    }
  } else if (csvResult.length > 1 && csvResult.length < 300) {
    // check for duplicate and return marged result
    // send resposnse to client
    // - client will show the list, when user select a item, search it on  compnay house api , check with name and return status and address snipit
    const relatedResult = await checkDuplicate(csvResult);
    // do something
    res.json({
      company_name: null,
      address: null,
      license_tier: null,
      status: null,
      relatedResult: relatedResult,
    });
  } else {
    // do something
    res.json(null);
  }
};
