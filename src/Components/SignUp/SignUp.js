import { AppBar, Grid, Toolbar } from '@material-ui/core';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import SignUpSrc from './SignUpSrc';


function SignUp() {
  return (
    <div className="Login">
      <Grid style={{ border: '1px solid grey' }}>
        {/* <Header/> */}
        <SignUpSrc/>
          {/* <Footer/> */}
      </Grid>
    </div>
  );
}

export default SignUp;
