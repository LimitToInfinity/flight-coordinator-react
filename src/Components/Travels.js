import React from 'react';

import moment from 'moment';

import '../Stylesheets/Travels.scss';

import Flights from './Flights';

function Travels({ toggleModal, toggleFlight, allFlights }) {

  const now = moment.parseZone(new Date()).format();
  const inTheFuture = flight => {
    return moment.parseZone(flight.datetime_string).format() > now;
  }
  const futureFlights = allFlights.filter(inTheFuture).sort(byEarliestDate);

  const isArrival = flight => flight.direction === 'arrival';
  const isDeparture = flight => flight.direction === 'departure';
  const arrivals = () => futureFlights.filter(isArrival);
  const departures = () => futureFlights.filter(isDeparture);

  return (
    <section className='travels'>
      <button onClick={toggleModal} className='add-flight'>Add flight</button>
      <Flights
        direction='arrivals'
        flights={ arrivals() }
        toggleFlight={ toggleFlight }
        toggleModal={ toggleModal }
      />
      <Flights
        direction='departures'
        flights={ departures() }
        toggleFlight={ toggleFlight }
        toggleModal={ toggleModal }
      />
    </section>
  );
}

function byEarliestDate(a, b) {
  return moment.parseZone(a.datetime_string)
    .diff(moment.parseZone(b.datetime_string));
}

export default Travels;