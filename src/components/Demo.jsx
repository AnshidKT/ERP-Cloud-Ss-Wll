import React from "react";
import axios from "axios";
import { useState } from "react";

const Demo = () => {
  const [name, setName] = useState("");
  const [mail, setEmail] = useState("");
  const [desgination, setDesgination] = useState("");
  const [number, setNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      mail: mail,
      desgination: desgination,
      number: number,
    };
    axios
      .post(
        "https://sheet.best/api/sheets/9ab5880a-4fba-4f5a-a35b-434e2765f337",
        data
      )
      .then((response) => {
        console.log(response);
        setName("");
        setEmail("");
        setDesgination("");
        setNumber("");
        setSuccessMessage("Data submitted successfully!");
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setErrorMessage("An error occurred while submitting data.");
        setSuccessMessage("");
      });
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <p>Login</p>
        <div className="group">
          <input
            required={true}
            className="main-input"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <span className="highlight-span"></span>
          <label className="lebal-email">name</label>
        </div>

        <div className="group">
          <input
            required={true}
            className="main-input"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={mail}
          />
          <span className="highlight-span"></span>
          <label className="lebal-email">email</label>
        </div>

        <div className="group">
          <input
            required={true}
            className="main-input"
            type="text"
            onChange={(e) => setDesgination(e.target.value)}
            value={desgination}
          />
          <span className="highlight-span"></span>
          <label className="lebal-email">designtion</label>
        </div>

        <div className="group">
          <input
            required={true}
            className="main-input"
            type="text"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
          <span className="highlight-span"></span>
          <label className="lebal-email">number</label>
        </div>
        <button className="submit">submit</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Demo;
