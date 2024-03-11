import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // useMemo(): 값을 기억 (즉, return 값을 기억하는 것)
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);
  
  // useEffect(() => {
  //   // ajax 요청
  // }, []); // componentDidMount일 때 실행

  // const mounted = useRef(false);
  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     // ajax 요청
  //   }
  // }, [바뀌는 값]); // componentDidUpdate일 때만 실행. componentDidMount일 때 실행 X

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) { // 보너스 공 빼기
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => { // 보너스 공
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => { // componentWillUnmount
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행

  useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
  }, [winNumbers]);

  const onClickRedo = useCallback(() => { // 초기화. useCallback(): 함수 자체를 기억 (여기서는 winNumbers가 바뀌기 전까지)
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
    <div>당첨 숫자</div>
    <div id="결과창">
      {winBalls.map((v) => <Ball key={v} number={v} />)}
    </div>
    <div>보너스</div>
    {bonus && <Ball number={bonus} onClick={onClickRedo} />} {/* 자식 컴포넌트에 props로 함수를 넘길 때는 useCallback으로 꼭 감싸줘야 쓸데없이 리렌더링 되지 않음 */}
    {redo && <button onClick={onClickRedo}>한 번 더!</button>}
  </>
  );
};

export default Lotto;