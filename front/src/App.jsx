import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './App.css';

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <Grid  container
        alignItems='center'
        style={{ height:  '100%' }}>
          <Grid  item  xs={12}>
            <Paper
            elevation={4}
            style={{ margin:  32 }}
            >
              <Grid  container
              alignItems='center'
              justify='center'>
                <Grid item xs={12} sm={6} style={{ 'text-align': 'center' }}> <img src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png" alt="Homer Simpson eating a pink donut"/> </Grid>
                <Grid  item xs={12} sm={6}
                  alignContent='center'
                  >
                    <BrowserRouter>
                      <Switch>
                      <Route exact path="/">
                        <SignIn/>
                      </Route>
                      <Route path="/signup">
                        <SignUp />
                      </Route>
                      <Route path="/signin">
                        <SignIn />
                      </Route>
                      <Route path="/profile">
                        <Profile />
                      </Route>
                      </Switch>
                    </BrowserRouter>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
