import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import axiosWithAuth from "../utils/axiosWithAuth";
import { addPlant } from "../store/actions";

const intialValues = {
  nickname: "",
  species: "",
  h2oFrequency: "",
};

const PlantForm = (props) => {
  const [values, setValues] = useState(intialValues);
  const [plants, setPlants] = useState([]);

  const history = useHistory();

  const addNewPlant = (e) => {
    const newPlant = {
      nickname: values.nickname.trim(),
      species: values.species.trim(),
      h2oFrequency: values.h2oFrequency,
    };
    setPlants(newPlant);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    addNewPlant();
    console.log(plants);
    props.addPlant(addNewPlant, history, setValues, intialValues);
    setValues(intialValues);
  };

  console.log("this is plants", plants);
  return (
    <div className="plant-form-container">
      <h2>This is where the plant form will go</h2>
      <form className="plant-form" onSubmit={formSubmit}>
        <div className="plant-inputs">
          <label className="plant-label" htmlFor="nickname">
            What is the name of your plant?
          </label>
          <input
            type="string"
            name="nickname"
            id="nickname"
            className="plant-input"
            placeholder="Plant name"
            onChange={handleChanges}
          />
        </div>
        <br></br>
        <div className="plant-inputs">
          <label className="plant-label" htmlFor="species">
            What species of plant do you have?
          </label>
          <input
            type="string"
            name="species"
            id="species"
            className="plant-input"
            placeholder="Plant species"
            onChange={handleChanges}
          />
        </div>
        <br></br>
        <div className="plant-inputs">
          <label className="plant-label" htmlFor="h2oFrequency">
            How often do you need to water your plant?
          </label>
          <input
            type="string"
            name="h2oFrequency"
            id="h2oFrequency"
            className="plant-input"
            placeholder="How many times a week?"
            onChange={handleChanges}
          />
        </div>
        <br></br>
        <button className="form-btn" type="submit">
          Save Your Plant!
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plants: state.plants,
  };
};

export default connect(mapStateToProps, { addPlant })(PlantForm);
