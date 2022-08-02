class Snack {
    // 定义蛇头
    header: HTMLElement;
    // 定义蛇的身体部分
    elemtent: HTMLElement;

    // shack只是一个容器，其实控制蛇移动的还是这个容器里面蛇的每个div元素
    // 而且蛇的头部，也就是第一个div元素很重要要找到
    constructor() {
        this.header = document.querySelector("#snack > div") as HTMLElement;
        this.elemtent = document.getElementById("snack") as HTMLElement;
    }

    getHeaderXY() {
        // 获取蛇头的xy坐标
        return [this.header.offsetLeft, this.header.offsetTop]
    }

    setHeaderXY(x: number, y: number) {
        // 设置蛇头的坐标
        this.header.style.left = x + 'px';
        this.header.style.top = y + 'px';
    }

    setHeaderX(x: number) {
        this.header.style.left = x + 'px';
    }

    setHeaderY(y: number) {
        this.header.style.top = y + 'px';
    }

    // 增加蛇的身体的方法:当蛇吃到食物之后
    addBody() {
        const body = document.createElement("div");
        this.elemtent.appendChild(body);
    }

    // 单一职责原则：所以蛇的移动要在蛇类内部
    moveBody() {
        // 将蛇的容器中每一个div按照移动到前一个div的位置执行
        const bodys = this.elemtent.children
        for (let bodyIndex = bodys.length - 1; bodyIndex > 0; bodyIndex--) {
            const currBody = bodys[bodyIndex] as HTMLElement;
            // 获取前面身体的位置
            let preX = (bodys[bodyIndex - 1] as HTMLElement).offsetLeft
            let preY = (bodys[bodyIndex - 1] as HTMLElement).offsetTop
            // 设置当前身体的坐标
            currBody.style.left = preX + "px";
            currBody.style.top = preY + "px"
        }
    }

    // 监测蛇头是否碰到了身体
    checkPeng(): boolean {
        const bodys = this.elemtent.children
        for (let bodyIndex = bodys.length - 1; bodyIndex > 0; bodyIndex--) {
            const currBody = bodys[bodyIndex] as HTMLElement;
            if (this.header.offsetLeft === currBody.offsetLeft && this.header.offsetTop === currBody.offsetTop) {
                return true
            }
        }
        return false
    }
}


export default Snack
