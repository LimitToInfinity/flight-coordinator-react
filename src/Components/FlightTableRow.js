import { useDispatch } from 'react-redux';
import moment from 'moment';

import AddRide from './AddRide';

import '../Stylesheets/FlightTableRow.scss';

function FlightTableRow({ flight }) {

  const dispatch = useDispatch();

  const day = moment.parseZone(flight.datetime_string).format('ddd');
  const date = moment.parseZone(flight.datetime_string).format('MMM DD');
  const time = moment.parseZone(flight.datetime_string).format('h:mm a');

  const handleClick = () => {
    dispatch({ type: 'SET_FLIGHT', flight });
    dispatch({ type: 'SHOW_MODAL', innerComponent: AddRide });
  }

  return (
    <tr className='flight-row' onClick={ handleClick }>
      <td>
        <img alt={ flight.traveler.name } src={ flight.traveler.image } />
      </td>
      <td>{ flight.traveler.name }</td>
      <td>{ flight.airport }</td>
      <td>{ flight.airline }</td>
      <td>{ flight.number }</td>
      <td>{ day }</td>
      <td>{ date }</td>
      <td>{ time }</td>
      <td className={ flight.ride ? 'has' : 'needs' }>
        {flight.ride ? flight.ride.driver.name : 'Click to give ride'}
      </td>
    </tr>
  );
}

export default FlightTableRow;