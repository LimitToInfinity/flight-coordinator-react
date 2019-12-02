import React from "react";

import moment from "moment";

import './../Stylesheets/FlightTableRow.scss';

function FlightTableRow({ flight, person, toggleModal, toggleFlight }) {

    const day = moment(flight.datetime).format("ddd");
    const date = moment(flight.datetime).format("MMM DD");
    const time = moment(flight.datetime).format("h:mm a");

    const handleClick = () => {
        toggleFlight(flight);
        toggleModal();
        // if (flight.ride) {
        //     window.confirm(`Do you want to pick up ${flight.traveler.name} instead?`)
        //         ? console.log("ride id", flight.ride.id, "person", person.id)
        //         : console.log("no")
        // } else if (!flight.ride) {    
        //     window.confirm(`Do you want to pick up ${flight.traveler.name}?`)
        //         ? console.log("ride id", flight.ride, "person", person.id, "flight id", flight.id, "traveler id", flight.traveler.id)
        //         : console.log("no")
        // }
    }

    return (
        <tbody onClick={ handleClick }>
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
                        : "None"
                    }
                </td>
            </tr>
        </tbody>
    );
}

export default FlightTableRow;