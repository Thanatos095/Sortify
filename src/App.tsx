import React from 'react';
import VisualArray from './Components/VisualArray/VisualArray';
import { getRandomInt } from './Utility/Random/Random';
import * as Sorts from './Sorts';
import { createTheme, ThemeProvider } from '@mui/material';
import NavBar from './Components/NavBar/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
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
const get_normal_data = (min : number, max : number, skew : number) => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random()
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) 
    num = get_normal_data(min, max, skew) // resample between 0 and 1 if out of range
  else{
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return num
}
const get_normal_datas = (n : number) => {
  const array : Array<number> = [];
  for (let i = 0; i < n; i++) {
      array.push(get_normal_data(0, 100, 1));
  }
  return array; 
}
const sortMappings = {
  "Bubble Sort" : Sorts.BubbleSort,
  "Insertion Sort" : Sorts.InsertionSort,
  "Heap Sort" : Sorts.HeapSort,
  "Merge Sort" : Sorts.MergeSort
};
const theme = createTheme({
  palette : {
    primary :{
      main : '#5763a7',
      light : '#6570b3',
    },
    secondary : {
      main : '#07b7b3'
    }
  }
});
function App() {
  const arrayRef  = React.useRef<VisualArray>(null);

  /* Passing methods between sibling components */
  const methods = {
    setSort : ( sorter : (v : VisualArray) => Generator<void> ) => arrayRef.current?.setSort(sorter),
    setData : ( data : Array<number> ) => arrayRef.current?.setData(data),
    play : () => arrayRef.current?.play(),
    pause : () => arrayRef.current?.pause(),
    setFPS : (value : number) => arrayRef.current?.setFPS(value)
  }

  return (
    <ThemeProvider theme = {theme}>
      <div className="App">
        <CssBaseline />
        
        <NavBar 
          sortMappings = {sortMappings}
          setSort = {methods.setSort}
          setFPS = {methods.setFPS}
          play = {methods.play}
          pause = {methods.pause}
          setData = {methods.setData}
        />

        <VisualArray 
          ref = {arrayRef} 
          fps = {60} 
          data={get_data(100)} 
          sort = {Sorts.BubbleSort}
        />
      </div>
    </ThemeProvider>
  );
}
export default App;
