import React, { Component } from 'react';

import './../Stylesheets/App.scss';

import People from './People';
import Header from './Header';

const peopleURL = "http://localhost:3000/people";

class App extends Component {
  
  state = {
    people: [],
    person: {},
  }

  componentDidMount() {
    fetch( peopleURL )
      .then( response => response.json() )
      .then( json => this.setState({ people: json.data.sort(aToZ) }) );
  }

  setPerson = (person) => {
    this.setState({ person });
  }
  
  render() {
    const { people, person } = this.state;

    return (
      <div className="App">
        <Header
          setPerson={ this.setPerson }
          person={ person }
        />
        <People 
          people={ people }
          setPerson={ this.setPerson }
        />
      </div>
    );
  }  
}

function aToZ(a, b) {
  if (a.attributes.name < b.attributes.name) { return -1 }
  else if (a.attributes.name > b.attributes.name) { return 1 }
  else { return 0 }
}

export default App;
