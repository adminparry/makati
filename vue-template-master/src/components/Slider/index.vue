<template>
    <div class="slider" >
        <div class="group" ref="group" @touchstart.prevent="touchstart" @mousedown.prevent="touchstart" @touchmove.prevent="touchmove" @mousemove.prevent="touchmove" @mouseup.prevent="touchend" @touchend.prevent="touchend">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: 'Slider',
    data(){
        return {
            initIndex: 1,
            downDis:{
                disabled: false,
                x:0,y:0
            },
            moveDis:{
                disabled: true,
                x:0,y:0
            },
            lastDis:{
                offsetLeft:0,
                x:0,y:0
            }
        }
    },
    props:{
        auto: {
            type: Boolean,
            default: () => {
                return true;
            }
        },
        autoTime: {
            type: Number,
            default: () => {
                return 3000;
            }
        },
        transDuration: {
            type: Number,
            default: () => {
                return 600
            }
        }
    },
    computed(){

    },
    mounted(){
        let groupElement = this.$refs['group'];
        let len = groupElement.children.length;

        this.groupElement = groupElement;
        this.width = groupElement.firstElementChild.offsetWidth;
        if(!groupElement)return;

        let first = groupElement.firstElementChild;
        let last = groupElement.lastElementChild;
        groupElement.appendChild(first.cloneNode(true));
        groupElement.insertBefore(last.cloneNode(true), first);
        if(this.initIndex > len)this.initIndex = len;
        if(this.initIndex < 1)this.initIndex = 1;
        

        groupElement.style.WebkitTransform = `translate3d(${ 0 - this.initIndex * first.offsetWidth }px, 0, 0)`;

        
        this.autoPlay(this.auto)

        this.groupElement.addEventListener('webkitTransitionEnd', () =>{
            
            this.autoPlay(this.auto)
            console.log('webkitTransitionEnd')
            this.downDis.disabled = false;
            if(this.initIndex >= len + 1){
                this.initIndex = 1
               
                this.setTrranslate({
                    el: this.groupElement,
                    transDur: 0,
                    translateX: - first.offsetWidth
                })
                
            }else if(this.initIndex <= 0){
                this.initIndex = len;

                this.setTrranslate({
                    el: this.groupElement,
                    transDur: 0,
                    translateX: - first.offsetWidth * len
                })
                
            }
        })
    },
    methods: {
        autoPlay(isAuto){
            if(!isAuto)return;
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.initIndex++;
                this.setTrranslate({
                    el: this.groupElement,
                    transDur: this.transDuration,
                    translateX: -this.initIndex * this.width
                })
            }, this.autoTime)
        },
        setTrranslate({el, transDur, translateX }){
            el.style.Transform = `translate3d(${ translateX }px, 0, 0) `;
            el.style.WebkitTransform = `translate3d(${ translateX }px, 0, 0) `;
            el.style.TransitionTimingFunction = `cubic-bezier(0.165, 0.84, 0.44, 1)`;
            el.style.WebkitTransitionTimingFunction = `cubic-bezier(0.165, 0.84, 0.44, 1)`;
            el.style.TransitionDuration = `${transDur}ms`;
            el.style.WebkitTransitionDuration = `${transDur}ms`;
            
        },
        getTranslate(){
            let translateX = this.groupElement.style.WebkitTransform.match(/translate3d\(([-\.\d]*)px/)[1];

            if(!translateX){
                translateX = 0;
            }else{
                translateX = Number(translateX)
            }
            return translateX;
        },
        touchstart(ev){
            clearInterval(this.timer)
            if(this.downDis.disabled)return;

            const { type, pageX, pageY, touches, target } = ev;
            

            this.downDis = {
                x: (pageX ? pageX : touches.item(0).pageX) - this.getTranslate(),
                y: (pageY ? pageY : touches.item(0).pageY) ,
                left:  pageX ? pageX : touches.item(0).pageX

            }
            this.moveDis.disabled = false;
        },
        touchmove(ev){

            if(this.moveDis.disabled)return;
            const { type, pageX, pageY, touches } = ev;
            this.moveDis = {
                x: pageX ? pageX : touches.item(0).pageX,
                y: pageY ? pageY : touches.item(0).pageY
            }
            let xabs = this.moveDis.x - this.downDis.x;


            this.setTrranslate({
                el: this.groupElement,
                transDur: 0,
                translateX: xabs
            })
            this.lastDis.x = this.moveDis.x - this.downDis.left;
        },
        touchend(){
            if(this.moveDis.disabled)return;
            this.moveDis.disabled = true;
            this.downDis.disabled = true;

           
            let harf =  this.width / 30 ;

            
            if( -harf > this.lastDis.x){
                this.initIndex++;  
            }else if(harf < this.lastDis.x){
                this.initIndex--;
            }else{}
            
            this.setTrranslate({
                el: this.groupElement,
                transDur: this.transDuration,
                translateX: -this.initIndex * this.width
            })
        }
    }
}
</script>
<style lang="less">
.slider {
    overflow: hidden;
    
    position: relative;
    
    cursor: move;
    .group{
        font-size: 0;
        white-space: nowrap;
    }
    
}
</style>