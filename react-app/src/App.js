import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Lists from "./components/Lists";
import Navigation from "./components/Navigation";
import LandingPage from "./components/Landing";
import Tasks from "./components/Tasks/Tasks";
import NewListForm from "./components/ListNewForm";
import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/lists">
            <Lists />
          </Route>
          <Route path="/lists/new">
            <NewListForm />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
