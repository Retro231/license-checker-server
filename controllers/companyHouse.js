import axios from "axios";

/**Return list of company list */
export const getData = async (name) => {
  const apiKey = process.env.COMPNAYHOUSE_KEY;
  // const companyId = "00000006";
  // const apiUrl = `https://api.company-information.service.gov.uk/company/${companyId}`;
  const apiUrl = `https://api.company-information.service.gov.uk/search/companies?q=${name}`;
  // const apiUrl = `https://api.company-information.service.gov.uk/advanced-search/companies/:${companyId}`;

  const config = {
    headers: {
      Authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
    },
  };

  try {
    const response = await axios.get(apiUrl, config);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const companyHouseSearch = async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  console.log(name);
  const data = await getData(name);
  if (data) {
    res.json({ data });
  }
};
