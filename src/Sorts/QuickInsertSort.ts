import VisualArray from "../Components/VisualArray/VisualArray";
export default function* QuickInsertSort(v : VisualArray){
    function* insertion_sort(low : number, high : number)
    {
        for(let i = low + 1 ; i < high + 1 ; i++){
            const key = v.get(i);
            yield;
            let j = i;
            while(j > low && v.gt(v.get(j - 1), key)){
                v.set(j, v.get(j - 1));
                j--;
            }
            v.set(j, key);
            yield;
        }
    }

    function* partition(low : number, high : number)
    {
        const pivot = v.get(high);
        yield
        let j = low;
        for(let i = low; i < high ; i++){
            if(v.lt(v.get(i), pivot)){
                v.swap(i, j);
                j++;
            }
            yield;
        }
        v.swap(j, high);
        return j;
    }

    function* quick_Insert_Sort(low : number, high : number) : Generator<void>{
        while(low < high){
            if((high - low + 1) < 10){
                yield* insertion_sort(low, high);
                break;
            }
            else{
                const pivot = yield* partition(low, high);
                if((pivot - low ) < (high - pivot)){
                    yield* quick_Insert_Sort(low, pivot - 1);
                    low = pivot + 1;
                }
                else{
                    yield* quick_Insert_Sort(pivot + 1, high);
                    high = pivot - 1;
                }
            }
        }
    }
    yield* quick_Insert_Sort(0, v.length() - 1);
}