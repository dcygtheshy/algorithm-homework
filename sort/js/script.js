let arrayContainer = document.querySelector(`div.array-container`);
let arrLength = document.querySelector(`input[type="number"]`).value;
let arrSubmit = document.querySelector(`input[type="submit"]`);
let sortName = document.querySelectorAll(`input[type="button"].sort-btn`);
let time = 100;
let arr = new ArrayList();

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function quicksort(arr, left, right){
    if(left >= right) return;
    let pivot = await partition(arr, left, right);
    
    arr[pivot].setBarColor("white");

    await Promise.all([
        quicksort(arr, left, pivot - 1),
        quicksort(arr, pivot + 1, right)
    ]);
}

async function partition(arr, left, right) {
    let pivotIndex = left; 
    let pivotValue = arr[right].val;

    for(let i = left; i < right; i++) {
        if(arr[i].val < pivotValue) {
            await arr.setPivot(pivotIndex, '#a0a0a0');
            arr.swapBar(i, pivotIndex);
            pivotIndex++;
        }
    }
    
    arr.swapBar(pivotIndex, right);
    return pivotIndex;
}

async function insertionSort(arr, n) {
    if(n < 1) return;
    
    let last = arr[n-1].val;
    let j = n-2;
    
    await insertionSort(arr, n-1);
    

    while( j >= 0 ) {    
        if(arr[j].val > last)
            await arr.swapBar(j, j+1);
        //arr[j+1] = arr[j];
        j--;
    }
    arr[j+1].val = last;
}

function createBars(value, size) {
    let bar = document.createElement('div');
    let val = document.createAttribute("value");
    val.value = value;
    bar.className = "array-bar";
    bar.setAttributeNode(val);

    arrayContainer.appendChild(bar);
    return bar;
}

function truncateArray(){
    arr = new ArrayList();
    arrayContainer.innerHTML = '';
}

(function(){

    // populate array
    arr.populateArray(arrLength);

    for(input of sortName) {
        input.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(arr.size)

            if(e.target.name == "quicksort") await quicksort(arr, 0, arr.size - 1);
            else if(e.target.name == "insertionsort") await insertionSort(arr, arr.size);
            else {console.log(e.target.name);}
        })
    };

    arrSubmit.addEventListener("click", e => {
        e.preventDefault();
        const newSize = document.querySelector(`input[type="number"]`).value;
        truncateArray();
        arr.populateArray(newSize);
    })

    
})();