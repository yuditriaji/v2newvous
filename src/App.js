import logo from './logo.svg';
import './App.css';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
import Header from './Components/Shared/Header';
import Home from './Components/Home/index1';
import Footer from './Components/Shared/Footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <Grid style={{ border: '1px solid grey' }}>
      <Header/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
          </Switch>
        </BrowserRouter>
          {/* <AppBar>
            <Toolbar>HELLO AMIGA</Toolbar>
          </AppBar> */}
          {/* <Home/> */}
          <Footer/>
      </Grid>
    </div>
  );
}

export default App;
