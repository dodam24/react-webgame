import React, { Component } from 'react';

// 라이프 사이클(Life Cycle) 과정:
// 클래스의 경우 constructor -> render -> ref -> componentDidMount 
// (setState/props가 변경될 때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 부모 컴포넌트가 자식 컴포넌트를 제거할 때 -> componentWillUnmount -> 소멸

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

class RSPClass extends Component {
  state = {
    result: '',
    score: 0,
    imgCoord: rspCoords.바위,
  }; 

  interval;

  // 라이프 사이클(Life Cycle)
  componentDidMount() { // 컴포넌트가 처음 렌더링된 직후, 주로 여기에 비동기 요청(ex. setInterval, setTimeout)
    this.interval = setInterval(this.changeHand, 100);
  }

  // componentDidUpdate() {} // 리렌더링 후

  componentWillUnmount() { // 컴포넌트가 제거되기 직전, 주로 여기에 비동기 요청 취소(ex. clearInterval, clearTimeout)
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  onClickBtn = (choice) => () => { // 고차 함수(High Order Function): 함수를 인자로 전달받거나 함수를 결과로 반환하는 함수
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      this.setState({
        result: '비겼습니다!',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000)
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
};

export default RSPClass;