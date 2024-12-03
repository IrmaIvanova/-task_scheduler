import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './components/Header/Header'
import { weekdaysArray } from './constants'
import { Body } from './components/Body/Body'

ReactDOM.render(
  <div>
    <Header day='3.12.2024' />
    <Body weekdays={weekdaysArray}/>
  </div>,
  document.getElementById('root')
);