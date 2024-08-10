import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const EditCar = ({ car, updateCar, fetchCars }) => {
  const [open, setOpen] = useState(false);
  const [editedCar, setEditedCar] = useState(car);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setEditedCar({ ...editedCar, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    updateCar(editedCar);
    fetchCars();
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Brand"
            type="text"
            name="brand"
            fullWidth
            value={editedCar.brand}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Model"
            type="text"
            name="model"
            fullWidth
            value={editedCar.model}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Color"
            type="text"
            name="color"
            fullWidth
            value={editedCar.color}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Year"
            type="text"
            name="year"
            fullWidth
            value={editedCar.year}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            type="text"
            name="price"
            fullWidth
            value={editedCar.price}
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

export default EditCar;
