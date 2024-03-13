import React from 'react';
import { BrowserRouter, HashRouter, Link, Route } from 'react-router-dom';
import NumberBaseball from '../3. 숫자야구/NumberBaseballClass';
import RSP from '../5. 가위바위보/RSPClass';
import Lotto from '../6. 로또/LottoClass';
import GameMatcher from './GameMatcherClass';


const Games = () => {
  return (
      <BrowserRouter>
        <div>
          <Link to="/game/number-baseball">숫자야구</Link>
          &nbsp;
          <Link to="/game/rock-scissors-paper">가위바위보</Link>
          &nbsp;
          <Link to="/game/lotto-generator">로또생성기</Link>
          &nbsp;
          <Link to="/game/index">게임매쳐</Link>
        </div>
        <div>
          <Route path="/game/:name" component={GameMatcher} />
        </div>
      </BrowserRouter>
  );
};

export default Games;