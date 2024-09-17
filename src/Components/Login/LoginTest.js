import { Button, makeStyles } from '@material-ui/core';
import { PinDropSharp } from '@material-ui/icons';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from '../Home/index1';
import Login from './Signin';

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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function LoginTest(props) {
    const classes = useStyles();
    const [authorized, setAuthorized] = useState(false)

    const authenticateUser = () => {
      setAuthorized(true);
      props.history.push("/");
    }

    return(
        <div>
          {authorized ? (
            <Home/>
          ): (
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={authenticateUser}
          >
            Sign In
          </Button>
          )}

        </div>
    );
}