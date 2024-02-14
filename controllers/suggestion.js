import fs from "node:fs/promises";
import path from "path";

// Get the absolute path to the CSV file using __dirname
const filePath = path.join(process.cwd(), "downloaded_file.csv");

// Function to retrieve all 'Organisation Name' values from the CSV file
const getAllOrganizationNames = async (filePath) => {
  const companyNames = [];

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const rows = fileContent.split("\n");

    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(",");

      // Assuming the column containing the organization name is named 'Organisation Name'
      const organizationName = columns[0].replace(/[\r\n"]+/g, "").trim(); // Remove unwanted characters

      // Add the organization name to the array
      companyNames.push(organizationName);
    }

    return companyNames;
  } catch (error) {
    throw error;
  }
};
export const suggestionController = async (req, res) => {
  const data = await getAllOrganizationNames(filePath);
  res.json({ data });
};
