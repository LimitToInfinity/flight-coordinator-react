import React from "react";

import './../Stylesheets/Arrivals.scss';
import FlightTableHeader from "./FlightTableHeader";
import FlightTableRow from "./FlightTableRow";

function Arrivals({ arrivals }) {

    const displayFlightRows = () => {
        return arrivals.map(arrival => {
            return <FlightTableRow key={ arrival.id } flight={ arrival } />;
        })
    }

    return (
        <section className="arrivals">
            <table>
                <caption>Arrivals</caption>
                <FlightTableHeader / >
                { displayFlightRows() }
            </table>
        </section>
    );
}

export default Arrivals;