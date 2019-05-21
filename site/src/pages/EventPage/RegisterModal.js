/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import cx from 'classnames';

import Modal from '../../components/Modal';

export default function RegisterModal({
  auth, onClose, register, legalText, isWaitingList, event
}) {
  const [approved, approve] = useState(false);
  const [disabled, disable] = useState(false);
  const [status, setStatus] = useState('');
  const [statusText, setStatusText] = useState('');
  const registerButtonClassName = cx('Modal-btn', {
    disabled: !approved || disabled,
  });

  function registerHandler() {
    if (approved && !disabled) {
      register().then(() => {
        setStatus('ok');
        if (isWaitingList) {
          setStatusText('נכנסת לרשימת ההמתנה בהצלחה. מארגני האירוע ייצרו איתך קשר במידה ויתפנה מקום');
        } else {
          setStatusText('נרשמת בהצלחה');
        }

        onClose();
      });
      disable(true);
    }
  }
  return (
    <Modal onClose={onClose}>
      <div className="RegisterModal-title">
        הרשמה לאירוע: <strong>{event.name}</strong>
      </div>
      <div className="Modal-p">שימו לב שההרשמה לא מבטיחה מקום באירוע</div>
      <div className="Modal-p">
        {'אימייל ממארגני האירוע ישלח ל '}
        <strong>{auth.user.email}</strong>
        {' על מנת לאשר את ההרשמה'}
      </div>
      <div className="Modal-p approve-checkbox">
        <label htmlFor="approve">
          <input id="approve" type="checkbox" disabled={disabled} checked={approved} onChange={e => approve(e.target.checked)} />
          {legalText}
        </label>
      </div>
      {status && <div className={`Modal-p status ${status}`}>{statusText}</div>}
      <div className="Modal-btns">
        <div className="Modal-btn Modal-btn is-secondary" onClick={onClose}>ביטול</div>
        <a className={registerButtonClassName} href="#" onClick={registerHandler}>הרשמה</a>
      </div>
    </Modal>
  );
}
