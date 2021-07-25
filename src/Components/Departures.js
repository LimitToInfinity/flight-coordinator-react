import React from "react";

import '../Stylesheets/Departures.scss';
import FlightTableHeader from "./FlightTableHeader";
import FlightTableRow from "./FlightTableRow";

function Departures({ departures, toggleModal, toggleFlight }) {

  const displayFlightRows = () => {
    return departures.map(departure => {
      return (
        <FlightTableRow
          key={ departure.id }
          flight={ departure }
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