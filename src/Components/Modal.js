import React, { Component } from "react";

import moment from "moment";

import "../Stylesheets/Modal.scss"

class Modal extends Component {
    
    state = {
        datetime: moment(new Date()).format().slice(0, 16),
    }

    handleClick = () => {
        const { toggleModal, toggleFlight } = this.props;
        toggleFlight();
        toggleModal();
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    render() {
        const { datetime } = this.state;

        const { flight } = this.props;

        const current = new Date();
        current.setFullYear(current.getFullYear() + 1)
        const nowPlusOneYear = moment(current).format();
        const now = moment(new Date()).format();

        const addPickUp = () => {
            return (
                <>
                    <h2>Pick up { flight.traveler.name }
                        <img src={ flight.traveler.image } />
                    </h2>
                    <p>
                        { flight.traveler.name } arrives { moment(flight.traveler.datetime).format("ddd MMM DD h:mm a") } at { flight.airport }
                    </p>
                    <label htmlFor="datetime">
                        When will you be at the airport?
                    </label>
                    <input
                        onChange={ this.handleChange }
                        type="datetime-local"
                        id="datetime"
                        name="datetime" 
                        value={ datetime }
                        min={ now.slice(0, 16) }
                        max={ nowPlusOneYear.slice(0, 16) }
                    />
                </>
            );
        }

        const addDropOff = () => {
            return (
                <>
                    <h2>Drop off { flight.traveler.name }
                        <img src={ flight.traveler.image } />
                    </h2>
                    <p>
                        { flight.traveler.name } departs { moment(flight.traveler.datetime).format("ddd MMM DD h:mm a") } at { flight.airport }
                    </p>
                    <label htmlFor="datetime">
                        When will you leave for the airport?
                    </label>
                    <input
                        onChange={ this.handleChange }
                        type="datetime-local"
                        id="datetime"
                        name="datetime" 
                        value={ datetime }
                        min={ now.slice(0, 16) }
                        max={ nowPlusOneYear.slice(0, 16) }
                    />
                </>
            );
        }

        return (
            <section className="modal">
                <div 
                    className="overlay"
                    onClick={ this.handleClick }
                >    
                </div>
                <div className="modal-content">
                    <button 
                        className="close-modal"
                        onClick={ this.handleClick }
                    >X
                    </button>
                    {flight.direction === "arrival"
                        ? addPickUp()
                        : addDropOff()
                    }
                </div>
            </section>
        );
    }
}

export default Modal;