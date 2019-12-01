import React from "react";

import './../Stylesheets/Travels.scss';

import Arrivals from "./Arrivals";
import Departures from "./Departures";

function Travels({ person, flights, rides, shuttles }) {

    const arrivals = () => flights.filter(flight => flight.direction === "arrival");
    const departures = () => flights.filter(flight => flight.direction === "departure");

    return (
        <section className="travels">
            <Arrivals
                arrivals={ arrivals() }
            />
            <Departures
                departures={ departures() }
            />

        </section>
    );
}

export default Travels;