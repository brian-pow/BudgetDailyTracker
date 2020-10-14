import React from 'react';
import TopBar from './TopBar'

import { useQuery, gql } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

//Styles for certain Material components
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  }
});

//GraphQL query
const GET_LOGS = gql`
  query {
    log {
      amount
      date
      name
      type
    }
  }
`;

function ExpenseLog() {
  const { loading, error, data } = useQuery(GET_LOGS);
  const classes = useStyles();

  //Style for Circular Progress (loading circle)
  const style2 = {
    margin: 0,
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    position: 'fixed',
    transform: 'translate(-50%, -50%)'
  };

  //Loading and Error state
  if (loading) return <Box style={style2}><CircularProgress /></Box>;
  if (error) return <p>Error :(</p>;

  //Create array to hold query data with additional date string
  let logArray = [];
  
  //Loop through data to create and add date strings
  for (let i = 0; i < data.log.length; i++) {
    let dateString = new Date(parseInt(data.log[i].date))
    let dateStringUpdated = (dateString.getMonth()+1) + "-" + dateString.getDate() + "-" + dateString.getFullYear()

    //Create temporary object to be pushed to logArray
    let tempObject = {
      amount: data.log[i].amount,
      type: data.log[i].type,
      date: dateStringUpdated,
      name: data.log[i].name,
      dateKey: data.log[i].date
    }

    logArray.push(tempObject)
  }

  const logItems = logArray.map((item) => 
    <Box key={item.dateKey} m={2}>   
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="overline" className={classes.title} color="textSecondary" gutterBottom>
          {item.type}
          </Typography>
          <Typography variant="h5" component="h2">
          $ {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
          <Typography variant="subtitle1">
          {item.name}
          </Typography>
          <Typography variant="caption">
          {item.date}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )

  return (
    <Box>
      <TopBar />
      {logItems}
    </Box>
  )
}
  
export default ExpenseLog;