import React, { PureComponent } from "react";

class Try extends PureComponent {
  render() {
    const { tryInfo } = this.props; // 구조 분해 할당
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;

// pureComponent를 사용하면 props 또는 state가 바뀔 때만 리렌더링 된다.
// 부모 컴포넌트가 리렌더링 되어도 자식 컴포넌트가 함께 리렌더링 되지 않음
// 클래스 컴포넌트에서는 pureComponent, 함수 컴포넌트에서는 memo를 사용하는 것이 좋음
// 단, Component가 복잡해지면 pureComponent가 작동하지 않는 경우가 있으므로 이때는 Component를 사용해야 한다.
// 예를 들어 props, state가 바뀌었을 때 렌더링하고 싶지 않다면 Component, shouldComponentUpdate를 사용해서 원하는 부분만 리렌더링할 수 있다.