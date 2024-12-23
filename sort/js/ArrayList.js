class ArrayList extends Array {
    constructor(element) {
        super();
        this.element = element;
    }
    get size() {
        return this.length;
    }

    isEmpty() {
        return this.size === 0;
    }
    
    populateArray(size){
        if(!arr.isEmpty()) {
            truncateArray();
        }
        let randNum;
    
        for(let i = 0; i < size; ++i) {
            randNum = 1 + Math.floor(Math.random() * size);
            let bar = createBars(randNum , size);
            let height = ((randNum) / (size * 0.01));
            
            arr[i] = new Node(randNum, bar, size);
        }
    }


    swapNodes(a, b) {
        [this[a].value, this[b].value] = [this[b].value, this[a].value];
        this[a].setValue();
        this[b].setValue();
    }

    async swapBar(a, b) {
        this[a].setBarColor("#802B9E");
        this[b].setBarColor("#802B9E");
        this.swapNodes(a, b);
        await sleep(1000);
        this[a].setBarColor("#C242F0");
        this[b].setBarColor("#C242F0");
    }

	async setPivot(index, color){ // Helper method to set a pivot of desired color, await and then reset to white.
		this[index].setBarColor(color);
		await sleep(10);
		//while(paused) await sleep(getSpeed());
		this[index].setBarColor("white");
	}

}