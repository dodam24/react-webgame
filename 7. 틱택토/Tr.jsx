import React, { useRef, useEffect, memo, useMemo } from "react";
import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');

  const ref = useRef([]);
  useEffect(() => {
    console.log(rowData === ref.current[0], dispatch === ref.current[2], rowIndex === ref.current[3]);
    ref.current = [rowData, dispatch, rowIndex];
  }, [rowData, dispatch, rowIndex]);

  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
          useMemo( // 컴포넌트 자체를 기억
            () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
            [rowData[i]],
          )
        ))}
    </tr>
  );
});

export default Tr;
