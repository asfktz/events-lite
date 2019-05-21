import './style.scss';
import React from 'react';

export default function ErrorMsg (argument) {
	return (
		<div className="ErrorMsg">
		  <div className="ErrorMsg-title">
		    <span>ככל הנראה העמוד לא התאפק</span> <span>והלך לצפות באחת החזרות.</span>
		  </div>
		  <div>
		    ממש מתנצלים - כבר מחזירים אותו
		  </div>
		</div>
	);
}