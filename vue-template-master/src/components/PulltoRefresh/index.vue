<template>
    <div class="pull-down-container" @mousedown="touchStart" @mousemove="touchMove" @mouseup="touchEnd" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="pull-down-header" ref="header" :style="{'height': pullDown.height + 'px', 'transition': `${ pullDown.transition }`}">
            <div class="pull-down-content" :style="pullDownContentStyle">
                <i class="pull-down-content-icon" ref="icon" :style="iconStyle" :class="iconClass"></i>
                <span class="pull-down-content-label">{{ iconLabel }}</span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    // 请到 https://github.com/adminparry/makati/blob/master/pull-to-refresh 去拿图片
    export default {
        props: {
            onRefresh: {
                type: Function,
                default: () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(true);
                        }, 1000)
                    });
                }
            },
            dis: {
                type: Object,
                default: () => {
                    return {
                        // 下拉最大距离
                        maxDis: 180,
                        // 超过多少触发回调
                        triggerDis: 80,
                        // 正在刷新高度
                        loadingDis: 60,
                    }
                }
            },
            config: {
                type: Object,
                default: function() {
                    return {
                        ANIMATION: 'height .2s ease',
                        LABELSERR: "数据异常",
                        LABELSDOWN: "下拉刷新数据",
                        LABELSTRIGGER: "松开刷新数据",
                        LABELSREF: "数据刷新中..."
                    };
                }
            }
        },
        data() {
            return {
                
                downStart: {
                    x: 0,
                    y: 0,
                },
                move: {
                    x: 0,
                    y: 0,
                },
                upEnd: {
                    x: 0,
                    y: 0,
                },
                iconLabel: "",
                iconStyle:{
                    transform: "rotate(180deg)",
                },
                pullDown: {
                    
                    status: 0,
                    height: 0,
                    msg: '',
                    transition: ''
                },
                canPull: false
            };
        },
        
        methods:{
            
            touchStart(e){

                  e.preventDefault();
                const { type, pageX, pageY, touches } = e;
                if('mousedown' == type){
                    this.downStart = {
                        x: pageX,
                        y: pageY
                    }
                }else if('touchstart' == type){
                    this.downStart ={
                        x: touches.item(0).pageX,
                        y: touches.item(0).pageY
                    }

                }
                const el = this.$el;

                this.iconLabel = this.config.LABELSDOWN;

                if (el.scrollTop === 0) {
                    this.canPull = true;
                } else {
                    this.canPull = false;
                }
                

            },
            degIcon(xDis, yDis){

                if(yDis > this.dis.maxDis)yDis = this.dis.maxDis;

                this.pullDown.height = yDis;
                // 如果超过触发等于触发的角度
                let deg = Math.min(( yDis / this.dis.triggerDis) * 180, 180);
                if(deg >= 180){
                    this.iconLabel = this.config.LABELSTRIGGER;
                }else{
                    this.iconLabel = this.config.LABELSDOWN;
                }
                this.iconStyle = { transform: `rotate(${ deg }deg)`}
            },
            touchMove(e){
                e.preventDefault();


                if (!this.canPull)  return;

                const { type, pageX, pageY, touches } = e;


                if('mousemove' == type){
                    this.move = {
                        x: pageX,
                        y: pageY
                    }
                }else if('touchmove' == type){
                    this.move ={
                        x: touches.item(0).pageX,
                        y: touches.item(0).pageY
                    }
                }
                const el = this.$el;
                const icon = this.$refs["icon"];

                if (!this.canPull) {
                    return;
                }
                
                let xDis = this.move.x - this.downStart.x;
                let yDis = this.move.y - this.downStart.y;
                // 反方向时候不处理
                // if(xDis < 0 || yDis < 0)return;
                this.degIcon(xDis, yDis);

            },
           
            async resetStatus(){
                
                const pullDownHeader = this.$refs['header'];

                this.pullDown.height = 0;
                this.pullDown.transition = this.config.ANIMATION;
                pullDownHeader.addEventListener('transitionend', () => {
                    this.pullDown.transition = '';
                });
                pullDownHeader.addEventListener('webkitTransitionEnd', () => {
                    this.pullDown.transition = '';
                });

                if(this.iconLabel == this.config.LABELSTRIGGER){

                    this.iconLabel = this.config.LABELSREF;
                    this.pullDown.height = this.dis.loadingDis;

                    const ret = await this.onRefresh();
                    if(ret){
                        this.iconLabel = '';
                        this.pullDown.height = 0;
                    }else{
                        this.iconLabel = this.config.LABELSERR;
                    }
                }
            },
            touchEnd(e){
                e.preventDefault();
               this.canPull = false;
                const el = this.$el;
                const icon = this.$refs["icon"];

                this.resetStatus();
                    return;

                  

            },
        },
        computed: {
            
            iconClass() {
                // icon of pull down

                if (this.iconLabel == this.config.LABELSREF) {
                    return 'pull-down-refresh';
                } else if (this.iconLabel === this.config.LABELSERR) {
                    return 'pull-down-error';
                }
                return '';
            },
            pullDownContentStyle() {
                return {
                    bottom: (this.config.pullDownHeight - 40) / 2 + 'px'
                };
            }
        },
    
        
    };
</script>

<style scoped>

    .pull-down-container {
        height: 100%;
        max-height: 100%;
        overflow-y: auto;
    }
    .pull-down-header {
        width: 100%;
        height: 0px;
        overflow: hidden;
        position: relative;
        background-color: #2c3133;
    }
    .pull-down-content {
        position: absolute;
        max-width: 90%;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        height: 40px;
        color: #d5d5d5;
        text-align: center;
        border-left: 20px solid transparent;
        font-family: "noto-thin", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
       
    }

    .pull-down-content-icon {
        float: left;
        height: 20px;
        width: 20px;
        margin-top: 10px;
        margin-left: -20px;
        background: url(./down-arrow.png) no-repeat center center;
        background-size: 20px 20px;
        
    }
    
    
    .pull-down-content-label {
        float: left;
        height: 20px;
        line-height: 20px;
        margin-left: 10px;
        margin-top: 10px;
    }
    /* 加载错误 */
    .pull-down-content-icon.pull-down-error {
        background: url(./error-icon.png) no-repeat center center;
        background-size: 20px 20px;
    }
    /* 正在加载 */
    .pull-down-content-icon.pull-down-refresh {
            background: url(./refresh-icon.png) no-repeat center center;
            background-size: 20px 20px;
            animation: rotate 2s infinite;
            animation-timing-function: linear;
    }
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>