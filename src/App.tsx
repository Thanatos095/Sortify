import React from 'react';
import VisualArray from './Components/VisualArray/VisualArray';
import { BubbleSort, InsertionSort, HeapSort, MergeSort } from './Sorts';
import { getRandomInt } from './Utility/Random/Random';

const get_data = (length : number) => {
    const array : Array<number> = [];
    for (let i = 0; i < length; i++) {
        array.push(getRandomInt(-1000, 1000));
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
      <VisualArray fps = {60} data={get_data(100)} sort = {HeapSort}/>
    </div>
  );
}

export default App;
