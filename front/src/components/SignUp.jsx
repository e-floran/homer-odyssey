import React, { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div>
      <h1>{email}</h1>
      <input type="email" name="email" value={email} onChange={emailHandler} />
    </div>
  );
}
export default SignUp;
