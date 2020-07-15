function heap_root(input, id, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max]) {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        swap(id, i, max);
        heap_root(input, id, max);
    }
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}

function heapSort(input, id) {

    array_length = input.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
        heap_root(input, id, i);
    }

    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        swap(id, 0, 1);

        array_length--;


        heap_root(input, id, 0);
    }
}

export {
    heapSort
};