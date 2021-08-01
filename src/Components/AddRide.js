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

  const yesterday = Datetime.moment().subtract(1, 'day');
  const oneYearFromNow = Datetime.moment().add(1, 'year');
  const isValid = current => {
    return current.isAfter(yesterday)
      && current.isBefore(oneYearFromNow);
  };

  const handleSubmit = event => {
    event.preventDefault();

    flight.ride
      ? updateCurrentRide(person, flight, datetime, dispatch)
      : createRide(person, flight, datetime, dispatch);

    closeModal();
  }

  const deleteRide = () => {
    const deleteURL = `${urls.rides}/${flight.ride.id}`;
    authFetch(deleteURL, 'DELETE');

    dispatch({ type: 'REMOVE_RIDE', modifiedFlightId: flight.id });

    closeModal();
  }

  const verbage = {
    arrival: { h2: 'Pick up', p: 'arrives', label: 'will' },
    departure: { h2: 'Drop off', p: 'departs', label: 'should' }
  }
  const inputProps = { id: 'datetime', name: 'datetime' };
  const isDriver = flight.ride && (person.id === flight.ride.driver.id);

  return (
    <>
      <h2>{ verbage[flight.direction].h2 } { flight.traveler.name }
        <img alt={ flight.traveler.name } src={ flight.traveler.image } />
      </h2>
      <p>
        { flight.traveler.name } { verbage[flight.direction].p } { moment(flight.datetime).format('ddd MM/DD/YYYY h:mm a') } at { flight.airport }
      </p>

      <form className='add-ride' onSubmit={ handleSubmit }>
        <label htmlFor='datetime'>
          When { verbage[flight.direction].label } you be at the airport?
        </label>
        <Datetime 
          onChange={ date => setDatetime(moment(date._d).format()) }
          initialValue={
            flight.direction === 'arrival'
              ? moment(datetime)
              : moment(datetime).subtract(105, 'minutes')
          }
          isValidDate={ isValid }
          inputProps={ inputProps }
        />

        <div className='form-buttons'>
          {isDriver
            ? <button type='button' className='delete-ride' onClick={ deleteRide }>
              Remove ride
            </button>
            : <div></div>
          }
          <input type='submit' value='Submit' />
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