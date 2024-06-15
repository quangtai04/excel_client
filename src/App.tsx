import React, { useRef } from "react";
import { excelService } from "./services/excel/api";
import { toast } from "react-toastify";

const App: React.FC = () => {
  const ref_vnedu = useRef<HTMLInputElement>(null);
  const ref_tkb = useRef<HTMLInputElement>(null);
  const ref_data = useRef<HTMLInputElement>(null);
  const ref_format = useRef<HTMLInputElement>(null);
  const ref_type = useRef<HTMLSelectElement>(null);
  const folder_data =
    "https://drive.google.com/drive/u/0/folders/11QgRIMWJnLGqZPBQRHkw5OAcazacFwT0";

  const getSheetId = (link: string) => {
    const _link = link.replaceAll(
      "https://docs.google.com/spreadsheets/d/",
      ""
    );
    const sheet_id = _link.split("/")[0];
    return sheet_id;
  };
  const handleConvert = () => {
    if (
      !ref_vnedu.current?.value ||
      !ref_tkb.current?.value ||
      !ref_data.current?.value
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const sheet_id_vnedu = getSheetId(ref_vnedu.current?.value || "");
    const sheet_id_tkb = getSheetId(ref_tkb.current?.value || "");
    const sheet_id_data = getSheetId(ref_data.current?.value || "");
    const data = {
      sheet_id_vnedu,
      sheet_id_tkb,
      sheet_id_data,
    };
    excelService
      .createExcelVnedu(data)
      .then((res) => {
        toast.success("Convert thành công");
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  const handleFormat = () => {
    if (!ref_format.current?.value || !ref_type.current?.value) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const sheet_id = getSheetId(ref_format.current?.value || "");
    const type_sort = ref_type.current?.value;
    const data = {
      sheet_id,
      type_sort,
    };
    excelService
      .sortData(data)
      .then((res) => {
        toast.success("Format thành công");
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  return (
    <div className="container mt-5 d-flex flex-column bd-highlight mb-3">
      <div
        className="row w-100"
        onClick={() => {
          window.open(folder_data, "_blank");
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="input-group mb-3">
          <span
            className="input-group-text"
            id="inputGroup-sizing-default"
            style={{ width: "20rem" }}
          >
            Folder data
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={folder_data}
            disabled
          />
        </div>
      </div>
      <div className="row w-100">
        <div className="row w-100">
          <h4>Conver file excel</h4>
        </div>

        <div className="row w-100">
          <div className="input-group mb-3">
            <span
              className="input-group-text"
              id="inputGroup-sizing-default"
              style={{ width: "20rem" }}
            >
              Link file excel vnedu
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              ref={ref_vnedu}
            />
          </div>
        </div>
        <div className="row w-100">
          <div className="input-group mb-3">
            <span
              className="input-group-text"
              id="inputGroup-sizing-default"
              style={{ width: "20rem" }}
            >
              Link file excel tkb
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              ref={ref_tkb}
            />
          </div>
        </div>
        <div className="row w-100">
          <div className="input-group mb-3">
            <span
              className="input-group-text"
              id="inputGroup-sizing-default"
              style={{ width: "20rem" }}
            >
              Link file excel data
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              ref={ref_data}
            />
          </div>
        </div>
        <div className="row">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>
      </div>
      <div className="row w-100" style={{ marginTop: "200px" }}>
        <div className="row w-100">
          <h4>Format data</h4>
        </div>

        <div className="row w-100">
          <div className="input-group mb-3">
            <span
              className="input-group-text"
              id="inputGroup-sizing-default"
              style={{ width: "20rem" }}
            >
              Link file excel data
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              ref={ref_format}
            />
          </div>
        </div>
        <div className="row w-100">
          <div className="input-group mb-3">
            <span
              className="input-group-text"
              id="inputGroup-sizing-default"
              style={{ width: "20rem" }}
            >
              Type
            </span>
            <select
              className="form-select"
              aria-label="Default select example"
              ref={ref_type}
            >
              <option value="GV">Giáo viên</option>
              <option value="MH">Môn học</option>
            </select>
          </div>
        </div>

        <div className="row">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleFormat}
          >
            Format
          </button>
        </div>
      </div>
    </div>
  );
};
export default App;
