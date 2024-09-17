import logo from './logo.svg';
import './App.css';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
import Header from './Components/Shared/Header';
import Home from './Components/Home/index1';
import Home1 from './Components/Home/index1 copy';
import Footer from './Components/Shared/Footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Signin';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/Login/Signin';
import LoginTest from './Components/Login/LoginTest';
import LoginSrc from './Components/Login/LoginSrc';
import UserProvider from './Components/Providers/UserProvider';


function App() {
  return (
    <div className="desktop">
      <UserProvider>
      <Grid style={{ border: '1px solid grey' }}>
      {/* <Header/> */}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={LoginSrc}/>
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/logintest" component={LoginTest}/>
          </Switch>
        </BrowserRouter>
          {/* <AppBar>
            <Toolbar>HELLO AMIGA</Toolbar>
          </AppBar> */}
          {/* <Home/> */}
          {/* <Footer/> */}
      </Grid>
      </UserProvider>
    </div>
  );
}

export default App;
