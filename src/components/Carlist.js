import React, { useState, useEffect, useCallback } from 'react';
import { useTable } from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import 'react-toastify/dist/ReactToastify.css';
import './tablestyles.css';
import { SERVER_URL } from '../constants.js';
import AddCar from './AddCar';
import EditCar from './EditCar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';  // Import Grid from Material-UI

const Carlist = () => {
  const [cars, setCars] = useState([]);

  const extractIdFromHref = (href) => {
    const parts = href.split('/');
    return parts[parts.length - 1];
  };

  const fetchCars = useCallback(() => {
    fetch(SERVER_URL + 'api/cars')
      .then(response => response.json())
      .then(responseData => {
        if (responseData._embedded && responseData._embedded.cars) {
          const carsWithIds = responseData._embedded.cars.map(car => ({
            ...car,
            id: extractIdFromHref(car._links.self.href)
          }));
          setCars(carsWithIds);
        } else {
          console.error('No data found in response');
          setCars([]);
        }
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      fetch(SERVER_URL + 'api/cars/' + id, { method: 'DELETE' })
        .then(res => {
          if (res.ok) {
            toast.success("Car deleted", {
              position: "bottom-left"
            });
            fetchCars();
          } else {
            toast.error("Error when deleting", {
              position: "bottom-left"
            });
            console.error('Failed to delete car');
          }
        })
        .catch(err => {
          toast.error("Error when deleting", {
            position: "bottom-left"
          });
          console.error(err);
        });
    }
  }, [fetchCars]);

  const addCar = (car) => {
    fetch(SERVER_URL + 'api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car)
    })
      .then(res => fetchCars())
      .catch(err => console.error('Error adding car:', err));
  };

  const updateCar = useCallback((car, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car)
    })
      .then(res => fetchCars())
      .catch(err => console.error('Error updating car:', err));
  }, [fetchCars]);

  const columns = React.useMemo(
    () => [
      { Header: 'Brand', accessor: 'brand' },
      { Header: 'Model', accessor: 'model' },
      { Header: 'Color', accessor: 'color' },
      { Header: 'Year', accessor: 'year' },
      { Header: 'Price €', accessor: 'price' },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <>
            <Button size="small" color="secondary" onClick={() => handleDelete(row.original.id)}>
              Delete
            </Button>
            <EditCar car={row.original} updateCar={updateCar} link={row.original._links.self.href} />
          </>
        ),
      }
    ],
    [handleDelete, updateCar]
  );

  const data = React.useMemo(() => cars, [cars]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="App">
      <Grid container>
        <Grid item>
          <AddCar addCar={addCar} fetchCars={fetchCars} />
        </Grid>
        <Grid item style={{ padding: 15 }}>
          <CSVLink data={cars} separator=";" filename="cars.csv" className="btn btn-primary">
            Export CSV
          </CSVLink>
        </Grid>
      </Grid>

      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.original.id}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Carlist;









