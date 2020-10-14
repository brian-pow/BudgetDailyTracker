import React, {useState} from 'react';
import TopBar from './TopBar'

import { Redirect } from 'react-router-dom';

import { gql, useMutation } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CenterFocusStrong } from '@material-ui/icons';

//Styles for certain Material components
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  resize:{
    fontSize:50,
    textAlign: 'center',
    fontFamily: 'Eczar'
  },
}));


//GraphQL mutation
const ADD_EXPENSE = gql`
  mutation postExpense($itemToPost: itemToPost) {
    postExpense(input: $itemToPost)
  }
`;

function NewExpense() {
  const classes = useStyles();

  //Main state object
  const [stateVar, setStateVar] = useState({
    type: 'General',
    amount: 0,
    description: '',
    typeValue: 3,
    redirect: false
  });

  //useMutation hook
  const [addExpense, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    ADD_EXPENSE, 
      {onCompleted: () => {setStateVar({redirect: true})}}
  );

  function handleChange(event) {
    event.persist();

    //Determine index from "type" and update type
    if (event.target.name === 'type') {
      let typeValue;
      if (event.target.value === "General") {
        typeValue = 3;
      } else if (event.target.value === "Extra") {
        typeValue = 8;
      } else if (event.target.value === "Fun") {
        typeValue = 13;
      }

      setStateVar(stateVar => ({
        ...stateVar,
        typeValue: typeValue,
        type: event.target.value
      }))
    }

    //Update amount
    let number; 

    if (event.target.name === 'amount') {
      number = parseInt(event.target.value)
      setStateVar(stateVar => ({
        ...stateVar,
        amount: number
      }))
    }

    //Update description
    if (event.target.name === 'description') {
      setStateVar(stateVar => ({
        ...stateVar,
        description: event.target.value
      }))
    }
  }

  //Submit and execute mutation
  function handleSubmit(e) {
    e.preventDefault();
    addExpense({ 
        variables: {
          itemToPost: {
            index: stateVar.typeValue,
            amount: stateVar.amount,
            type: stateVar.type,
            name: stateVar.description
          }
        } 
    });
  }

  return (
    <div>
      <TopBar />
        {stateVar.redirect ? <Redirect to="/" /> : null}
      <Box m={2} marginTop={10}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-number"
            label="Amount"
            type="number"
            name="amount"
            onChange={handleChange}
            fullWidth
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
          />
          <FormControl fullWidth margin="normal">
            <Select
              labelId="demo-simple-select-label"
              name="type"
              value={stateVar.type || ''}
              onChange={handleChange}
            >
              <MenuItem value={"General"}>
              General
              </MenuItem>
              <MenuItem value={"Fun"}>
              Fun
              </MenuItem>
              <MenuItem value={"Extra"}>
              Extra
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="standard-number"
            label="Description"
            name="description"
            onChange={handleChange}
           fullWidth
          />
          <Box marginTop={5} width={1} css={{textAlign: 'center'}}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
            Submit
            </Button>
           </Box>
           {mutationLoading && <Box m={2}><LinearProgress /></Box>}
        </form>
      </Box>
    </div>
    );
}
  
export default NewExpense;