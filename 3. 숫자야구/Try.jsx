import React, { memo } from "react"; // memo는 부모 컴포넌트가 리렌더링 될 때 자식 컴포넌트가 같이 리렌더링 되는 것을 방지함

const Try = memo(({ tryInfo }) => { {/* (props) */}
  // 자식 props는 직접 바꾸지 않고 state로 만들어서 해당 state를 바꿔야 부모 props에 영향을 미치지 않음
  // state로 자식 props 바꾸는 예시:
  // const [result, setResult] = useState(tryInfo.result);

  // const onClick= () => {
  //   setResult('1');
  // };

  return (
    <li>
    <div>{tryInfo.try}</div> {/* {props.tryInfo.try} */}
    <div>{tryInfo.result}</div> {/* {props.tryInfo.result} */}
  </li>
  )
}); 
Try.displayName = 'Try';

export default Try;
