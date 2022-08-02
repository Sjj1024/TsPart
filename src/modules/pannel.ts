class Pannel {
    // 定义分数和等级的元素
    scoreElement: HTMLElement;
    levelElement: HTMLElement;

    // 可以在构造函数里使用public修饰符添加类属性，同时设置默认值
    constructor(public score = 0, public level = 0, public maxLevel = 10) {
        // as 是断言，如果前面的元素存在，就将前面的元素转换为后面的类型
        this.scoreElement = document.getElementById("score") as HTMLElement;
        // 加上叹号修饰符表示此元素不可能为空
        this.levelElement = document.getElementById("level") as HTMLElement;

    }

    // 更新分数
    updateScore() {
        this.score += 1
        this.scoreElement.innerHTML = this.score + '';
        // 每10分升一级
        if (this.score % 10 === 0) {
            this.updateLevel()
        }
    }

    // 更新等级
    updateLevel() {
        // 等级最高是10级，不能再高了
        if (this.level < this.maxLevel) {
            this.level += 1
            this.levelElement.innerHTML = this.level + '';
        }
    }
}

export default Pannel