<template>
    <div class="box-bg">
        <div class="box-wrap"  @mousedown="down">
            <div class="box-over" :style="{height: height}"></div>
            <div class="box" :style="{height: height, lineHeight: height}" ref="box">
                <div v-for="index in month" :class="index == curIndex ? 'light': index - curIndex <  visibleNumber && index - curIndex > -visibleNumber ? '' : 'visible'" :style="webkitTransform(boxWrapHeightHalf, index)" :key="index">{{index + 1 | zero}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ios',
    data(){
        return {
            boxWrapHeightHalf:0,
            month:[],
            curIndex: 0,
        }
    },
    computed:{
        webkitTransform(){
            return  (boxWrapHeightHalf, index) => ({
                webkitTransform: `translate3d(0, -50%, ${boxWrapHeightHalf}px) rotateX(${-index * this.deg}deg)`,
                webkitTransformOrigin : `center center -${boxWrapHeightHalf}px`
            })
        }
    },
    filters:{
        zero(num){
            return num < 10 ? '0' + num : num; 
        }
    },
    mounted(){
        // 初始化月份
        this.len = 24;
        
        for(let i = 0; i < this.len; i++){
            this.month.push(i)
        }

        // 初始化高度
        this.boxWrapHeightHalf = this.$el.offsetHeight / 2;
        // 角度
        this.deg = 360 / this.len;
        // 可视个数
        this.visibleNumber = 90 / this.deg;
        this.height = this.boxWrapHeightHalf / Math.PI + 'px';
        this.box = this.$refs['box'];
        this.moveX = 0;
        this.moveY = 0;
        this.lastY = 0;
        this.speedY = 0;

        console.log(this.curIndex)
    },
    methods:{
        setTransition(transDur){
            this.box.style.TransitionTimingFunction = `ease-out`;
            this.box.style.WebkitTransitionTimingFunction = `ease-out`;
            this.box.style.TransitionDuration = `${transDur}ms`;
            this.box.style.WebkitTransitionDuration = `${transDur}ms`;
        },
        getRotateX(){
            if(this.box.style.webkitTransform.match(/rotateX\(([-.0-9]+)deg/)){
                return (this.box.style.webkitTransform.match(/rotateX\(([-.0-9]+)deg/)[1] - 0)
            }else{
                return 0
            }
            
        },
        setLight(deg){
            this.month.forEach((item, index) => {

                if(Math.abs(-index*this.deg) - Math.abs(deg) <= this.deg/2 && deg > 0){

                    this.curIndex = index;
                    
                }
            })
            
        },
        down(ev){
            ev.preventDefault()
            const { pageX, pageY } = ev || window.event;
            this.downX = pageX 
            this.downY = pageY + this.getRotateX()

            document.addEventListener('mousemove', this.move);
            document.addEventListener('mouseup', this.up);
            clearInterval(this.timer)
        },
        move(ev){
            ev.preventDefault()
            const { pageX, pageY } = ev || window.event;

            this.moveX = pageX - this.downX;
            this.moveY = this.downY - pageY;

            if(this.moveY > this.deg * this.len + this.deg)this.moveY = this.deg * this.len + this.deg;
            if(this.moveY < 0 - this.deg*2)this.moveY = 0 - this.deg*2;

            this.box.style.webkitTransform = `perspective(0px) translate3d(0, -50%, 0) rotateX(${this.moveY}deg)`;
            this.setLight(this.moveY)
            this.setTransition(0);

            if(this.lastY!=0){
                this.speedY = this.moveY - this.lastY;
            }
            
            this.lastY = this.moveY;

        },
        up(ev){
            ev.preventDefault()
            document.removeEventListener('mousemove', this.move);
            document.removeEventListener('mouseup', this.up);
           
            let min = 0, max = this.deg * (this.len - 1);
    

            clearInterval(this.timer)
            this.timer = setInterval(() => {
                

                let cur = this.getRotateX();
                
                if(cur < min)cur = min;
                if(cur > max)cur = max;

                this.speedY *= .9;
                cur += this.speedY;
                this.box.style.webkitTransform = `perspective(0px) translate3d(0, -50%, 0) rotateX(${cur}deg)`;
                // console.log(cur, this.curIndex)
                this.setLight(cur);
                if(Math.abs(this.speedY) < 1){
                    clearInterval(this.timer);
                    

                    // this.box.addEventListener('webkitTransitionEnd', () => {
                        this.setTransition(300);
                        this.box.style.webkitTransform = `perspective(0px) translate3d(0, -50%, 0) rotateX(${this.curIndex*this.deg}deg)`;
                    // })
                    
                    return;
                }
            }, 30)

            
            // this.setTransition(600);

            // if(this.speedY == 0){
                
            //     this.box.style.webkitTransform = `perspective(0px) translate3d(0, -50%, 0) rotateX(${this.curIndex*this.deg}deg)`;

            // }else{
            //     this.box.style.webkitTransform = `perspective(0px) translate3d(0, -50%, 0) rotateX(${cur }deg)`;
            // }
            // this.setLight(cur);
            // this.box.addEventListener('webkitTransitionEnd', () => {
                

            //     console.log(this.curIndex, 'asdf')
            //     this.box.style.webkitTransform = `perspective(0px) translate3d(0, -50%, 0) rotateX(${this.curIndex*this.deg}deg)`;
            // })
           
            
            
            
        }
    }

}
</script>
<style scoped>
.box-bg{
    user-select: none;
    height: 100%;
    background-color: #ddd;
}
.box-wrap{
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    -webkit-mask-box-image: -webkit-linear-gradient(bottom,transparent,transparent 5%,#fff 20%,#fff 80%,transparent 95%,transparent);
}
.box-over{
    position: absolute;
    width: 100%;
    top: 50%;
    height: 36px;
    border-top: solid 1px rgba(0,0,0,.1);
    border-bottom: solid 1px rgba(0,0,0,.1);
    transform: translate3d(0, -50%, 0);
}
.box{

    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    position: absolute;
    width: 100%;

    top: 50%;

    transform: perspective(0px) translate3d(0, -50%, 0);

}
.box div{
    /* 占整个宽度 */
    width: 100%;
    height: 100%;

    /* 让子元素去中间 */
    text-align: center;
    vertical-align: middle;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
    top: 50%;
    font-weight: bold;
    color: #888;
}
.box div.light{
    color:black;
}
.visible{
    visibility: hidden;
}
</style>