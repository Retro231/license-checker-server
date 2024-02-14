import express from "express";
const router = express.Router();
import {
  activeOrganizationController,
  newAddedOrganizationController,
  removedOrganizationController,
} from "./controllers/allData.js";
import { serachController } from "./controllers/search.js";
import { checkCsvFile } from "./Middleware/checkCsvFile.js";
import { suggestionController } from "./controllers/suggestion.js";
import { companyHouseSearch } from "./controllers/companyHouse.js";
import { newsfeedConroller } from "./controllers/newsFeed.js";

/** Routes */
router.get("/company/:name", checkCsvFile, serachController);
router.get("/activeOrg/:pageIndex/:pageSize?", activeOrganizationController);
router.get(
  "/newAddedOrg/:pageIndex/:pageSize?",
  newAddedOrganizationController
);
router.get("/removedOrg/:pageIndex/:pageSize?", removedOrganizationController);
router.get("/suggestions", checkCsvFile, suggestionController);
router.get("/companyhouse/:name", companyHouseSearch);
router.get("/newsfeed", newsfeedConroller);
router.get("/", (req, res) => {
  res.send("Hello Mr.Unknown");
});

export default router;
