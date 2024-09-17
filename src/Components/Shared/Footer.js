import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary">
        A product of P © 2024 Partoom Textile. All rights reserved
      </Typography>
    </footer>
  );
}

export default Footer;