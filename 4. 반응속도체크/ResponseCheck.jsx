import React, { useState, useRef, useCallback } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  // useRef(): 1. DOM 요소에 접근  2. 값이 변경되어도 컴포넌트가 리렌더링되지 않도록 하기 위한 값들을 저장
  const timeout = useRef(null); // useRef 함수는 current 속성을 가지고 있는 객체를 반환
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = useCallback(() => {
    if (state === "waiting") {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭!');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초(랜덤) 후에 초록색으로 변경

    } else if (state === "ready") { // 성급하게 클릭한 경우
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 되면 클릭하세요.');

    } else if (state === "now") { // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current]
      });
    }
  }, [state]);

  const onReset = useCallback(() => {
    setResult([]);
  }, []);

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };

  return (
    <>
    <div id="screen" className={state} onClick={onClickScreen}>
      {message}
    </div>
    {renderAverage()}
  </>
  );

};

export default ResponseCheck;
