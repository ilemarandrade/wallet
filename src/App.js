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
        <div className="app">  
          <Switch>
            <Route path="/">
              <RegisterOrLogin></RegisterOrLogin>
            </Route>
            <Route path="/dashbord">
              <Dashbord></Dashbord>
            </Route>
          </Switch>
          </div> 
      </Router>
  );
}

export default App;
