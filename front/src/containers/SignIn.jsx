import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from  'react-redux';
import axios from 'axios';
import {
  TextField,
  Button,
} from "@material-ui/core";
import { createSessionAction } from '../actions/authActions';
import { updateMessageAction } from '../actions/flashActions';

function SignIn({ createSession, flash, updateFlashMessage }) {
  const [formContent, setFormContent] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  const handleChange = (name) => {
    return ({ target: { value } }) => {
      setFormContent((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formContent;
    if (email && password) {
      axios
        .post('/auth/signin', formContent)
        .then((response) => response.data)
        .then(
          (res) => {
            updateFlashMessage('success', res.flash);
            createSession(res.token);
            history.replace('/');
          },
          (err) =>
          updateFlashMessage('error', 'Your login details are wrong')
        );
    } else {
      updateFlashMessage("All fields must be completed");
    }
  };

  return (
    <div>
      <h1>Sign in !</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          name="email"
          label="Email"
          margin="normal"
                  variant="outlined"
          value={formContent.email || ""}
          onChange={handleChange('email')}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          margin="normal"
          variant="outlined"
          value={formContent.password || ""}
          onChange={handleChange('password')}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            marginTop: '16px',
          }}
        >
          Log in
        </Button>
      </form>
      <h2>No account yet ? <Link to={`/signup`}>Sign up</Link></h2>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  flash: state.flash,
});

const mapDispatchToProps = (dispatch) => ({
  createSession: (token) => dispatch(createSessionAction(token)),
  updateFlashMessage: (typeMessage, message) => dispatch(updateMessageAction(typeMessage, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
