<template>
    <div class="div">{{new Date(time) | date('yyyy-MM-dd EEE hh:mm:ss.S')}}</div>
</template>
<script>
import Gravity from '@/assets/js/accelerationIncludingGravity';

export default {
    data(){
        return {
            time: 0,
        }
    },
    mounted(){

        Gravity((time) => {
            this.bgc();
            this.time = time;
        })
    },
    methods: {
        bgc(){

            this.$el.style.background = `rgb(${[Math.random() * 255,Math.random() * 255,Math.random() * 255].join(',')})`
        }
    }
}
</script>
<style scoped>
.div{
    width: 100%;
    height: 100%;
    background: green;
}
</style>