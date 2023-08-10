import React, { Component } from "react";
import axios from "axios";
import CarList from "./CarList";
import CarForm from "./CarForm";
import "./App.css";

class App extends Component {
  state = {
    cars: [],
  };

  componentDidMount() {
    this.fetchCars();
  }

  fetchCars = () => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((response) => {
        this.setState({ cars: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCarSubmit = (car) => {
    axios
      .post("http://localhost:5000/api/cars", car)
      .then((response) => {
        this.fetchCars(); // Fetch updated car list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCarDelete = (car) => {
    axios
      .delete(`http://localhost:5000/api/cars/${car._id}`)
      .then((response) => {
        this.fetchCars(); // Fetch updated car list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCarUpdate = (car) => {
    axios
      .put(`http://localhost:5000/api/cars/${car._id}`, car)
      .then((response) => {
        this.fetchCars(); // Fetch updated car list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleBulkCarUpdate = (selectedCars, updates) => {
    axios
      .put("http://localhost:5000/api/cars/bulk", {
        selectedCars: selectedCars.map((car) => car._id),
        updates,
      })
      .then((response) => {
        this.fetchCars(); // Fetch updated car list
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.response);
      });
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Car Inventory App!</h1>
        <CarForm onCarSubmit={this.handleCarSubmit} />
        <CarList
          cars={this.state.cars}
          onDelete={this.handleCarDelete}
          onUpdate={this.handleCarUpdate}
          onBulkUpdate={this.handleBulkCarUpdate}
        />
      </div>
    );
  }
}

export default App;
