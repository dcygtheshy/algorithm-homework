class Node {
    constructor(value, bar, size) {
        this.value = value;
        this.bar = bar;
        this.size = Number(size);
        
        this.setBarHeight();

    }
    
    setBarColor(color) {
        this.bar.style.backgroundColor = color;
    }
    
    get val(){
        return this.value;
    }

    setBarHeight() {
        let height = 100 *(this.value) / (this.size + 1);

        this.bar.style.height = `${height}%`;
    }

    setValue() {
        this.bar.setAttribute("value", this.value);
        this.setBarHeight();
    }




};
