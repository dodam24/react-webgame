import React, { useState, useRef, useCallback } from "react";
import Try from "./Try";

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers()); // lazy init. useState에 getNumbers 함수를 넣어 첫 번째 호출의 return 값만 저장해서 초기값으로 사용
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = useCallback((e) => { // 화살표 함수를 선언하면 this에 바인딩할 객체가 정적으로 결정됨. 즉, 화살표 함수 내부에서 bind(this)를 자동으로 실행
    e.preventDefault();

    if (value === answer.join("")) { // 정답을 맞춘 경우
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: "홈런!" }];
      });
      setResult("홈런!");
      alert("게임을 다시 시작합니다!"); // 초기화
      setValue("");
      setAnswer(getNumbers());
      setTries([]);
      inputEl.current.focus();

    } else { // 답이 틀렸을 경우
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 10번 이상 틀렸을 때
        setResult(`10번 넘게 틀려서 실패! 정답은 ${answer.join(", ")}입니다.`);
        alert("게임을 다시 시작합니다!"); // 초기화
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();

      } else { // 10번 이하로 틀렸을 때
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => [
          ...prevTries,
          { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` },
        ]);
        setValue("");
        inputEl.current.focus();
      }
    }
  }, [value, answer]);

  const onChangeInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseball; // import NumberBaseball;
