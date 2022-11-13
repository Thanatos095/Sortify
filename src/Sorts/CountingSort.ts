import VisualArray from "../Components/VisualArray/VisualArray";
export default function* CountingSort(v : VisualArray){
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

    const aux = [...v.data];

    /* Reverse iterate to maintain stability */
    for (let i = aux.length - 1 ; i >= 0 ; i--) {
        const index = frequencies[aux[i]] - 1;
        v.set(index, aux[i]);
        yield;
        frequencies[aux[i]]--;
    }
}