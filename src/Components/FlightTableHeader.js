import '../Stylesheets/FlightTableHeader.scss';

function FlightTableHeader() {

  return (
    <thead className='flight-header'>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Airport</th>
        <th>Airline</th>
        <th>Flight #</th>
        <th>Day</th>
        <th>Date</th>
        <th>Time</th>
        <th>Driver</th>
      </tr>
    </thead>
  );
}

export default FlightTableHeader;