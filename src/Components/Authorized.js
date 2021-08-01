import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../Stylesheets/Authorized.scss';

import People from './People';
import Header from './Header';
import Travels from './Travels';
import Modal from './Modal';

import { urls } from '../utilities/urls';
import { authFetch, aToZ, extractData } from '../utilities/functions';

function Authorized() {

  const dispatch = useDispatch();

  const showModal = useSelector(state => state.modal.showModal);
  const person = useSelector(state => state.person);

  useEffect(() => {
    getPeople().then(people => dispatch({ type: 'SET_PEOPLE', people }));
    getFlights().then(flights => dispatch({ type: 'SET_FLIGHTS', flights }));
  }, [dispatch]);

  return (
    <div className='authorized'>
      {showModal && <Modal />}
      <Header />
      <main>{!person.id ? <People /> : <Travels />}</main>
    </div>
  );
}

async function getPeople() {
  const json = await authFetch(urls.people);
  const people = extractData(json).sort(aToZ);
  return people;
}

async function getFlights() {
  const json = await authFetch(urls.flights);
  const flights = extractData(json);
  return flights;
}

export default Authorized;