import React from "react";

const Try = ({ tryInfo }) => { {/* (props) */}
  return (
    <li>
    <div>{tryInfo.try}</div> {/* {props.tryInfo.try} */}
    <div>{tryInfo.result}</div> {/* {props.tryInfo.result} */}
  </li>
  )
}; 

export default Try;
