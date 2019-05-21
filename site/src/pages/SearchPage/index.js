import './style.scss';

import React, { useContext, useMemo } from 'react';
import _ from 'lodash';
import { StickyContainer, Sticky as OrigSticky } from 'react-sticky';
import EventItem from '../../components/EventItem';
import NoResults from '../../components/NoResults';
import * as CONSTANTS from '../../CONSTANTS';
import { NavTabs, NavTab } from '../../components/NavTabs';
import { Redirect } from 'react-router-dom';
import useIsFirstRender from '../../utils/useIsFirstRender';

import qs from '../../utils/qs';

import MobileSearch from '../../components/MobileSearch';

import context from '../../context';

import filterEvents from '../../filterEvents';
import { useFavorites } from '../../favorites';

const defaultQuery = _.mapValues(CONSTANTS.filters, (filter) => {
  return filter.default;
});

function parseSearch(searchStr) {
  const search = qs.parse(searchStr);

  return {
    ...defaultQuery,
    ...search,
  };
}

function Sticky({ children, enabled, ...props }) {
  const hasNativeSticky = useMemo(() => CSS.supports('position: sticky'));

  if (hasNativeSticky) {
    return children({
      style: {
        position: 'sticky',
        top: 0,
      },
    });
  }

  if (enabled) {
    return <OrigSticky {...props}>{children}</OrigSticky>;
  }

  return children({ style: {} });
}

export default React.memo(function EventListPage({
  history, location, match,
}) {
  const isFirstRender = useIsFirstRender();
  const { data } = useContext(context);
  const favs = useFavorites();

  function handleSearchChange(_query) {
    const nextQuery = _.omitBy(_query, (value, key) => defaultQuery[key] === value);
    
    const tab = _query.groupBy === query.groupBy
      ? query.tab
      : _.first(_.keys(CONSTANTS[nextQuery.groupBy]));

    history.replace(`${match.url}?${qs.stringify({ ...nextQuery, tab })}`);
  }

  function getTabPath (key) {
    return '/events?' + qs.stringify({ ...query, tab: key });
  }

  function getDefaultQueryPath () {
    return '/events?' + qs.stringify({ groupBy: 'genres' });
  }

  const query = useMemo(() => parseSearch(location.search), [location.search]);
  const filteredEvents = useMemo(() => filterEvents(data.events, query, data, favs), [data.events, query]);
  // const { byDay, days } = useMemo(() => groupByDay(filteredEvents, data), [filteredEvents]);

  const byTabs = _.groupBy(filteredEvents, (event) => {
    switch (query.groupBy) {
      case 'genres':
        return event.genre || 'other';

      case 'zones':
        return _.get(data.locations, [event.booking.location, 'zone']);

      default:
        return event.booking.dayNum;
    }
  });

  const tabs = _.map(_.keys(byTabs), (key) => {
    return CONSTANTS[query.groupBy][key]
  });

  if (!location.search && isFirstRender) {
    return (
      <Redirect to={getDefaultQueryPath()} />
    );
  }

  if (_.size(tabs) && !byTabs[query.tab]) {
    const tab = _.first(tabs);
    return (
      <Redirect to={getTabPath(tab.value)} />
    );
  }

  return (
    <div className="EventListPage">
      <StickyContainer>
        <div className="EventListPage-sticky-in">
          <MobileSearch query={query} onChange={handleSearchChange} />
        </div>
        <Sticky enabled={false}>
          {({ style }) => (
            <header className="EventListPage-sticky" style={style}>
              <NavTabs
                className="CampsPage-tabs"
                history={history}
                match={match}
                location={location}
                scrollOnNav={true}>
                {_.map(tabs, ({ label, value }) => {
                  return (
                    <NavTab 
                      key={value}
                      className="CampsPage-tab"
                      to={getTabPath(value)}
                      isActive={value === query.tab}
                      color="#5C2E82">
                      {label}
                    </NavTab>
                  );
                })}
              </NavTabs>
            </header>
          )}
        </Sticky>
        <div className="EventListPage-main container">
          {(() => {
            if (_.isEmpty(filteredEvents)) {
              return <NoResults events={data.events} query={query} />;
            }

            return _.map(byTabs[query.tab], (event) => {
              return (
                <EventItem
                  key={event.booking.id}
                  event={event}
                  booking={event.booking}
                  to={`/events/${event.id}/${event.booking.id}`}
                />
              );
            });
          })()}
        </div>
      </StickyContainer>
    </div>
  );
});
