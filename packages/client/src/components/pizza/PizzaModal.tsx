import React from 'react';
import Modal from '@mui/material/Modal';
import { makeStyles, createStyles } from '@material-ui/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import defaultPizza from '../../assets/img/default-pizza.jpeg';
import { Formik } from 'formik';
import { TextField, MenuItem, Checkbox, ListItemText } from '@mui/material';
import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { Topping } from '../../types';
import { useQuery } from '@apollo/client';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      backgroundColor: 'white',
      border: '2px solid #000',
      boxShadow: '24',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      p: 4,
    },
    img: {
      maxWidth: '450px',
      maxHeight: '450px',
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
  const { loading, data } = useQuery(GET_TOPPINGS);

  const classes = useStyles();
  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();
  if (selectedPizza) {
    console.log(selectedPizza.toppingIds);
  }

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
            toppingIds: selectedPizza ? selectedPizza.toppingIds : 'Toppings',
          }}
          onSubmit={(values): void => {
            if (selectedPizza?.id) {
              setSelectedPizza({
                ...selectedPizza,
                name: values.name,
                description: values.description,
                imgSrc: values.imgSrc,
                toppingIds: ['564f0184537878b57efcb703'],
              });
              onUpdatePizza(selectedPizza);
            } else {
              onCreatePizza({
                name: values.name,
                description: values.description,
                imgSrc: values.imgSrc,
                toppingIds: ['564f0184537878b57efcb703'],
              });
            }
            setOpen(false);
          }}
        >
          {(props) => (
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
