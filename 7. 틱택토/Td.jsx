import React, { useCallback } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = ({ rowIndex, cellIndex }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    dispatchEvent({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, []);

  return (
    <td onClick={onClickTd}>{''}</td>
  );
};

export default Td;