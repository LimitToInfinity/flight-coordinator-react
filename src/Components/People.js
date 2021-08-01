import '../Stylesheets/People.scss';

import Person from './Person';

function People({ people }) {

  const displayPeople = () => {
    return people.map(person => {
      return <Person key={ person.id } person={ person } />
    })
  }

  return (
    <section>
      <h2 className='people-header'>Choose yourself!</h2>
      <div className='people'>
        { displayPeople() }
      </div>
    </section>
  );
}

export default People;