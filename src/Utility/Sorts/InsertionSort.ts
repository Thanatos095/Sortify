import VisualArray from "../../Components/VisualArray/VisualArray";
export default function* InsertionSort(v : VisualArray){
    for (let i = 1; i < v.length(); i++) 
    {  
        let key = v.get(i);  
        yield;
        v.clearStates();
        let j = i - 1;
        while (j >= 0 && v.gt(v.get(j), key)) 
        {  
            v.set(j + 1, v.get(j))
            j = j - 1;  
            yield;
            v.clearStates();
        }
        v.set(j + 1, key);
        yield;
        v.clearStates();
    }  
}