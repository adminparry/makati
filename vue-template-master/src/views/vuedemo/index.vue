<template>
    <div>
        <p class="intriduce">日历</p>
        <div>
            <Calendar />
        </div>
        <p class="intriduce">pull-to-refresh</p>
        <PulltoRefresh>
            <ul class="pull-list">
                <li>这是个列表</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </PulltoRefresh>
        <p class="intriduce">水波纹</p>
        <Water />
        
    </div>
</template>
<script>
import PulltoRefresh from '@/components/PulltoRefresh'
import Water from '@/components/Water';
import Calendar from '@/components/Calendar';

export default {
    components:{
        PulltoRefresh,
        Water,
        Calendar,
    }
}
</script>
<style scoped>
.intriduce{
    background: black;
    text-align: center;
    color: white;
}
.pull-list li{
    text-align: center;
}
.pull-list li:nth-child(odd) {
    background: #ccc;
}
</style>