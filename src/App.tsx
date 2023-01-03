import React from 'react';
import VisualArray from './Components/VisualArray/VisualArray';
import { getNormalRange } from './Utility/Random/Random';
import * as Sorts from './Sorts';
import { createTheme, ThemeProvider } from '@mui/material';
import NavBar from './Components/NavBar/NavBar';
import CssBaseline from '@mui/material/CssBaseline';

const sortMappings = {
  "Bubble Sort" : Sorts.BubbleSort,
  "Insertion Sort" : Sorts.InsertionSort,
  "Heap Sort" : Sorts.HeapSort,
  "Merge Sort" : Sorts.MergeSort,
  "Radix Sort" : Sorts.RadixSort,
  "Quick Sort" : Sorts.QuickSort,
  "Counting Sort" : Sorts.CountingSort,
  "Bucket Sort" : Sorts.BucketSort,
  "QuickInsert Sort" : Sorts.QuickInsertSort
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
  return (
    <ThemeProvider theme = {theme}>
      <div className="App">
        <CssBaseline />
        <NavBar 
          sortMappings = {sortMappings}
          visualArray = {arrayRef}
        />
        <VisualArray 
          ref = {arrayRef} 
          fps = {60} 
          data={getNormalRange(0, 1000, 100)} 
          sort = {Sorts.BubbleSort}
        />
      </div>
    </ThemeProvider>
  );
}
export default App;
