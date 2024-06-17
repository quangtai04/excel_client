import API from "../../utils/api";

const URL_PREFIX = "/api/excel";

export const excelService = {
  createExcelVnedu,
  renderFileData,
};

function createExcelVnedu(data: { folderId: string }) {
  return API.post(`${URL_PREFIX}/createExcelVnedu`, data);
}
function renderFileData(data: { folderId: string }) {
  return API.post(`${URL_PREFIX}/renderFileData`, data);
}
