const fs = require("fs/promises");
const { globalVariables } = require("../config.js");

const readCSV = async (filePath) => {
  const results = [];
  let headerRow = null;

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const rows = fileContent.split("\n");

    for (let i = 0; i < rows.length; i++) {
      const columns = rows[i].split(",");

      if (i === 0) {
        // Save the header row
        headerRow = columns.map((header) => {
          return header
            .split('"')
            .join("")
            .replace(/[\r\n"]+/g, "");
        }); // Trim leading and trailing spaces
        continue;
      }
      const result = {};
      headerRow.forEach((header, index) => {
        result[header] = columns[index];
      });
      results.push(result);
      // break; // Stop the loop once a match is found
    }
    return results;
  } catch (error) {
    throw error;
  }
};

// Function to compare two arrays of objects and find added and removed data
function compareCSV(prevData, currData) {
  const addedData = [];
  const removedData = [];

  const prevDataMap = new Map(
    prevData.map((item) => [JSON.stringify(item), item])
  );
  const currDataMap = new Map(
    currData.map((item) => [JSON.stringify(item), item])
  );

  // Find added data
  for (const [key, value] of currDataMap) {
    if (!prevDataMap.has(key)) {
      addedData.push(value);
    }
  }

  // Find removed data
  for (const [key, value] of prevDataMap) {
    if (!currDataMap.has(key)) {
      removedData.push(value);
    }
  }

  return { addedData, removedData };
}

/**
 * @param pageIndex
 * @param pageSize,Default:20
 * @returns activeOrg, addedData,removedData,
 */
exports.getAllCsvData = async () => {
  try {
    const prevData = await readCSV(globalVariables.prevCsvFilePath);
    const currData = await readCSV(globalVariables.currCsvFilePath);

    const { addedData, removedData } = compareCSV(prevData, currData);

    return {
      activeOrg: currData,
      addedData,
      removedData,
    };
  } catch (error) {
    console.error("Error:", error);
  }
};
