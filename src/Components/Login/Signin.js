import { AppBar, Grid, Toolbar } from '@material-ui/core';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import LoginSrc, { AuthContext } from './LoginSrc';
import React, { useState } from 'react';

function SignIn(props) {
  // const [auth, setAuth] = useState(props.data)
  const [redirect, setRedirect] = useState(props.data)
  // console.log(auth)
  console.log(redirect)
  return (
    <div className="Login">
      <Grid style={{ border: '1px solid grey' }}>
        <h2>sadjfkjfk</h2>
      </Grid>
    </div>
  );
}

export default SignIn;
