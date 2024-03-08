import React, { Component } from "react";

class Try extends Component {
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
