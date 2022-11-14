import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import defaultPizza from '../../assets/img/default-pizza.jpeg';
import { Formik } from 'formik';
import Select from '@mui/material/Select';
import { TextField, MenuItem, ListItemText, OutlinedInput, Box, Modal } from '@mui/material';
import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { Topping } from '../../types';
import { useQuery } from '@apollo/client';

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      backgroundColor: 'white',
      boxShadow: '24',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      p: 4,
    },
    img: {
      maxWidth: '400px',
      maxHeight: '400px',
    },
    formik: {
      width: '450px',
      marginTop: 20,
    },
  })
);

interface PizzaModalProps {
  selectedPizza?: any;
  setSelectedPizza: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PizzaModal = ({ selectedPizza, setSelectedPizza, open, setOpen }: PizzaModalProps): JSX.Element => {
  const { data } = useQuery(GET_TOPPINGS);
  const classes = useStyles();
  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={open}
      onClose={(): void => setOpen(false)}
    >
      <Box className={classes.box}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {selectedPizza && selectedPizza.name}
        </Typography>
        <img src={selectedPizza ? selectedPizza.imgSrc : defaultPizza} className={classes.img} />
        <Formik
          initialValues={{
            name: selectedPizza ? selectedPizza.name : 'Name',
            description: selectedPizza ? selectedPizza.description : 'Description',
            imgSrc: selectedPizza ? selectedPizza.imgSrc : 'Image Url',
            toppingIds: selectedPizza ? selectedPizza.toppingIds : [],
          }}
          onSubmit={(values): void => {
            if (selectedPizza?.id) {
              onUpdatePizza({
                id: selectedPizza.id,
                name: values.name,
                description: values.description,
                imgSrc: values.imgSrc,
                toppingIds: values.toppingIds,
              });
            } else {
              onCreatePizza({
                name: values.name,
                description: values.description,
                imgSrc: values.imgSrc,
                toppingIds: values.toppingIds,
              });
            }
            setOpen(false);
          }}
        >
          {(props): JSX.Element => (
            <form onSubmit={props.handleSubmit} className={classes.formik}>
              <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Details
                </Typography>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={props.values.name}
                  onChange={props.handleChange}
                />
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  value={props.values.description}
                  onChange={props.handleChange}
                />
                <TextField
                  fullWidth
                  id="imgSrc"
                  name="imgSrc"
                  label="Image Url"
                  value={props.values.imgSrc}
                  onChange={props.handleChange}
                />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Toppings
                </Typography>
                <Select
                  labelId="multiple-checkbox-label"
                  id="multiple-checkbox"
                  multiple
                  name="toppingIds"
                  MenuProps={MenuProps}
                  input={<OutlinedInput label="Name" />}
                  value={props.values.toppingIds}
                  onChange={props.handleChange}
                >
                  {data &&
                    data.toppings.map((topping: Topping) => (
                      <MenuItem id={topping.id} key={topping.id} value={topping.id}>
                        <ListItemText primary={topping.name} />
                      </MenuItem>
                    ))}
                </Select>
              </div>

              <button type="submit">Submit</button>
              {selectedPizza && (
                <button
                  type="button"
                  onClick={(): void => {
                    onDeletePizza(selectedPizza);
                    setOpen(false);
                  }}
                >
                  Delete
                </button>
              )}
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
