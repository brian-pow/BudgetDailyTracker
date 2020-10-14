import React from 'react';
import { useLocation } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



export default function TopBar() {
  const classes = useStyles();
  const location = useLocation().pathname;
  
  //Get today's date and show in string format
  var today = new Date();
  var dd = String(today.getDate())
  var mm = String(today.getMonth())
  var yyyy = today.getFullYear();

  var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  var selectedMonthName = months[mm];
  today = selectedMonthName + " " + dd + ', ' + yyyy;

  return (
    <div className={classes.root}>
      <AppBar position="static">
      <Toolbar>
        {location == '/log' || location == '/new' ? <IconButton href="./" edge="start" className={classes.menuButton} color="inherit" aria-label="menu"><ArrowBackIcon /></IconButton> : null}
        <Typography variant="h6" className={classes.title}>
        {today}
        </Typography>
      </Toolbar>
    </AppBar>
    </div>
  );
}