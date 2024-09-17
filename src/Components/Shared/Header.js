import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Box } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: 'none',
    borderBottom: '1px solid #e0e0e0',
  },
  logo: {
    marginRight: theme.spacing(2),
    width: 40,
    height: 40,
  },
  navItems: {
    flexGrow: 1,
  },
  navButton: {
    textTransform: 'none',
    marginRight: theme.spacing(2),
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <img src="./assets/logo-trpt.png" alt="Logo" className={classes.logo} />
        <Box className={classes.navItems}>
          <Button color="inherit" className={classes.navButton}>Home</Button>
          <Button color="inherit" className={classes.navButton}>Product</Button>
          <Button color="inherit" className={classes.navButton}>About Us</Button>
        </Box>
        <IconButton color="inherit">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;