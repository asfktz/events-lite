import './App.css';

import React, { useMemo } from 'react';
import usePromise from 'react-use-promise';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import Loader from './components/Loader';
import * as api from './api';
import context from './context';


import SearchPage from './pages/SearchPage';
import EventPage from './pages/EventPage';
import CampsPage from './pages/CampsPage';
import CampPage from './pages/CampPage';

import Header from './components/Header';

import { FavoritesProvider } from './favorites';

import usePreventPinch from './utils/usePreventPinch';

function App() {
  usePreventPinch();

  const [data, , promiseState] = usePromise(api.getData, []);
  const isLoading = promiseState !== 'resolved';

  // memo the context value to prevent rerendering
  const ctxValue = useMemo(() => ({ data, isLoading }), [data, promiseState]);

  // if (error) {
  //   return <FriendlyError error={error} />;
  // }

  if (isLoading) {
    return (
      <div className="App-loader">
        <Loader />
      </div>
    );
  }

  return (
      <context.Provider value={ctxValue}>
        <FavoritesProvider>
          <Router>
            <div className="App">
              <Header />

              <div className="App-main">
                <Switch>
                  <Route path="/camps" exact component={CampsPage} />
                  <Route path="/camps/:campId" exact component={CampPage} />
                  <Route path="/events" exact component={SearchPage} />
                  <Route path="/events/:eventId/:bookingId?" exact component={EventPage} />
                  <Redirect to="/events" />
                </Switch>
              </div>
            </div>
          </Router>
        </FavoritesProvider>
      </context.Provider>
  );
}

export default App;
