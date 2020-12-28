import React, { useState } from 'react';

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formContent);
    fetch("/auth/signup",
    {
        method:  'POST',
        headers:  new  Headers({
            'Content-Type':  'application/json'
        }),
        body:  JSON.stringify(formContent),
    })
    .then(res  =>  res.json())
    .then(
        res  =>  setFlash(res.flash),
        err  =>  setFlash(err.flash)
    )
  };

  return (
    <div>
      <h1>{JSON.stringify(formContent)}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formContent.email}
          onChange={handleChange('email')}
        />
        <input
          type="password"
          name="password"
          value={formContent.password}
          onChange={handleChange('password')}
        />
        <input
          type="password"
          name="passwordBis"
          value={formContent.passwordBis}
          onChange={handleChange('passwordBis')}
        />
        <input
          type="text"
          name="firstname"
          value={formContent.firstname}
          onChange={handleChange('firstname')}
        />
        <input
          type="text"
          name="lastname"
          value={formContent.lastname}
          onChange={handleChange('lastname')}
        />
        <input type="submit" name="submit" />
      </form>
    </div>
  );
}
export default SignUp;
