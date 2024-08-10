import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const AddCar = ({ addCar, fetchCars }) => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    color: '',
    year: '',
    price: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    addCar(car);
    fetchCars();
    setOpen(false);
    setCar({
      brand: '',
      model: '',
      color: '',
      year: '',
      price: ''
    });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        New Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Brand"
            type="text"
            name="brand"
            fullWidth
            value={car.brand}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Model"
            type="text"
            name="model"
            fullWidth
            value={car.model}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Color"
            type="text"
            name="color"
            fullWidth
            value={car.color}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Year"
            type="text"
            name="year"
            fullWidth
            value={car.year}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            type="text"
            name="price"
            fullWidth
            value={car.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCar;
