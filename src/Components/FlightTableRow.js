import React from "react";

import moment from "moment";

import './../Stylesheets/FlightTableRow.scss';

function FlightTableRow({ flight, toggleModal, toggleFlight }) {

    const day = moment(flight.datetime).format("ddd");
    const date = moment(flight.datetime).format("MMM DD");
    const time = moment(flight.datetime).format("h:mm a");

    const handleClick = () => {
        toggleFlight(flight);
        toggleModal();
    }

    return (
        <tbody  className="tbody" onClick={ handleClick }>
            <tr>
                <td>
                    <img 
                        alt={ flight.traveler.name }
                        src={ flight.traveler.image } 
                    />
                </td>
                <td>{ flight.traveler.name }</td>
                <td>{ flight.airport }</td>
                <td>{ flight.airline }</td>
                <td>{ flight.number }</td>
                <td>{ day }</td>
                <td>{ date }</td>
                <td>{ time }</td>
                <td 
                    className={ flight.ride ? "has" : "needs" }
                >
                    {flight.ride
                        ? flight.ride.driver.name
                        : "Click to give ride"
                    }
                </td>
            </tr>
        </tbody>
    );
}

export default FlightTableRow;