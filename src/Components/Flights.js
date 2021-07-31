import React from "react";

import '../Stylesheets/Flights.scss';

import FlightTableHeader from "./FlightTableHeader";
import FlightTableRow from "./FlightTableRow";

import { capitalize } from '../utilities/functions';

function Flights({ direction, flights, toggleModal, toggleFlight }) {

  const displayFlightRows = () => {
    return flights.map(flight => {
      return (
        <FlightTableRow
          key={ flight.id }
          flight={ flight }
          toggleModal={ toggleModal }
          toggleFlight={ toggleFlight }
        />
      );
    })
  }

  return (
    <section className={direction}>
      <table>
        <caption>{capitalize(direction)}</caption>
        <FlightTableHeader />
        { displayFlightRows() }
      </table>
    </section>
  );
}

export default Flights;