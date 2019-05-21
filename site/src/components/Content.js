import React from 'react';
import Linkify from 'react-linkify';

function renderContent(content = '') {
  // eslint-disable-next-line react/no-array-index-key
  return content.split('\n').map((row, i) => <div key={i}>{row}</div>);
}

export default function Content({ content }) {
  return (
    <Linkify properties={{ target: '_blank' }}>
      {renderContent(content)}
    </Linkify>
  );
}
