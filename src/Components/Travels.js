import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import '../Stylesheets/Travels.scss';

import AddFlight from './AddFlight';
import Flights from './Flights';

function Travels() {

  const dispatch = useDispatch();

  const allFlights = useSelector(state => state.flights);

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
      <button
        onClick={() => dispatch({ type: 'SHOW_MODAL', innerComponent: AddFlight })}
        className='add-flight'
      >
        Add flight
      </button>
      <Flights direction='arrivals' flights={ arrivals() } />
      <Flights direction='departures' flights={ departures() } />
    </section>
  );
}

function byEarliestDate(a, b) {
  return moment.parseZone(a.datetime_string)
    .diff(moment.parseZone(b.datetime_string));
}

export default Travels;