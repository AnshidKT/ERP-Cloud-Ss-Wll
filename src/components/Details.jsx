import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";
import Select from "react-select";
import Certificates from "../Json/CustomerDifferentNames.json";
import savedImg from "../img/saved.png";
import Unit from "../Json/Unit.json";
import languagejson from "../Json/Languge.json";
import locationJson from "../Json/Location.json";
import projectJson from "../Json/Project.json";
import scheduleJosn from "../Json/Schedule Type.json";
import { useSalesOrderContext } from "./CustomerContext";

const Details = ({ handleChangeMain }) => {
  const { selectedSalesOrder, salesOrderOptions, setSalesOrder } =
    useSalesOrderContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [slNo, setSlNo] = useState(1);
  const [additionalRows, setAdditionalRows] = useState([]);
  const [PopupExamUnit, setPopupExamUnit] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [approval, setApproval] = useState("");
  const [selectedCertificates, setSelectedCertificates] = useState([]);

  useEffect(() => {
    const certificatesForSelectedOrder = Certificates.filter(
      (item) => item.CustomerID === selectedSalesOrder?.value
    ).map((item) => ({
      value: item.NameID,
      label: item.Name,
    }));

    setSelectedCertificates(certificatesForSelectedOrder);
  }, [selectedSalesOrder]);

    const openModal = (selectedOption) => {
      setSelectedService(selectedOption);
      setIsModalOpen(true);
    setPopupExamUnit("Yes");
    setApproval("Enertech");
    const projectName = projectJson.find(
      (item) => item.CustomerID === selectedOption.value
    )?.ProjectName;
    setSelectedServiceName(projectName || "");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOkButtonClick = () => {
    if (selectedService) {
      const newRowData = {
        slNo: slNo,
        salesOrder: selectedService?.label || "",
        service: selectedService?.value || "",
        projectName: selectedServiceName?.label || "",
        certificateName: selectedCertificates?.label || "",
      };

      setAdditionalRows((prevRows) => [...prevRows, newRowData]);

      localStorage.setItem(
        "additionalRows",
        JSON.stringify([...additionalRows, newRowData])
      );
      localStorage.setItem("popupExamUnit", PopupExamUnit);
      localStorage.setItem("approval", approval);
    }
    closeModal();
  };

  const showModal = () => {
    setModalVisible(false);

    if (additionalRows.length === 0) {
      alert("The details are empty!");
    } else {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 700);
    }
  };

  useEffect(() => {
    if (selectedService) {
      setSlNo((prevSlNo) => prevSlNo + 1);
    } else {
      setSlNo(0);
    }
  }, [selectedService]);

  useEffect(() => {
    const savedAdditionalRows = JSON.parse(
      localStorage.getItem("additionalRows")
    );
    const savedPopupExamUnit = localStorage.getItem("popupExamUnit");
    const savedApproval = localStorage.getItem("approval");

    if (savedAdditionalRows) setAdditionalRows(savedAdditionalRows);
    if (savedPopupExamUnit) setPopupExamUnit(savedPopupExamUnit);
    if (savedApproval) setApproval(savedApproval);
  }, []);

  const handleDeleteButtonClick = (index) => {
    const updatedRows = [...additionalRows];
    updatedRows.splice(index, 1);
    setAdditionalRows(updatedRows);

    localStorage.setItem("additionalRows", JSON.stringify(updatedRows));
  };

  const handleClearButtonClick = () => {
    setAdditionalRows([]);

    localStorage.removeItem("additionalRows");
    localStorage.removeItem("popupExamUnit");
    localStorage.removeItem("approval");
  };

  const UnitId = Unit.map((item) => ({
    value: item.UnitID,
    label: item.ShortName,
  }));

  const languageList = languagejson.map((item) => ({
    value: item.LangControlID,
    label: item.Languge,
  }));
  const locationList = locationJson.map((item) => ({
    value: item.LocationControlID,
    label: item.Location,
  }));

  const projectList = projectJson.map((item) => ({
    value: item.CustomerID,
    label: item.ProjectName,
  }));
  const scheduleList = scheduleJosn.map((item) => ({
    value: item.SerialNo,
    label: item.SalesOrderNo,
  }));
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 130,
      border: 0,
    }),
  };

  return (
    <div className="general-container">
      <div className="details-sub-container">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>sl no</th>
                <th>sales order</th>
                <th>service Name</th>
                <th>name in certificate</th>
                <th>for exam only</th>
                <th>approval body</th>
                <th>Date and Time</th>
                <th>schedule</th>
                <th>project</th>
                <th>unit</th>
                <th>quantity</th>
                <th>Batch strength</th>
                <th>Location</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td style={{ width: "auto" }}>
                  <Select
                    onChange={(selectedOption) => {
                      openModal(selectedOption);
                      setSalesOrder(selectedOption);
                    }}
                    styles={customStyles}
                    options={salesOrderOptions}
                    value={selectedSalesOrder}
                  />
                </td>
                <td>
                  <td>{selectedServiceName}</td>
                </td>
                <td>
                  <Select
                    placeholder="certificate"
                    options={selectedCertificates}
                  />
                </td>
                <td>
                  <input
                    className="exam-input-td"
                    type="text"
                    value={PopupExamUnit}
                    onChange={(e) => setPopupExamUnit(e.target.value)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="exam-input-td"
                    value={approval}
                    onChange={(e) => setApproval(e.target.value)}
                    readOnly
                  />
                </td>
                <td>
                  <input type="datetime-local" className="exam-input-td" />
                </td>
                <td>
                  <Select styles={customStyles} options={scheduleList} />
                </td>
                <td>
                  <Select styles={customStyles} options={projectList} />
                </td>
                <td>
                  <Select styles={customStyles} options={UnitId} />
                </td>
                <td>
                  <input className="exam-input-td" type="number" />
                </td>
                <td></td>
                <td>
                  <Select styles={customStyles} options={locationList} />
                </td>
                <td>
                  <Select styles={customStyles} options={languageList} />
                </td>
              </tr>
              {additionalRows.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.salesOrder}</td>
                  <td>{selectedServiceName}</td>
                  <td>
                    <Select
                      placeholder="certificate"
                      options={selectedCertificates}
                    />
                  </td>
                  <td>
                    <input
                      className="exam-input-td"
                      value={row.certificateName}
                      type="text"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="exam-input-td"
                      value={row.approval}
                      readOnly
                    />
                  </td>
                  <td>
                    <input type="datetime-local" className="exam-input-td" />
                  </td>
                  <td>
                    <Select styles={customStyles} options={scheduleList} />
                  </td>
                  <td>
                    <Select styles={customStyles} options={projectList} />
                  </td>
                  <td>
                    <Select styles={customStyles} options={UnitId} />
                  </td>
                  <td>
                    <input
                      className="exam-input-td"
                      type="number"
                      value={row.quantity}
                    />
                  </td>
                  <td></td>
                  <td>
                    <Select styles={customStyles} options={locationList} />
                  </td>
                  <td>
                    <Select styles={customStyles} options={languageList} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Selected Service Details"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            content: {
              width: "70%",
              margin: "auto",
              height: "70%",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
          ariaHideApp={false}
        >
          <h2 style={{ marginBottom: "20px" }}>Selected Service Details</h2>
          <div className="details-modal-div">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>sl no</th>
                  <th>sales order</th>
                  <th>service Name</th>
                  <th>for exam only</th>
                  <th>unit</th>
                  <th>quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{slNo}</td>
                  <td>{selectedService?.label || ""}</td>
                  {/* <td>{selectedService?.value || ""}</td> */}

                  <td>{selectedServiceName}</td>

                  <td>
                    <input
                      className="exam-input-td"
                      type="text"
                      value={PopupExamUnit}
                      onChange={(e) => setPopupExamUnit(e.target.value)}
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            onClick={handleOkButtonClick}
            className="btn btn-primary"
            style={{ marginTop: "20px", marginRight: "10px" }}
          >
            Ok
          </button>
          <button
            onClick={closeModal}
            className="btn btn-secondary"
            style={{ marginTop: "20px" }}
          >
            Close
          </button>
        </Modal>

        {isModalVisible && (
          <Modal
            isOpen={isModalVisible}
            contentLabel="Details Saved"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
              content: {
                width: "40%",
                height: "30%",
                margin: "auto",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
            ariaHideApp={false}
          >
            <div className="d-flex flex-column align-items-center">
              <span style={{ fontSize: "1.375rem" }}>Details Are Saved </span>
              <img src={savedImg} alt="" />
            </div>
          </Modal>
        )}
      </div>
      <div className="btns-div d-flex justify-content-end align-items-center">
        <button onClick={showModal} className="btns ">
          Save
        </button>
        <button onClick={handleDeleteButtonClick} className="btns">
          Delete
        </button>
        <button onClick={handleClearButtonClick} className="btns">
          Clear
        </button>
        <Link to="">
          <button className="btns" onClick={handleChangeMain}>
            {" "}
            Close
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Details;
