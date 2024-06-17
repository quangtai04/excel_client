import React, { useRef } from "react";
import { excelService } from "./services/excel/api";
import { toast } from "react-toastify";

const App: React.FC = () => {
  const ref_folder = useRef<HTMLInputElement>(null);
  const ref_hk = useRef<HTMLSelectElement>(null);
  const folder_data =
    "https://drive.google.com/drive/u/0/folders/1UY4teQPgoBVIO_jTph36u9EpuCqwqpPq";

  const handleConvert = () => {
    if (!ref_folder.current?.value) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const folderId = ref_folder.current.value;
    const isHK2 = ref_hk.current?.value === "hk_2";
    const data = { folderId, isHK2 };
    excelService
      .createExcelVnedu(data)
      .then((res) => {
        toast.success("Convert thành công");
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  const handleFileData = () => {
    if (!ref_folder.current?.value) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const folderId = ref_folder.current.value;
    const data = { folderId };
    excelService
      .renderFileData(data)
      .then((res) => {
        toast.success("Tạo file data thành công");
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
            Folder templete
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
              Folder ID:
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              ref={ref_folder}
            />
          </div>
        </div>
        <div className="row w-100">
          {/* dropdown */}
          <div className="input-group mb-3">
            <span
              className="input-group-text"
              id="inputGroup-sizing-default"
              style={{ width: "20rem" }}
            >
              Học kì
            </span>
            <select
              className="form-select"
              aria-label="Default select example"
              ref={ref_hk}
            >
              <option value="hk_1" selected>
                Học kì 1
              </option>
              <option value="hk_2">Học kì 2</option>
            </select>
          </div>
        </div>
        <div className="row w-100 d-flex flex-row bd-highlight mb-3">
          <div className="row w-50 d-flex justify-content-center">
            <button
              className="btn btn-primary w-75"
              type="button"
              onClick={handleConvert}
            >
              Convert to vnedu file
            </button>
          </div>
          <div className="row w-50 d-flex justify-content-center">
            <button
              className="btn btn-primary w-75"
              type="button"
              onClick={handleFileData}
            >
              Create file data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
