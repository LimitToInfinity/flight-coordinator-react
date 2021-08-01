import '../Stylesheets/Flights.scss';

import FlightTableHeader from './FlightTableHeader';
import FlightTableRow from './FlightTableRow';

import { capitalize } from '../utilities/functions';

function Flights({ direction, flights }) {

  const displayFlightRows = () => {
    return flights.map(flight => {
      return <FlightTableRow key={ flight.id } flight={ flight } />;
    });
  }

  return (
    <section className={direction}>
      <table>
        <caption>{capitalize(direction)}</caption>
        <FlightTableHeader />
        <tbody>{ displayFlightRows() }</tbody>
      </table>
    </section>
  );
}

export default Flights;