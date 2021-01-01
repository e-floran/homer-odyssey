import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
} from "@material-ui/core";
import { createSessionAction } from '../actions/authActions';
import { updateMessageAction } from '../actions/flashActions';

function SignUp({ flash, updateFlashMessage }) {
  const [formContent, setFormContent] = useState({
    email: '',
    password: '',
    passwordBis: '',
    firstname: '',
    lastname: '',
  });
  const history = useHistory();

  const handleChange = (name) => {
    return ({ target: { value } }) => {
      setFormContent((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, passwordBis, name, lastname } = formContent;

    if (email && password && passwordBis && name && lastname) {
      axios
        .post('/auth/signup', formContent)
        .then((response) => response.data)
        .then(
          (res) => {
            updateFlashMessage('success', res.flash);
            history.replace('/');
          },
          (err) => updateFlashMessage(err.data.flash)
        );
    } else {
      updateFlashMessage("All fields must be completed");
    }

  };

  return (
    <div>
      <h1>Sign up !</h1>
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
        <TextField
          type="password"
          name="passwordBis"
          label="Password confirmation"
          margin="normal"
          variant="outlined"
          value={formContent.passwordBis || ""}
          onChange={handleChange('passwordBis')}
        />
        <TextField
          type="text"
          name="firstname"
          label="Firstname"
          margin="normal"
           variant="outlined"
          value={formContent.firstname || ""}
          onChange={handleChange('firstname')}
        />
        <TextField
          type="text"
          name="lastname"
          label="Lastname"
          margin="normal"
          variant="outlined"
          value={formContent.lastname || ""}
          onChange={handleChange('lastname')}
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
          Submit
        </Button>
      </form>
      <h2>Already have an account ? <Link to={`/signin`}>Sign in</Link></h2>
    </div>
  );
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
  flash: state.flash,
});

const mapDispatchToProps = (dispatch) => ({
  createSession: (token) => dispatch(createSessionAction(token)),
  updateFlashMessage: (typeMessage, message) => dispatch(updateMessageAction(typeMessage, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);