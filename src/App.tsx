import React from 'react';
import VisualArray from './Components/VisualArray/VisualArray';
import { BubbleSort, InsertionSort, HeapSort, MergeSort } from './Utility/Sorts';
import { getRandomInt } from './Utility/Random/Random';

const get_data = () => {

    const array : Array<number> = [];
    for (let i = 0; i < 100; i++) {
        array.push(getRandomInt(1, 50));
    }
    return array;
}
const get_sorted_data = () => {
    const array : Array<number> = [];
    for (let i = 0; i < 50; i++) {
        array.push(i);
    }
    return array;
}

function App() {
  return (
    <div className="App">
      <VisualArray data={get_data()} sort = {BubbleSort}/>
    </div>
  );
}

export default App;
