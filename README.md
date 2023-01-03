# Sortify
This project is a visualization tool for different sorting algorithms using React and TypeScript.

## Folder structure
The project has the following folder structure:
```
/
│   package-lock.json
│   package.json
│
├───public
│       index.html
│       manifest.json
│       robots.txt
│
└───src
    │   App.test.tsx
    │   App.tsx
    │   index.tsx
    │   logo.svg
    │   react-app-env.d.ts
    │   reportWebVitals.ts
    │   setupTests.ts
    │
    ├───Components
    │   ├───NavBar
    │   │       NavBar.tsx
    │   │
    │   └───VisualArray
    │           styles.css
    │           VisualArray.tsx
    │
    ├───Sorts
    │       BubbleSort.ts
    │       BucketSort.ts
    │       CountingSort.ts
    │       HeapSort.ts
    │       index.ts
    │       InsertionSort.ts
    │       MergeSort.ts
    │       QuickSort.ts
    │       RadixSort.ts
    │       QuickInsertSort.ts
    │
    └───Utility
        ├───Animator
        │       Animator.ts
        │
        └───Random
                Random.ts
```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Supported Sorting Algorithms
The following sorting algorithms are currently supported:
+ Bubble Sort
+ Bucket Sort
+ Counting Sort
+ Heap Sort
+ Insertion Sort
+ Merge Sort
+ Quick Sort
+ Radix Sort
+ QuickInsert Sort
## Contributions
Contributions are welcome! If you would like to add a new sorting algorithm or make any other improvements to the project, please feel free to submit a pull request.
