import React from 'react';
import VisualArray from './Components/VisualArray/VisualArray';
import { BubbleSort, InsertionSort, HeapSort } from './Utility/Sorts';
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
      <VisualArray data={get_data()} sort = {HeapSort}/>
      <VisualArray data={get_data()} sort = {InsertionSort}/>
    </div>
  );
}

export default App;
