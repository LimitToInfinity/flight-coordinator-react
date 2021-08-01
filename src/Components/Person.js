import { useDispatch, useSelector } from 'react-redux';

import '../Stylesheets/Person.scss';

function Person({ person }) {

  const dispatch = useDispatch();

  const selectedPerson = useSelector(state => state.person);

  const handleClick = () => {
    window.scroll(0, 0);
    selectedPerson.id
      ? dispatch({ type: 'DESELECT_PERSON' })
      : dispatch({ type: 'SELECT_PERSON', person });
  }

  const personCard = person => {
    return (
      <>
        <img alt={ person.name } src={ person.image } />
        <h3>{ person.name }</h3>
      </>
    );
  }

  const noPerson = () => {
    return (
      <>
        <h3>Choose yourself</h3>
        <img
          alt='unknown'
          src='https://cdn4.iconfinder.com/data/icons/business-vol-4-2/100/Artboard_15-512.png'
        />
      </>
    );
  }

  const profile = () => {
    return selectedPerson.id
      ? personCard(selectedPerson)
      : noPerson();
  }

  return (
    <div className='person'>
      <div onClick={ handleClick }>
        { person ? personCard(person) : profile() }
      </div>
    </div>
  );
}

export default Person;