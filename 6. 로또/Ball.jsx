import React, { memo } from 'react';

const Ball = memo(({ number }) => { // 고차 컴포넌트(HOC, Higher Order Component). React.memo로 감싸서 pure Component 역할을 수행
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }
  return (
    <div className="ball" style={{ background }}>{number}</div>
  );
});

export default Ball;