import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import requireAuth from './hoc/requireAuth';
import requireNotAuth from './hoc/requireNotAuth';
import { createSessionAction } from './actions/authActions';
import { updateMessageAction } from './actions/flashActions';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import Profile from './containers/Profile';
import PopUp from "./containers/PopUp";
import { MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './App.css';

function App({flash}) {
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
                        <Redirect exact from="/" to="/profile" />
                        <Route path="/signin" exact component={requireNotAuth(SignIn)} />
                        <Route path="/signup" exact component={requireNotAuth(SignUp)} />
                        <Route path="/profile" exact component={requireAuth(Profile)} />
                      </Switch>
                    </BrowserRouter>
                    <PopUp message={flash.message}/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  flash: state.flash,
});

const mapDispatchToProps = (dispatch) => ({
  createSession: (token) => dispatch(createSessionAction(token)),
  updateFlashMessage: (typeMessage, message) =>
    dispatch(updateMessageAction(typeMessage, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
