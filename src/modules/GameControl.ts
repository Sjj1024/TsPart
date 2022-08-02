import Foods from "./food";
import Pannel from "./pannel";
import Snack from "./snack";


// 总体的控制类，控制蛇的移动和面板分数增加等
class GameControl {
    food: Foods
    pannel: Pannel
    snack: Snack
    // 监听蛇的运动方向
    direction: string = 'ArrowRight'
    // 监听蛇的存活状态
    isLive: boolean = true

    // 构造函数
    constructor() {
        this.food = new Foods()
        this.pannel = new Pannel()
        this.snack = new Snack()
        this.init()
    }

    // 键盘按下的事件
    init() {
        document.addEventListener("keydown", this.keyDownListener.bind(this))
        // 让蛇开始移动
        this.run()
    }

    // 监听键盘按下事件
    keyDownListener(event: KeyboardEvent) {
        // console.log("键盘按下事件:" + event.key);
        if ((this.direction === "ArrowDown" && event.key !== "ArrowUp")
            || (this.direction === "ArrowUp" && event.key !== "ArrowDown")
            || (this.direction === "ArrowLeft" && event.key !== "ArrowRight")
            || (this.direction === "ArrowRight" && event.key !== "ArrowLeft")) {
            this.direction = event.key;
        }
    }

    // 控制蛇移动的放法
    //键盘按下事件:ArrowUp
    // bundle.js:2 键盘按下事件:ArrowDown
    // bundle.js:2 键盘按下事件:ArrowLeft
    // bundle.js:2 键盘按下事件:ArrowRight
    run() {
        // 先获取蛇头的坐标
        let [sx, sy] = this.snack.getHeaderXY()
        switch (this.direction) {
            case "ArrowUp":
                console.log("向上移动");
                sy -= 10
                break;
            case "ArrowDown":
                console.log("向下移动");
                sy += 10
                break;
            case "ArrowLeft":
                console.log("向左移动");
                sx -= 10
                break;
            case "ArrowRight":
                sx += 10
                console.log("向右移动");
                break;
            default:
                break;
        }
        // 检查食物是否吃到
        this.checkFood(sx, sy)

        // 重置蛇头的坐标
        // 定时出发: 因为这个定时会持续不断的触发run方法，所以setTimeout会一直执行
        /* 根据蛇头的边界判断是否继续执行 */
        if (sx >= 300 || sx < 0 || sy >= 300 || sy < 0) {
            console.log("蛇撞死了");
            this.isLive = false
            return
        }
        // 让蛇的身体移动
        this.snack.moveBody()
        // 再设置蛇头的位置
        this.snack.setHeaderX(sx)
        this.snack.setHeaderY(sy)
        // 检查蛇头是否和身体碰撞
        const resPeng = this.snack.checkPeng()
        if (!resPeng) {
            this.isLive && setTimeout(() => {
                this.run()
            }, 300 - (this.pannel.level - 1) * 30)
        } else {
            console.log("蛇身体碰到死了");
        }
    }

    // 定义一个检查蛇是否吃到食物的方法
    checkFood(sx: number, sy: number) {
        if (sx === this.food.X && sy === this.food.Y) {
            console.log("蛇吃到食物了");
            // 改变食物坐标
            this.food.change()
            // 让面板分数增加1
            this.pannel.updateScore()
            // 蛇的身体增加一节
            this.snack.addBody()
        }
    }
}


export default GameControl