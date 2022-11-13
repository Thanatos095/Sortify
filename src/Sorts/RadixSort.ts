import VisualArray from "../Components/VisualArray/VisualArray";

export default function* RadixSort(v : VisualArray){
    
    if(!v.data.every(item => item >= 0)){
        alert("Radix sort can only sort non negative numbers.");
        return;
    }

    const get_ith_digit = (num : number, i : number) => Math.floor(num / Math.pow(10, i)) % 10;
    const get_number_of_digits = (num : number) => num.toString().length;

    const max = v.getMax();
    for(let i = 0 ; i < get_number_of_digits(max) ; i++){
        const buckets = Array.from({length : 10}, item => Array<number>()); /*Create 10 empty lists*/
        /* Computing the buckets */
        for(let j = 0 ; j <  v.length() ; j++){
            const value = v.get(j);
            buckets[get_ith_digit(value, i)].push(value);
            yield;
        }
        /* Iterating through the buckets */
        let k = 0;
        for(let m = 0 ; m < buckets.length ; m++){
            for (let n = 0; n < buckets[m].length; n++, k++) {
                v.set(k, buckets[m][n]);     
                yield;
            }
        }
    }
}

// export default function* RadixSort(v : VisualArray){
//     const get_ith_digit = (num : number, i : number) => Math.floor(num / Math.pow(10, i)) % 10;
//     const get_number_of_digits = (num : number) => num.toString().length;
    
//     const max = v.getMax();

//     /* For each digit sort the numbers by dth digit using counting sort */
//     for(let d = 0 ; d < get_number_of_digits(max) ; d++){
//         const frequencies = Array.from({length : 10}, item => 0); /*Create array of length max + 1 with 0 filled */
        
//         for (let i = 0; i < v.length(); i++) {
//             frequencies[get_ith_digit(v.get(i), d)]++;
//             yield;
//         }
        
//         /* Cumulative Frequency */
//         for (let i = 1; i < frequencies.length; i++) {
//             frequencies[i] += frequencies[i - 1];
//         }

//         const aux = [...v.data];

//         /* Reverse iterate to maintain stability*/
//         for (let i = aux.length - 1 ; i >= 0 ; i--) {
//             const k = get_ith_digit(aux[i], d)
//             const index = frequencies[k] - 1;
//             v.set(index, aux[i]);
//             frequencies[k]--;
//             yield;
//         }
//     }
// }