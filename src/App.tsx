import React from 'react';
import VisualArray from './Components/VisualArray/VisualArray';
import BubbleSort from './Utility/Sorts/BubbleSort';
import InsertionSort from './Utility/Sorts/InsertionSort';
import { getRandomInt } from './Utility/Random/Random';

const get_data = () => {

    const array : Array<number> = [];
    for (let i = 0; i < 100; i++) {
        array.push(getRandomInt(1, 50));
    }
    return array;
}


function App() {
  return (
    <div className="App">
      <VisualArray data={get_data()} sort = {InsertionSort}/>
    </div>
  );
}

export default App;
