import React from "react";

import moment from "moment";

import '../Stylesheets/Travels.scss';

import Arrivals from "./Arrivals";
import Departures from "./Departures";

function Travels({ toggleModal, toggleFlight, allFlights }) {

  const current = moment.parseZone( new Date() ).format();

  const flights = allFlights.filter(flight => {
    return moment.parseZone( flight.datetime_string ).format() > current;
  }).sort(byDate);

  const arrivals = () => flights.filter(flight => flight.direction === "arrival");
  const departures = () => flights.filter(flight => flight.direction === "departure");

  return (
    <section className="travels">
      <button 
        onClick={ toggleModal }
        className="add-flight"
      >Add flight</button>
      <Arrivals
        arrivals={ arrivals() }
        toggleFlight={ toggleFlight }
        toggleModal={ toggleModal }
      />
      <Departures
        departures={ departures() }
        toggleFlight={ toggleFlight }
        toggleModal={ toggleModal }
      />
    </section>
  );
}

function byDate(a, b) {
  if (a.datetime_string < b.datetime_string) { return -1; }
  else if (a.datetime_string > b.datetime_string) { return 1; }
  else { return 0; }
}

export default Travels;