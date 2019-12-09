import React from "react";

import moment from "moment";

import "./../Stylesheets/AddFlight.scss";

function AddFlight({ datetime, handleChange, handleSubmit }) {

    const current = new Date();
    current.setFullYear(current.getFullYear() + 1);
    const nowPlusOneYear = moment(current).format();
    const now = moment(new Date()).format();

    return (
        <>
            <form onSubmit={ handleSubmit } className="add-ride">
                <label htmlFor="datetime">
                    When is your flight?
                </label>
                <input
                    onChange={ handleChange }
                    type="datetime-local"
                    id="datetime"
                    name="datetime" 
                    value={ datetime }
                    min={ now.slice(0, 16) }
                    max={ nowPlusOneYear.slice(0, 16) }
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
                <input type="submit" />
            </form>
        </>
    );
}

export default AddFlight;