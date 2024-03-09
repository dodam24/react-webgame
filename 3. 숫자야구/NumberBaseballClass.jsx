import React, { Component, createRef } from "react";
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

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(), // ex: [1, 3, 5, 7]
    tries: [], // 배열에 값을 넣을 때 push 쓰면 안됨
  };

  onSubmitForm = (e) => { // 화살표 함수를 선언하면 this에 바인딩할 객체가 정적으로 결정됨. 즉, 화살표 함수 내부에서 bind(this)를 자동으로 실행
    const { value, tries, answer } = this.state; // 구조 분해 할당
    e.preventDefault();

    if (value === answer.join("")) { // 정답을 맞춘 경우
      this.setState((prevState) => { // 일급 함수(first class function): 함수가 변수처럼 다루어지는 경우 (함수를 다른 함수의 전달인자로 넘기거나, 함수가 다른 함수의 반환값이 되는 경우 등)
        return {
          result: "홈런!",
          tries: [ // push를 쓰지 않고 새로운 배열을 만들어서, 리액트가 변경된 부분을 감지하여 렌더링할 수 있도록 해줌
            // 리액트는 이전 state와 현재 state를 비교해서 변경된 부분이 있어야만 render 부분이 실행됨
            ...prevState.tries,
            { try: value, result: "홈런!" },
          ],
        };
      });
      alert("게임을 다시 시작합니다!"); // 초기화
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else { // 답이 틀렸을 경우
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) { // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 정답은 ${answer.join(", ")}입니다.`,
        });
        alert("게임을 다시 시작합니다!"); // 초기화
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else { // 10번 이하로 틀렸을 때
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: value,
                result: `${strike} 스트라이크, ${ball} 볼입니다.`,
              },
            ],
            value: "",
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef(); // this.inputRef

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inpurRef} maxLength={4} value={value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도 :`} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball; // import NumberBaseball;
