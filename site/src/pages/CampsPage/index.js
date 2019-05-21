import './style.scss';

import React, { useContext } from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import CampItem from '../../components/CampItem';
import context from '../../context';
import qs from '../../utils/qs';

import { NavTabs, NavTab } from '../../components/NavTabs';

import { zones } from '../../CONSTANTS';
import ZonesMap from '../../components/ZonesMap';
import useBreakpoints from '../../utils/useBreakpoints';

function CampsPage({ history, match, location, scrollPosition }) {
  const { data } = useContext(context);

  const largerThen = useBreakpoints();

  const campsByZone = _(data.camps)
    .groupBy('zone')
    .mapValues(camps => _.orderBy(camps, [
      camp => Boolean(camp.description),
      'coverImageSM',
    ], ['desc', 'asc']))
    .value();

  function handleCampClick(eventId) {
    history.push(`/events/${eventId}`, { fromSearch: true });
  }

  const query = qs.parse(location.search);

  if (!query.zone) {
    const nextQuery = qs.stringify({ zone: 'center' });

    return (
      <Redirect to={`${match.url}?${nextQuery}`} />
    );
  }

  return (
    <div className="CampsPage">
      <div className="CampsPage-header">
        <div className="CampsPage-intro">
          <h1 className="CampsPage-introTitle" style={{ fontSize: '2rem' }}>מחנות</h1>
          <div className="CampsPage-introContent" style={{ marginBottom: '1rem' }}>
            <div className="CampsPage-p">השנה הזמנו קהילות יוצרות מכל הארץ לפסיפס של מחנות תרבותיים שיתפרסו על פני טבעון בימי הפסטיבל. בכך אנו מבקשים להעמיק את חוויית הפסטיבל כמסע יצירתי משותף של קהילות יוצרות בישראל שיש ביניהן קשר ותמיכה, ולחזק את התשתית של חברה אזרחית חופשית, ריבונית ויצירתית.</div>
            <div className="CampsPage-p">כאן תוכלו לראות את רשימת המתחמים שפועלים בשייח' אבריק 3 ובהם נערכים כמה אירועים - בתים פרטיים, מבני ציבור, חצרות, ואדיות, בניינים ומוסדות.</div>
            <div className="CampsPage-p">שוטטות מהנה! </div>
          </div>
        </div>
        {largerThen.md && (
          <div className="CampsPage-map">
            <ZonesMap />
          </div>
        )}
      </div>

      <div className="CampsPage-main">
        <NavTabs className="CampsPage-tabs" history={history} match={match} location={location}>
          {_.map(zones, ({ color, label }, key) => (
            <NavTab className="CampsPage-tab" key={key} to={`/camps?zone=${key}`} color={color}>{label}</NavTab>
          ))}
        </NavTabs>

        <div className="CampList">
          {_.map(campsByZone[query.zone], camp => (
            <CampItem
              camp={camp}
              key={camp.id}
              to={{
                pathname: `/camps/${camp.id}`,
                state: { hasHistory: true },
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default CampsPage;