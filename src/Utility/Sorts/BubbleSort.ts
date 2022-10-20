import VisualArray from "../../Components/VisualArray/VisualArray";
export default function* BubbleSort(v : VisualArray){
    for (let i = 0; i < v.length() - 1; i++)
    {
        for (let j = 0; j < v.length() - i - 1; j++)
        {
            if (v.gt(v.get(j), v.get(j + 1)))
            {
                v.swap(j, j + 1);
            }

        yield;
        }
    }
}