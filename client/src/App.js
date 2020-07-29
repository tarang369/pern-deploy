import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
toast.configure();
function App() {
  const checkAuthenticated = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const setAuth = (Boolean) => {
    setisAuthenticated(Boolean);
  };
  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/login'
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to='/' />
                )
              }
            />
            <Route
              exact
              path='/register'
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to='/' />
                )
              }
            />
            <Route
              exact
              path='/'
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to='/login' />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
