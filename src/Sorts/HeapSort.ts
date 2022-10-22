import VisualArray from "../Components/VisualArray/VisualArray";
export default function* HeapSort(v : VisualArray){
    function* heapify(size : number, i : number){
        while(true){
            let largest = i;
            const right = 2 * largest + 1;
            const left = 2 * largest + 2;

            if(right < size && v.gt(v.get(right), v.get(largest))){
                yield;
                largest = right;
            } 
            if(left < size && v.gt(v.get(left), v.get(largest))){
                yield;
                largest = left;
            } 
            if (largest !== i) {
                v.swap(i, largest);
                yield;
                i = largest;
            }
            else break;
        }
    }
    for (let i = Math.floor(v.length() / 2) - 1; i >= 0; i--)
        yield* heapify(v.length(), i);
    
    for(let i = v.length() - 1 ; i >= 0 ; i--){
        v.swap(i, 0);
        yield;
        yield* heapify(i, 0);
    }
}
