import React, { Component } from "react";

class Test extends Component {
  state = {
    counter: 0,
  };

  // 컴포넌트 최적화 (이전 props와 현재 props를 비교하여 변경된 부분이 있는 경우에는 true를 반환하여 해당 컴포넌트만 리렌더링함)
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== next.state.counter) {
      return true; // 렌더링 O
    }
    return false; // 렌더링 X
  };

  onClick = () => {
    this.setState({});
  };

  render() {
    console.log("렌더링", this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}
