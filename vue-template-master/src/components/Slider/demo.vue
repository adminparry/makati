<template>
    <Demo>
        <div class="div">1</div>
            <div class="div">2</div>
            <div class="div">3</div>
            <div class="div">4</div>
    </Demo>

</template>


<script>
import Demo from './index';

export default {
    components: {
        Demo
    }
}
</script>
<style scoped>
.div{
    display: inline-block;
    background: green;
    text-align: center;
    line-height: 100px;
    height: 100px;
    width: 100%;
    font-size: 12px;
    border: 1px solid #ccc;
}
</style>