import React, { Component, createContext, useEffect } from "react";
import { auth, generateUserDocument } from "../firebase/config";

export const UserContext = createContext({ user: null });

const UserProvider = (props) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // getLinks();
    // getUserDocument();
    userAuthState();
  }, []);

  function userAuthState(){
    const response = await fetch('http://localhost:9000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(response => setUser(response.body));

    console.log(typeof user)
    console.log(user)
  }

    // fetch("http://localhost:9000/userState")
    // .then(res => res.json())
    // .then(res => this.setState(res.body));

    // console.log(this.state.user)

  //   auth.onAuthStateChanged(async userAuth => {
  //     const user = await generateUserDocument(userAuth);
  //     this.setState({ user });
  // });

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserProvider;