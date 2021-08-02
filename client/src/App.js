import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

// Component
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// Layout
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';

// Contact
import Contacts from './components/contact/Contacts';

// Context
import ContactState from './contexts/contact/ContactState';
import AuthState from './contexts/auth/AuthState';
import AlertState from './contexts/alert/AlertState';

// Routing
import PrivateRoute from './components/routing/PrivateRoute';

// Utils
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/contacts" component={Contacts} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
