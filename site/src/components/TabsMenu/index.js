import React from 'react';

import { Route, withRouter } from 'react-router-dom';
import { NavTabs, NavTab } from '../NavTabs';

export default withRouter(function TabsMenu () {
  return (
    <Route path="/*" render={(props) => (
      <NavTabs {...props}>
        <NavTab to="/camps">מחנות</NavTab>
        <NavTab to="/events">אירועים</NavTab>
        <NavTab to="/food">אוכל</NavTab>
      </NavTabs>
    )} />
  )
});