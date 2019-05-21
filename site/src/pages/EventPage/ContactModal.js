/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import Linkify from 'react-linkify';
import Card from '../../components/Card';
import Modal from '../../components/Modal';

function displayContanctDetails(str) {
  const details = str.split(/[\n\r]/).map((line, i) => <div className="Welcome-p" key={i}><Linkify>{line}</Linkify></div>);
  return (
    <div>
      <div className="Welcome-p">פרטי התקשרות:</div>
      {details}
    </div>
  );
}

export default function ContactModal({
  onClose, register, event, legalText,
}) {
  const [approved, approve] = useState(false);
  return (
    <Modal onClose={onClose} shrink>
      <div className="Modal-title">פרטי יצירת קשר</div>
      <div className="Modal-p">על מנת ליצור קשר עם היוצר ולהרשם, אנא אשר את הצהרת האחריות</div>
      <div className="Modal-p approve-checkbox">
        <label htmlFor="approve">
          <input id="approve" type="checkbox" disabled={approved} checked={approved} onChange={() => { approve(true); register(); }} />
          {legalText}
        </label>
      </div>
      <div className="Modal-p">
        {approved && displayContanctDetails(event.manualRegistrationContent)}
      </div>
      <div className="Modal-btns">
        <div className="Modal-btn" onClick={onClose}>סגור</div>
      </div>
    </Modal>
  );
}
