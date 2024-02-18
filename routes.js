const express = require("express");
const router = express.Router();
const {
  activeOrganizationController,
  newAddedOrganizationController,
  removedOrganizationController,
} = require("./controllers/allData.js");
const { serachController } = require("./controllers/search.js");
const { checkCsvFile } = require("./Middleware/checkCsvFile.js");
const { companyHouseSearch } = require("./controllers/companyHouse.js");
const { newsfeedConroller } = require("./controllers/newsFeed.js");

/** Routes */
router.get("/:name", checkCsvFile, serachController);
router.get("/activeOrg/:pageIndex/:pageSize?", activeOrganizationController);
router.get(
  "/newAddedOrg/:pageIndex/:pageSize?",
  newAddedOrganizationController
);
router.get("/removedOrg/:pageIndex/:pageSize?", removedOrganizationController);
router.get("/companyhouse/:name", companyHouseSearch);

// other routes
router.get("/news/newsfeed", newsfeedConroller);

module.exports = router;
