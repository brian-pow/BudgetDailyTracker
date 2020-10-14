import React from 'react';
import TopBar from './TopBar'

import { useQuery, gql } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

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
const GET_TOTAL = gql`
  query {
    totals {
      fun
      overall
      extra
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GET_TOTAL);
  const classes = useStyles();

  //Style for Floating Action Button
  const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

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

  return (
    <Box>
      <TopBar />
      <Box m={2}>   
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="overline" className={classes.title} color="textSecondary" gutterBottom>
            Total
            </Typography>
            <Typography variant="h5" component="h2">
            $ {data.totals.overall.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box m={2}>  
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="overline" className={classes.title} color="textSecondary" gutterBottom>
            Fun
            </Typography>
            <Typography variant="h5" component="h2">
            $ {data.totals.fun.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box m={2}>  
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="overline" className={classes.title} color="textSecondary" gutterBottom>
            Extra
            </Typography>
            <Typography variant="h5" component="h2">
            $ {data.totals.extra.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box marginTop={5} width={1} css={{textAlign: 'center'}}>
        <Button variant="contained" href='./log'>
        VIEW LOGS
        </Button>
      </Box>
      <Fab color="primary" aria-label="add" href="/new" style={style}>
        <AddIcon />
      </Fab>
    </Box>
  )
}
  
export default Home;