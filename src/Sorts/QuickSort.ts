import VisualArray from "../Components/VisualArray/VisualArray";
export default function* QuickSort(v : VisualArray){
    function* partition(low : number, high : number){
        const pivot = v.get(high); // pivot
        yield;
        let i = low - 1;
        for (let j = low; j < high ; j++) {
            // If current element is smaller than the pivot
            if (v.lt(v.get(j), pivot)) {
                i++; // increment index of smaller element
                v.swap(i, j);
            }
            yield;
        }
        v.swap(i + 1, high);
        yield;
        return i + 1;
    }
    function* quick_sort(low : number, high : number) : Generator<void>
    {
        if (low < high) {
            /* pi is partitioning index, arr[p] is now
            at right place */

            /* Partitioning */
            const pivot = yield* partition(low, high);
            // Separately sort elements before
            // partition and after partition
            yield* quick_sort(low, pivot - 1);
            yield* quick_sort(pivot + 1, high);
        }
    }
    yield* quick_sort(0, v.length() - 1);
}