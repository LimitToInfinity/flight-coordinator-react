import React from "react";

import moment from "moment";

import "./../Stylesheets/AddFlight.scss";

function AddFlight(props) {

    const { datetime, person, handleChange } = props;

    const current = new Date();
    current.setFullYear(current.getFullYear() + 1)
    const nowPlusOneYear = moment(current).format();
    const now = moment(new Date()).format();

    const verbage = {
        arrival: {
            h2: "Pick up",
            p: "arrives",
            label: "will",
        },
        departure: {
            h2: "Drop off",
            p: "departs",
            label: "should",
        }
    }

    return (
        <>
            {/* <h2>{ verbage[flight.direction].h2 } { flight.traveler.name }
                <img alt={ flight.traveler.name } src={ flight.traveler.image } />
            </h2>
            <p>
                { flight.traveler.name } { verbage[flight.direction].p } { moment(flight.datetime).format("ddd MM/DD/YYYY h:mm a") } at { flight.airport }
            </p> */}
            <form className="add-ride">
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
                <input type="submit" />
            </form>
        </>
    );
}

export default AddFlight;