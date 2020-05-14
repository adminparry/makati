<template>
    <div class="github-callback">
        <div>
          <p>{{'success' | capitalize }}</p>
          <p>{{ 234324324234.88 | number3 }}</p>
          <p><router-link to="/">返回</router-link></p>
        </div>
    </div>
</template>
<style>
.github-callback{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>

export default {
  
  created() {
    const { code } = this.$route.query;
    this.sendCode(code);
  },
  methods: {
    sendCode(code) {

      this.$store.dispatch('app/setUserInfo', {user: '很好你已经看了这个示例了'});
     
    }
  }
};
</script>
