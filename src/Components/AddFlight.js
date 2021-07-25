import React from "react";

import moment from "moment";
import Datetime from "react-datetime";

import "../Stylesheets/AddFlight.scss";
import '../Stylesheets/Datetime.scss';

function AddFlight({ datetime, handleDate, handleChange, handleSubmit }) {

  const yesterday = Datetime.moment().subtract(1, 'day');
  const oneYearFromNow = Datetime.moment().add(1, 'year');
  const isValid = (current) => {
    return current.isAfter(yesterday)
      && current.isBefore(oneYearFromNow);
  };
  const inputProps = { id: "datetime", name: "datetime" };

  return (
    <form onSubmit={ handleSubmit } className="add-ride">
      <label htmlFor="datetime">
        When is your flight?
      </label>
      <Datetime 
        onChange={ handleDate }
        defaultValue={ moment(datetime) }
        isValidDate={ isValid }
        inputProps={ inputProps }
      />
      <select
        onChange={ handleChange }
        id="direction"
        name="direction" 
      >
        <option value="">Arrival or Departure?</option>
        <option value="arrival">Arrival</option>
        <option value="departure">Departure</option>
      </select>
      <select
        onChange={ handleChange }
        id="airline"
        name="airline" 
      >
        <option value="">Which airline?</option>
        <option value="American">American</option>
        <option value="Delta">Delta</option>
        <option value="Frontier">Frontier</option>
        <option value="JetBlue">JetBlue</option>
        <option value="Southwest">Southwest</option>
        <option value="Spirit">Spirit</option>
        <option value="United">United</option>
      </select>
      <select
        onChange={ handleChange }
        id="airport"
        name="airport" 
      >
        <option value="">Which airport?</option>
        <option value="Bush (IAH)">Bush (IAH)</option>
        <option value="Hobby (HOU)">Hobby (HOU)</option>
      </select>
      <label htmlFor="flightNumber">
        Flight number?
      </label>
      <input
        onChange={ handleChange }
        type="text"
        id="flightNumber"
        name="flightNumber" 
        placeholder="enter flight #"
      />
      <div className="form-buttons">
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
}

export default AddFlight;