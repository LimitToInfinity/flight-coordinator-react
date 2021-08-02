import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Datetime from 'react-datetime';

import '../Stylesheets/AddRide.scss';

import { urls } from '../utilities/urls';
import { authFetch } from '../utilities/functions';

function AddRide({ closeModal }) {

  const dispatch = useDispatch();

  const person = useSelector(state => state.person);
  const flight = useSelector(state => state.flight);

  const [datetime, setDatetime] = useState(
    moment.parseZone(flight.datetime_string)
  );

  const deleteRide = () => {
    const deleteURL = `${urls.rides}/${flight.ride.id}`;
    authFetch(deleteURL, 'DELETE');

    dispatch({ type: 'REMOVE_RIDE', modifiedFlightId: flight.id });
  }

  const handleSubmit = event => {
    event.preventDefault();

    const { value } = event.nativeEvent.submitter;
    if (value === 'Give ride') {
      flight.ride
        ? updateCurrentRide(person, flight, datetime, dispatch)
        : createRide(person, flight, datetime, dispatch);
    } else if (value === 'Remove ride') {
      deleteRide();
    }

    closeModal();
  }

  const verbage = {
    arrival: { h2: 'Pick up', p: 'arrives', label: 'will' },
    departure: { h2: 'Drop off', p: 'departs', label: 'should' }
  };
  const { direction, traveler, airport } = flight;
  const inputProps = { id: 'datetime', name: 'datetime' };
  const twoDaysBeforeFlight = moment.parseZone(flight.datetime_string).subtract(2, 'day');
  const dayAfterFlight = moment.parseZone(flight.datetime_string).add(1, 'day');
  const isValid = currentDate => {
    return currentDate.isAfter(twoDaysBeforeFlight)
      && currentDate.isBefore(dayAfterFlight);
  };
  const isDriver = flight.ride && (person.id === flight.ride.driver.id);

  return (
    <>
      <h2>
        { verbage[direction].h2 } { traveler.name }
        <img alt={ traveler.name } src={ traveler.image } />
      </h2>
      <p>
        { traveler.name } { verbage[direction].p } { moment(flight.datetime).format('ddd MM/DD/YYYY h:mm a') } at { airport }
      </p>

      <form className='add-ride' onSubmit={ handleSubmit }>
        <label htmlFor='datetime'>
          When { verbage[direction].label } you be at the airport?
        </label>
        <Datetime 
          inputProps={ inputProps }
          isValidDate={ isValid }
          initialValue={
            direction === 'arrival'
            ? moment(datetime)
            : moment(datetime).subtract(105, 'minutes')
          }
          onChange={ date => setDatetime(moment(date._d).format()) }
        />

        <div className='form-buttons'>
          {isDriver
            ? <input type='submit' className='delete-ride' value='Remove ride' />
            : <div></div>
          }
          <input type='submit' value='Give ride' />
        </div>
      </form>
    </>
  );
}

function updateCurrentRide(person, flight, datetime, dispatch) {
  const rideBody = JSON.stringify({
    ride: {
      driver_id: person.id,
      shuttle_attributes: {
        id: flight.ride.shuttle.id,
        datetime: moment(datetime).format(),
        datetime_string: moment(datetime).format()
      }
    }
  });
  const patchURL = `${urls.rides}/${flight.ride.id}`;

  authFetch(patchURL, 'PATCH', rideBody)
    .then(updatedRide => {
      dispatch({
        type: 'UPDATE_RIDE',
        modifiedFlightId: flight.id,
        ride: updatedRide.data.attributes
      });
    })
    .catch(error => console.error(error));
}

function createRide(person, flight, datetime, dispatch) {
  const rideBody = JSON.stringify({
    ride: {
      driver_id: person.id,
      traveler_id: flight.traveler.id,
      flight_id: flight.id,
      shuttle_attributes: {
        datetime: moment(datetime).format(),
        datetime_string: moment(datetime).format()
      }
    }
  });

  authFetch(urls.rides, 'POST', rideBody)
    .then(newRide => {
      dispatch({
        type: 'UPDATE_RIDE',
        modifiedFlightId: flight.id,
        ride: newRide.data.attributes
      });
    })
    .catch(error => console.error(error));
}

export default AddRide;