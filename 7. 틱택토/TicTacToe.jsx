import React, { useCallback, useReducer, useState } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', '']
  ],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const SET_TURN = 'SET_TURN';

const reducer = (state, action) => {
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
      };
    }
    case SET_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O' });
  }, []);

  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;