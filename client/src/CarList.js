import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const CarList = ({ cars, onDelete, onUpdate, onBulkUpdate }) => {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedCar, setSelectedCar] = React.useState({});
  const [showOlderCars, setShowOlderCars] = React.useState(false);
  const [filteredCars, setFilteredCars] = React.useState(cars);
  const [selectedCars, setSelectedCars] = React.useState([]);

  const handleClose = () => setShowEditModal(false);

  const handleEditClick = (car) => {
    setSelectedCar(car);
    setSelectedCars([]); // clear selectedCars when a single car is being edited
    setShowEditModal(true);
  };

  const handleEditSubmit = React.useCallback(
    (event) => {
      event.preventDefault();

      if (selectedCars.length > 0) {
        const updatedFields = { ...selectedCar };
        Object.keys(updatedFields).forEach((field) => {
          if (
            updatedFields[field] === "" ||
            updatedFields[field] === undefined
          ) {
            delete updatedFields[field];
          }
        });

        if (Object.keys(updatedFields).length > 0) {
          const updates = { ...updatedFields };
          onBulkUpdate(selectedCars, updates);
        }
        setShowEditModal(false);
      } else {
        // Update logic for single car
        onUpdate(selectedCar);
        setShowEditModal(false);
      }
    },
    [selectedCar, selectedCars, onUpdate, onBulkUpdate]
  );

  const handleShowOlderCars = () => {
    if (!showOlderCars) {
      const currentYear = new Date().getFullYear();
      const filteredCars = cars.filter((car) => {
        if (!isNaN(car.make)) {
          const makeYear = parseInt(car.make);
          return currentYear - makeYear > 5;
        }
        return false;
      });
      setFilteredCars(filteredCars);
    } else {
      setFilteredCars(cars);
    }
    setShowOlderCars(!showOlderCars);
  };

  const handleCarSelect = (car) => {
    if (selectedCars.includes(car)) {
      setSelectedCars(
        selectedCars.filter((selectedCar) => selectedCar !== car)
      );
    } else {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const handleBulkUpdate = () => {
    if (selectedCars.length < 2) {
      alert("Please select at least two cars for bulk update.");
      return;
    }

    setSelectedCar({}); // Clear the selectedCar state to open the edit screen with empty fields
    setShowEditModal(true);
  };

  const carsToDisplay = showOlderCars ? filteredCars : cars;

  return (
    <div>
      <h2>List of Cars:</h2>
      <Form.Check
        className="filter-checkbox"
        type="checkbox"
        label="Show Cars Older than 5 Years"
        checked={showOlderCars}
        onChange={handleShowOlderCars}
      />
      <ListGroup className="list-group">
        {carsToDisplay.map((car) => (
          <ListGroup.Item className="list-group-item" ey={car._id}>
            <Form.Check
              type="checkbox"
              checked={selectedCars.includes(car)}
              onChange={() => handleCarSelect(car)}
            />
            {car.make} {car.model} ({car.registrationNumber}) - owned by{" "}
            {car.currentOwner}
            <div style={{ float: "right" }}>
              <Button
                className="btn-edit"
                variant="info"
                onClick={() => handleEditClick(car)}
              >
                Edit
              </Button>{" "}
              <Button
                className="btn-delete"
                variant="danger"
                onClick={() => onDelete(car)}
              >
                Delete
              </Button>{" "}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button className="btn-bulk" variant="primary" onClick={handleBulkUpdate}>
        Bulk Update
      </Button>
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formModel">
              <Form.Label>Model:</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={selectedCar.model}
                onChange={(event) =>
                  setSelectedCar({
                    ...selectedCar,
                    model: event.target.value,
                  })
                }
                placeholder="Enter model"
              />
            </Form.Group>

            <Form.Group controlId="formMake">
              <Form.Label>Make:</Form.Label>
              <Form.Control
                type="text"
                name="make"
                value={selectedCar.make}
                onChange={(event) =>
                  setSelectedCar({
                    ...selectedCar,
                    make: event.target.value,
                  })
                }
                placeholder="Enter make"
              />
            </Form.Group>

            <Form.Group controlId="formRegistrationNumber">
              <Form.Label>Registration Number:</Form.Label>
              <Form.Control
                type="text"
                name="registrationNumber"
                value={selectedCar.registrationNumber}
                onChange={(event) =>
                  setSelectedCar({
                    ...selectedCar,
                    registrationNumber: event.target.value,
                  })
                }
                placeholder="Enter registration number"
              />
            </Form.Group>

            <Form.Group controlId="formCurrentOwner">
              <Form.Label>Current Owner:</Form.Label>
              <Form.Control
                type="text"
                name="currentOwner"
                value={selectedCar.currentOwner}
                onChange={(event) =>
                  setSelectedCar({
                    ...selectedCar,
                    currentOwner: event.target.value,
                  })
                }
                placeholder="Enter current owner"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CarList;
