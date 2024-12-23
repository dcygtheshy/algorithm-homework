let arrayContainer = document.querySelector(`div.array-container`);//获取用于显示数组条形图的容器元素。
let arrLength = document.querySelector(`input[type="number"]`).value;//获取用户输入的数组长度。
let arrSubmit = document.querySelector(`input[type="submit"]`);//获取提交按钮，用于生成新的随机数组。
let sortName = document.querySelectorAll(`input[type="button"].sort-btn`);//获取所有排序算法按钮，用户可以选择不同的排序算法进行可视化
let time = 100;//设置动画延迟时间，控制排序过程的速度。
let arr = new ArrayList();//初始化一个 ArrayList 对象，用于存储和操作数组元素。

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

function createBars(value, size) {//创建表示数组元素的条形图，并将其添加到容器中。
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

async function saveHistory(algorithm, arraySize, executionTime) {
    try {
        const response = await fetch('history.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                algorithm: algorithm,
                array_size: arraySize,
                execution_time: executionTime
            })
        });
        const result = await response.json();
        if (result.success) {
            console.log('历史记录保存成功:', result.message);
        } else {
            console.error('历史记录保存失败:', result.message);
        }
    } catch (error) {
        console.error('请求失败:', error);
    }
}


// 添加一个方法来测量和记录排序算法的执行时间
async function measureExecutionTime(sortFunction, algorithmName, arr, ...args) {
    const start = performance.now(); // 开始计时
    await sortFunction(arr, ...args); // 执行排序
    const end = performance.now(); // 结束计时
    const elapsedTime = (end - start).toFixed(2); // 计算耗时（毫秒）

    console.log(`Execution time for ${algorithmName}: ${elapsedTime} ms`);
    alert(`${algorithmName} 排序耗时: ${elapsedTime} 毫秒`);

    // 保存历史记录
    await saveHistory(algorithmName, arr.size, elapsedTime);
}



(function(){

    // populate array
    arr.populateArray(arrLength);

    for(input of sortName) {
        input.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(arr.size)

            if(e.target.name == "quicksort") {
                //await quicksort(arr, 0, arr.size - 1);
                await measureExecutionTime(quicksort, "quicksort", arr, 0, arr.size - 1);
            }
            else if(e.target.name == "insertionsort") {
                //await insertionSort(arr, arr.size);
                await measureExecutionTime(insertionSort, "insertionsort", arr, arr.size);
            }
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