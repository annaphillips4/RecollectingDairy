import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/Landing";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Main from "./components/MainPage"
import TaskInfo from "./components/TaskInfo";
import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
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
          <Route exact path="/app">
            <Main />
          </Route>
          <Route exact path="/app/list/:listId">
            <Main />
          </Route>
          <Route exact path="/app/list/:listId/:taskId">
            <TaskInfo />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
