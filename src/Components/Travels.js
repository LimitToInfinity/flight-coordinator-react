import React from "react";

import './../Stylesheets/Travels.scss';

import Arrivals from "./Arrivals";
import Departures from "./Departures";

function Travels({ toggleModal, toggleFlight, person, flights, rides, shuttles }) {

    const arrivals = () => flights.filter(flight => flight.direction === "arrival");
    const departures = () => flights.filter(flight => flight.direction === "departure");

    return (
        <section className="travels">
            <button 
                onClick={ toggleModal }
                className="add-flight"
            >Add flight</button>
            <Arrivals
                arrivals={ arrivals().sort(byDate) }
                person={ person }
                toggleFlight={ toggleFlight }
                toggleModal={ toggleModal }
            />
            <Departures
                departures={ departures().sort(byDate) }
                person={ person }
                toggleFlight={ toggleFlight }
                toggleModal={ toggleModal }
            />

        </section>
    );
}

function byDate(a, b) {
    if (a.datetime > b.datetime) { return -1; }
    else if (a.datetime < b.datetime) { return 1; }
    else { return 0; }
}

export default Travels;