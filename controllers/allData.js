import { getAllCsvData } from "../helper/getAllCsvData.js";

function paginate(data, pageIndex, pageSize = 20) {
  const totalPages = Math.ceil(data.length / pageSize);
  if (pageIndex < 1 || pageIndex > totalPages) {
    return []; // Page index out of bounds
  }
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  return data.slice(startIndex, endIndex);
}

export const activeOrganizationController = async (req, res) => {
  const pageIndex = parseInt(req.params.pageIndex);
  const pageSize = parseInt(req.params.pageSize) || 20;
  const { activeOrg } = await getAllCsvData();

  const activeOrganaizations = paginate(activeOrg, pageIndex, pageSize);
  res.json({
    activeOrganaizations,
    itemPerPage: pageSize,
    pageIndex,
    totalItem: activeOrg.length,
    totalPages: Math.ceil(activeOrg.length / pageSize),
  });
};

export const newAddedOrganizationController = async (req, res) => {
  const pageIndex = parseInt(req.params.pageIndex);
  const pageSize = parseInt(req.params.pageSize) || 20;
  const { addedData } = await getAllCsvData();

  const newAddedOrganizations = paginate(addedData, pageIndex, pageSize);
  res.json({
    newAddedOrganizations,
    itemPerPage: pageSize,
    pageIndex,
    totalItem: addedData.length,
    totalPages: Math.ceil(addedData.length / pageSize),
  });
};

export const removedOrganizationController = async (req, res) => {
  const pageIndex = parseInt(req.params.pageIndex);
  const pageSize = parseInt(req.params.pageSize) || 20;
  const { removedData } = await getAllCsvData();

  const removedOrganizations = paginate(removedData, pageIndex, pageSize);
  res.json({
    removedOrganizations,
    itemPerPage: pageSize,
    pageIndex,
    totalItem: removedData.length,
    totalPages: Math.ceil(removedData.length / pageSize),
  });
};
