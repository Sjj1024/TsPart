class Foods {
    // 定义一个属性，获取元素
    element: HTMLElement;

    // 获取元素
    constructor() {
        this.element = document.getElementById("food") as HTMLElement
    }

    // 改变食物坐标
    change() {
        const top = Math.floor(Math.random() * 29) * 10
        const left = Math.floor(Math.random() * 29) * 10
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
    }

    // 获取食物坐标的方法
    get X() {
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }

    // 返回值为元组的坐标
    getPosXY(): [number, number] {
        return [this.element.offsetLeft, this.element.offsetTop]
    }
}


export default Foods