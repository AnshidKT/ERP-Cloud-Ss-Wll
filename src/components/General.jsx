import React, { useState, useEffect } from "react";
import Select from "react-select";
import Customerjson from "../Json/Customer.json";
import ScheduleTypeJson from "../Json/Schedule Type.json";
import CustomerCertificate from "../Json/CustomerDifferentNames.json";
import SalesOrderjson from "../Json/SalesorderHdr.json";
import ServiceTypejson from "../Json/Service Type.json";
import { useSalesOrderContext } from "./CustomerContext";

const Entry = () => {
  const { setOptions } = useSalesOrderContext();

  const [customerName, setCustomerName] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [scheduleType, setScheduleType] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [certificateOptions, setCertificateOptions] = useState([]);

  //LOACLSTORAGE
  useEffect(() => {
    const savedCustomerName = JSON.parse(localStorage.getItem("customerName"));
    const savedCertificate = JSON.parse(localStorage.getItem("certificate"));
    const savedScheduleType = JSON.parse(localStorage.getItem("scheduleType"));
    const savedServiceType = JSON.parse(localStorage.getItem("serviceType"));

    if (savedCustomerName) setCustomerName(savedCustomerName);
    if (savedCertificate) setCertificate(savedCertificate);
    if (savedScheduleType) setScheduleType(savedScheduleType);
    if (savedServiceType) setServiceType(savedServiceType);
  }, []);
  ///

  //
  const handleNameChange = async (selectedOptions) => {
    setCustomerName(selectedOptions);

    const selectedCertificates = CustomerCertificate.filter(
      (cert) => cert.CustomerID === selectedOptions?.value
    );

    const updatedCertificateOptions = selectedCertificates.map((item) => ({
      value: item.NameID,
      label: item.Name,
    }));

    setCertificateOptions(updatedCertificateOptions);
    setCertificate(null);
    setScheduleType(null);
    setServiceType(null);

    const filteredSalesOrders = SalesOrderjson.filter(
      (order) => order.CustomerID === selectedOptions?.value
    );

    const updatedSalesOrderOptions = filteredSalesOrders.map((item) => ({
      value: item.CustomerID,
      label: item.SalesOrderNo,
    }));

    setOptions(updatedSalesOrderOptions);

    localStorage.setItem("customerName", JSON.stringify(selectedOptions));
    localStorage.removeItem("certificate");
    localStorage.removeItem("scheduleType");
    localStorage.removeItem("serviceType");
  };
  //
  //
  const handleCertificateChange = (selectedOptions) => {
    setCertificate(selectedOptions);

    localStorage.setItem("certificate", JSON.stringify(selectedOptions));
  };

  const handleScheduleTypeChange = (selectedOptions) => {
    setScheduleType(selectedOptions);

    localStorage.setItem("scheduleType", JSON.stringify(selectedOptions));
  };

  const handleServiceTypeChange = (selectedOptions) => {
    setServiceType(selectedOptions);

    localStorage.setItem("serviceType", JSON.stringify(selectedOptions));
  };
  //
  const CustomerName = Customerjson.map((item) => ({
    value: item.CustomerID,
    label: item.CustomerName,
  }));

  const ScheduleTypeList = ScheduleTypeJson.map((item) => ({
    value: item.SerialNo,
    label: item.SalesOrderNo,
  }));

  const ServiceTypes = ServiceTypejson.map((item) => ({
    value: item.ServiceTypeCtrID,
    label: item.ServiceType,
  }));

  return (
    <div className="entry-main-container">
      <div className="Entry-container">
        <input className="general-input" type="number" placeholder="Req ID" />
        <input className="general-input" type="text" placeholder="Req NO" />
        <Select
          className="reg-select"
          placeholder="Customer"
          options={CustomerName}
          onChange={handleNameChange}
          value={customerName}
        />
        <Select
          className="reg-select"
          placeholder="Name In Certificate"
          options={certificateOptions}
          onChange={handleCertificateChange}
          value={certificate}
        />
        <Select
          className="reg-select"
          placeholder="Schedule type"
          options={ScheduleTypeList}
          onChange={handleScheduleTypeChange}
          value={scheduleType}
        />
        <Select
          className="reg-select"
          placeholder="Service type"
          options={ServiceTypes}
          onChange={handleServiceTypeChange}
          value={serviceType}
        />
      </div>
    </div>
  );
};

export default Entry;
