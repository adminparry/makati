<template>
  <div class="static-container">
    <router-view  />
  </div>
</template>
<style scoped>
.static-container {
  height: 100vh;
  width: 100vw;

}
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



