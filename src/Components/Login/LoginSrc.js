import React, { createContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {  } from 'react-router-dom';
import Home from '../Home/index1';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import SignIn from './Signin';
import { Redirect } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginSrc() {
  const classes = useStyles();

  // const navigate = useNavigate();
  // const redirect = Redirect();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postResponse, setPostResponse] = React.useState("");
  const [authorized, setAuthorized] = useState(false);
  const [busy, setBusy] = React.useState(false);
  // const [redirect, setRedirect] = React.useState(false);
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const authenticateUser = async (event, email, password) => {
    setBusy(true);
    event.preventDefault();
    const response = await fetch('http://localhost:9000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => response.json())
    .then(response => setPostResponse(response.body));

    if(re.test(postResponse.email)){
      setAuthorized(true);
      console.log(authorized)
      // setRedirect(true);
      console.log("cocok")
      console.log(typeof postResponse)
      console.log(postResponse)
  
      console.log(response);
  
      console.log(authorized)
      return Redirect("/signin");
    }

  };


  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;

    if(name === 'email') {
        setEmail(value);
    }
    else if(name === 'password'){
      setPassword(value);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange = {(event) => onChangeHandler(event)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange = {(event) => onChangeHandler(event)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={event => {
              authenticateUser(event, email, password);
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {/* <BrowserRouter>
          <Switch>
            <Route exact path="/" element={authorized ? <Home/> : <SignUp />}/>
          </Switch>
      </BrowserRouter> */}
    </Container>
  );
}
