import { AppBar, Grid, Toolbar } from '@material-ui/core';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import LoginSrc from './LoginSrc';

function SignIn() {
  return (
    <div className="Login">
      <Grid style={{ border: '1px solid grey' }}>
        {/* <Header/> */}
        <LoginSrc/>
        {/* <Footer/> */}
      </Grid>
    </div>
  );
}

export default SignIn;
