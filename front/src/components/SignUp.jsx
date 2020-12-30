import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  SnackbarContent,
  createMuiTheme,
} from "@material-ui/core";

function SignUp() {
  const [formContent, setFormContent] = useState({
    email: '',
    password: '',
    passwordBis: '',
    firstname: '',
    lastname: '',
  });
  const [flash, setFlash] = useState("");
  const handleChange = (name) => {
    return ({ target: { value } }) => {
      setFormContent((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      delete formContent.passwordBis;
      const { data } = await axios.post("/auth/signup", formContent);
      setFlash(data.flash);
    } catch (error) {
      setFlash(error.response.data.flash);
    }

  };
  const classes = createMuiTheme();

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
          className={classes.textField}
          style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            marginTop: '16px',
          }}
        >
          Submit
        </Button>
      </form>
      {flash!=="" &&
      <SnackbarContent
        className={classes.snackbar}
        message={flash}
        style={{ backgroundColor: '#d32f2f' }}
      />
      }
    </div>
  );
}
export default SignUp;
