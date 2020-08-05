import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import RegisterOrLogin from "./components/RegisterOrLogin";

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/">
            <RegisterOrLogin></RegisterOrLogin>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
