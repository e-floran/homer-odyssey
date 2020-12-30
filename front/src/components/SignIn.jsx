import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  SnackbarContent,
  createMuiTheme,
} from "@material-ui/core";

function SignIn() {
  const [formContent, setFormContent] = useState({
    email: '',
    password: '',
  });
  const [flash, setFlash] = useState("");
  const handleChange = (name) => {
    return ({ target: { value } }) => {
      setFormContent((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };
  const handleSubmit = () => {
    return <Link to="/profile"></Link>
  };
  const classes = createMuiTheme();

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
        <Link to="/profile" className={classes.submit}>
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
        </Link>
      </form>
      <h2>No account yet ? <Link to={`/signup`}>Sign up</Link></h2>
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
export default SignIn;
