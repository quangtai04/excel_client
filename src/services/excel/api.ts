import API from "../../utils/api";

const URL_PREFIX = "/api/excel";

export const excelService = {
  createExcelVnedu,
  sortData,
};

function createExcelVnedu(data: {
  sheet_id_vnedu: string;
  sheet_id_tkb: string;
  sheet_id_data: string;
}) {
  return API.post(`${URL_PREFIX}/createExcelVnedu`, data);
}
function sortData(data: {
  sheet_id: string;
  stt_start?: string;
  type_sort: string;
}) {
  return API.post(`${URL_PREFIX}/sortData`, data);
}
