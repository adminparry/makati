<template>
    <div>

        <ul class="vueList"  v-for="(item, index) in list" :key="index">
            <li>id: {{ index }}</li>
            <li v-for="item1 in item" :key="item1.url">description: {{ item1.desc }}</li>
            <li v-for="item1 in item" :key="item1.link"><router-link :to="item1.link || '/about/us'">预览</router-link></li>
        </ul>

        
        

    </div>
</template>
<script>
import list from '@/search';

export default {
    data(){
        return {
            list
        }
    }
}
</script>
<style scoped>
.vueList{
    list-style: none;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin: 10px;
}
</style>