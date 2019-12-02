import React from "react";

import './../Stylesheets/Departures.scss';
import FlightTableHeader from "./FlightTableHeader";
import FlightTableRow from "./FlightTableRow";

function Departures({ departures, person, toggleModal, toggleFlight }) {

    const displayFlightRows = () => {
        return departures.map(departure => {
            return (
                <FlightTableRow
                    key={ departure.id }
                    flight={ departure }
                    person={ person }
                    toggleModal={ toggleModal }
                    toggleFlight={ toggleFlight }
                />
            );
        })
    }

    return (
        <section className="departures">
            <table>
                <caption>Departures</caption>
                <FlightTableHeader />
                { displayFlightRows() }
            </table>
        </section>
    );
}

export default Departures;