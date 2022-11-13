import VisualArray from "../Components/VisualArray/VisualArray";
export default function* BucketSort(v : VisualArray){

    if(!v.data.every(item => item >= 0)){
        alert("Bucket sort can only sort non negative numbers.");
        return;
    }
    const max = v.getMax();    
    const buckets = Array.from({length : v.length()}, item => Array<number>());

    for(let i = 0 ; i < v.length() ; i++){
        const val = v.get(i) / (max + 1); /* Trivially bucket sort has constraint that input should be between (0, 1). divide by max + 1 for that*/
        const index = Math.floor(v.length() * val);
        buckets[index].push(val);
        yield;
    }

    /* Flatten the buckets */
    for (let i = 0, k = 0; i < v.length(); i++) {
        for (let j = 0; j < buckets[i].length; j++, k++) {
            v.set(k, buckets[i][j] * (max + 1)); /* Multiply by max + 1 again to get original value */
            yield;
        }
    }
    /* Sort each bucket using insertion sort */
    let start = 0;
    for (let i = 0; i < buckets.length; i++) {

        if(i > 0) 
            start += buckets[i - 1].length;
        const end = start + buckets[i].length; 

        for (let i = start + 1; i < end; i++) 
        {  
            let key = v.get(i);  
            yield;
            let j = i - 1;
            while (j >= start && v.gt(v.get(j), key)) 
            {  
                v.set(j + 1, v.get(j))
                j = j - 1;  
                yield;
            }
            v.set(j + 1, key);
            yield;
        }  
    }
}