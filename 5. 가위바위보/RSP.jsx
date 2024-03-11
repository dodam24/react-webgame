import React, { useState, useRef, useEffect } from 'react';
import useInterval from './useInterval';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

// 클래스형 컴포넌트
// componentDidMount() {
//   this.setState({
//     imgCoord: 3,
//     score: 1,
//     result: 2,
//   })
// }

// 함수형 컴포넌트
// useEffect(() => {
//   setImgCoord();
//   setScore();
// }, [imgCoord, score]);
// useEffect(() => {
//   setResult();
// }, [result])

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // 클래스 컴포넌트의 Life Cycle을 대체 (리액트 컴포넌트가 렌더링될 때마다 특정 작업을 실행할 수 있도록 하는 Hook)
  // 컴포넌트가 마운트 됐을 때(처음 나타났을 때), 언마운트 됐을 때(사라질 때), 그리고 업데이트 될 때(특정 props가 바뀔 때) 특정 작업을 처리

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위)
    }
  };

  useInterval(changeHand, isRunning ? 100 : null); // 커스텀 훅

  const onClickBtn = (choice) => () => {
    if (isRunning) { // 멈췄을 때 또 클릭하는 것을 방지
      setIsRunning(false);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
  
      if (diff === 0) {
        setResult('비겼습니다!');
      } else if ([-1, 2].includes(diff)) {
        setResult('이겼습니다!'),
        setScore((prevScore) => prevScore + 1);
      } else {
        setResult('졌습니다!'),
        setScore((prevScore) => prevScore - 1);
      }
      setTimeout(() => { // 멈춰 있던 묵찌빠를 1초 후에 재실행
        setIsRunning(true);
      }, 1000)
    }
  };

  return (
    <>
    <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
    <div>
      <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
      <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
      <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
    </div>
    <div>{result}</div>
    <div>현재 {score}점</div>
  </>
  );
};

export default RSP;