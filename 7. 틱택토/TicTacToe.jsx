import React, { useCallback, useReducer, useEffect } from 'react';
import Table from './Table';

const initialState = { // state를 모아놓고 action을 통해서만 변경
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => { // action이 실행되면 reducer에 정의해 놓은 대로 state를 변경 (state를 바꿀 때는 불변성이 중요함)
  switch (action.type) {
    case SET_WINNER: 
      // state.winner = action.winner; 이런 식으로 값을 직접 변경 X
      return { // 새로운 객체를 만들어서 변경된 값만 바꿔줘야 함
        ...state, // 얕은 복사
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 문제를 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''], 
          ['', '', ''], 
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state; 
  // const [winner, setWinner] = useState(''); // useState가 너무 많아지면 관리하기 어려우므로 useReducer를 사용
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O' }); // 여기서 객체가 action에 해당하며, type은 액션의 이름을 지칭. action을 dispatch하면 action을 실행
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) { // useEffect는 처음 렌더링 할 때도 실행되므로 recentCell(-1, -1)일 때는 반영되지 않도록 조건 설정
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = ture;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win) { // 승리 시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;