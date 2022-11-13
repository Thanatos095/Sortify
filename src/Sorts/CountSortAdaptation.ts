import VisualArray from "../Components/VisualArray/VisualArray";
export default function* CountSortAdaptation(v : VisualArray){
    if(!v.data.every(item => item >= 0)){
        alert("Counting sort can only sort non negative numbers.");
        return;
    }
    const max = v.getMax();
    const frequencies = Array.from({length : max + 1}, item => 0); /*Create array of length max + 1 with 0 filled */
    for (let i = 0; i < v.length(); i++) {
        frequencies[v.get(i)]++;
        yield;
    }
    /*Cumulative frequency*/
    for (let i = 1; i < frequencies.length; i++) {
        frequencies[i] += frequencies[i - 1];
    }
    
    while(true){
        const input = prompt("Enter a range(space separated): ");
        if(input === null) break;
        const range = input.split(' ').map(Number);
        if(range.length != 2){
            alert("The range must consist of a lowerbound and an upperbound.");
        }
        if(!range.every(item => item >= 0)){
            alert("Only non negative numbers are allowed.");
            continue;
        }
        if(range[0] >= range[1]){
            alert("The range is not valid. Upper bound must be greater than lower bound.");
            continue;
        }
        const a = range[0];
        const b = Math.min(range[1], v.getMax());
        const output = a > 0 ? frequencies[b] - frequencies[a - 1] : frequencies[b];
        alert("There are " + output.toString() + " values in the given range.");
    }
}