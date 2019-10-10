<template>
  <div id='app'>
    <v-header :seller="seller"></v-header>
    <div class="bar border-1px">
      <div class='bar-item'><router-link to="/goods">商品</router-link></div>
      <div class='bar-item'><router-link to="/ratings">评价</router-link></div>
      <div class='bar-item'><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from "components/header/header.vue";
var ERR_OK = 0;
export default {
  name: "app",
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get("/api/seller").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller=response.data;
      }
    });
  },
  components: {
    "v-header": header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.styl';

.bar {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  // border-bottom:1px solid #ccc;
  border-1px(rgba(7, 17, 27, 0.1));
  cursor:pointer;
  .bar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;

    &>a {
      display: block;

      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
