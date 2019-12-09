import React from "react";

import moment from "moment";
import Datetime from "react-datetime";

import "./../Stylesheets/AddRide.scss";

function AddRide(props) {

    const { datetime, handleDate, handleSubmit, 
        deleteRide, flight, person
    } = props;

    const yesterday = Datetime.moment().subtract(1, 'day');
    const oneYearFromNow = Datetime.moment().add(1, 'year');
    const isValid = (current) => {
        return current.isAfter(yesterday)
            && current.isBefore(oneYearFromNow);
    };
    const inputProps = { id: "datetime", name: "datetime" };

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

    const checkIfRide = () => {
        if (flight.ride) {
            if (person.id === flight.ride.driver.id) {
                return <button className="delete-ride" onClick={ deleteRide }>Remove ride</button>;
            } else {
                return null;
            }
        } else {
            return null
        }
    }

    return (
        <>
            <h2>{ verbage[flight.direction].h2 } { flight.traveler.name }
                <img alt={ flight.traveler.name } src={ flight.traveler.image } />
            </h2>
            <p>
                { flight.traveler.name } { verbage[flight.direction].p } { moment(flight.datetime).format("ddd MM/DD/YYYY h:mm a") } at { flight.airport }
            </p>
            <form className="add-ride" onSubmit={ handleSubmit }>
                <label htmlFor="datetime">
                    When { verbage[flight.direction].label } you be at the airport?
                </label>
                <Datetime 
                    onChange={ handleDate }
                    defaultValue={flight.direction === "arrival"
                        ? moment(datetime)
                        : moment(datetime).subtract(105, 'minutes')
                    }
                    isValidDate={ isValid }
                    inputProps={ inputProps }
                />
                <div className="form-buttons">
                    <input type="submit" />
                    { checkIfRide() }
                </div>
            </form>
        </>
    );
}

export default AddRide;