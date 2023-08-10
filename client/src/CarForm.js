import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";

class CarForm extends Component {
  state = {
    model: "",
    make: "",
    registrationNumber: "",
    currentOwner: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { model, make, registrationNumber, currentOwner } = this.state;
    this.props.onCarSubmit({
      model,
      make,
      registrationNumber,
      currentOwner,
    });
    this.setState({
      model: "",
      make: "",
      registrationNumber: "",
      currentOwner: "",
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formModel">
          <Form.Label>Model:</Form.Label>
          <Form.Control
            type="text"
            name="model"
            value={this.state.model}
            onChange={this.handleChange}
            placeholder="Enter model"
          />
        </Form.Group>

        <Form.Group controlId="formMake">
          <Form.Label>Make:</Form.Label>
          <Form.Control
            type="text"
            name="make"
            value={this.state.make}
            onChange={this.handleChange}
            placeholder="Enter make"
          />
        </Form.Group>

        <Form.Group controlId="formRegistrationNumber">
          <Form.Label>Registration Number:</Form.Label>
          <Form.Control
            type="text"
            name="registrationNumber"
            value={this.state.registrationNumber}
            onChange={this.handleChange}
            placeholder="Enter registration number"
          />
        </Form.Group>

        <Form.Group controlId="formCurrentOwner">
          <Form.Label>Current Owner:</Form.Label>
          <Form.Control
            type="text"
            name="currentOwner"
            value={this.state.currentOwner}
            onChange={this.handleChange}
            placeholder="Enter current owner"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Car
        </Button>
      </Form>
    );
  }
}

export default CarForm;
