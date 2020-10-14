import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Home from './Home'
import NewExpense from './NewExpense'
import ExpenseLog from './ExpenseLog'

function App() {

  //Create Material Theme
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: '#345235'
          }
        },
        typography: {
          h5: {
            fontFamily: 'Eczar',
          },
          h6: {
            fontFamily: 'Roboto Condensed',
          },
          overline: {
            fontFamily: 'Roboto Condensed',
          },
          button: {
            fontFamily: 'Roboto Condensed',
          },
          subtitle1: {
            fontFamily: 'Roboto Condensed',
          },
          caption: {
            fontFamily: 'Roboto Condensed',
          }
        },
      }),
    [true],
  );


  return (
    <main>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/new" component={NewExpense} />
          <Route path="/log" component={ExpenseLog} />
        </Switch>
      </ThemeProvider>
    </main>
  );
}

export default App;
