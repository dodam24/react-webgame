import { useRef, useEffect } from 'react';

// const [isRunning, setIsRunning] = useState(true);
// useInterval(() => {
  //   console.log('hello');
  // }, isRunning ? 1000 : null);
  
  // Custom Hook
function useInterval(callback, delay) { // useInterval은 useRef 1개와 useEffect 2개를 세트로 구성한 커스텀 훅 
  const savedCallback = useRef(); // useRef로 항상 최신 객체를 참조 가능

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) { // delay가 null이 되는 순간 정지
      let id = setInterval(tick, delay); // delay가 null이 아닐 때 callback을 실행
      return () => clearInterval(id); // delay가 null이 되면 return 부분의 clearInterval 실행
    }
  }, [delay]);

  return savedCallback.current;
}

export default useInterval;