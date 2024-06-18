import React, { useRef, useState } from "react";
import { excelService } from "./services/excel/api";
import { toast } from "react-toastify";
import { generateId } from "./utils/help";

enum Process {
  CREATE_EXCEL = "CREATE_EXCEL",
  CREATE_FILE_DATA = "CREATE_FILE_DATA",
}

const App: React.FC = () => {
  const ref_folder = useRef<HTMLInputElement>(null);
  const ref_hk = useRef<HTMLSelectElement>(null);
  const folder_data =
    "https://drive.google.com/drive/u/0/folders/1UY4teQPgoBVIO_jTph36u9EpuCqwqpPq";

  const [currentProgress, setCurrentProgress] = useState<
    Map<
      string,
      {
        type: Process;
        status: "PENDING" | "SUCCESS" | "ERROR";
        time: Date;
      }
    >
  >(new Map());

  const handleConvert = () => {
    if (!ref_folder.current?.value) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const key = generateId();
    currentProgress.set(key, {
      type: Process.CREATE_EXCEL,
      status: "PENDING",
      time: new Date(),
    });
    setCurrentProgress(new Map(currentProgress));
    const folderId = ref_folder.current.value;
    const isHK2 = ref_hk.current?.value === "hk_2";
    const data = { folderId, isHK2 };
    excelService
      .createExcelVnedu(data)
      .then((res) => {
        toast.success("Tạo file thành công");
        currentProgress.set(key, {
          type: Process.CREATE_EXCEL,
          status: "SUCCESS",
          time: new Date(),
        });
        setCurrentProgress(new Map(currentProgress));
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
    const key = generateId();
    currentProgress.set(key, {
      type: Process.CREATE_FILE_DATA,
      status: "PENDING",
      time: new Date(),
    });
    setCurrentProgress(new Map(currentProgress));
    const folderId = ref_folder.current.value;
    const data = { folderId };
    excelService
      .renderFileData(data)
      .then((res) => {
        toast.success("Tạo file data thành công");
        currentProgress.set(key, {
          type: Process.CREATE_FILE_DATA,
          status: "SUCCESS",
          time: new Date(),
        });
        setCurrentProgress(new Map(currentProgress));
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
        <div className="row w-100">
          {/* create table boostrap */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Time</th>
                <th scope="col">Process</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(currentProgress)
                .reverse()
                .map(([key, value], index) => (
                  <tr key={key}>
                    <th scope="row">{index + 1}</th>
                    <td>{value.time.toLocaleString()}</td>
                    <td>
                      {(() => {
                        switch (value.type) {
                          case Process.CREATE_EXCEL:
                            return "Create excel VNEDU";
                          case Process.CREATE_FILE_DATA:
                            return "Create file data";
                        }
                      })()}
                    </td>
                    <td>
                      {(() => {
                        switch (value.status) {
                          case "PENDING":
                            return (
                              <span className="badge bg-warning">PENDING</span>
                            );
                          case "SUCCESS":
                            return (
                              <span className="badge bg-success">SUCCESS</span>
                            );
                          case "ERROR":
                            return (
                              <span className="badge bg-danger">ERROR</span>
                            );
                        }
                      })()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default App;
