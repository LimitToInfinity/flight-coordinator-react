import React from "react";

import './../Stylesheets/Travels.scss';

import Arrivals from "./Arrivals";
import Departures from "./Departures";

function Travels({ toggleModal, toggleFlight, person, flights, rides, shuttles }) {

    const arrivals = () => flights.filter(flight => flight.direction === "arrival");
    const departures = () => flights.filter(flight => flight.direction === "departure");

    return (
        <section className="travels">
            <Arrivals
                arrivals={ arrivals() }
                person={ person }
                toggleFlight={ toggleFlight }
                toggleModal={ toggleModal }
            />
            <Departures
                departures={ departures() }
                person={ person }
                toggleFlight={ toggleFlight }
                toggleModal={ toggleModal }
            />

        </section>
    );
}

export default Travels;