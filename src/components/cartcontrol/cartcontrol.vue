<template>
  <div class="cartcontrol">
        <div v-show="food.count>0" @click.stop.prevent="disCount" class="discount icon-remove_circle_outline"></div>
        <div v-show="food.count>0"   class="num">{{food.count}}</div>
        <div @click.stop.prevent="addCount" class="addcount icon-add_circle"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import vue from 'vue';
export default {
      props: {
            food: {
                  type: Object
            }
      },
      methods: {
            addCount(event) {
                  if (!event._constructed) {
                  return;
                  }
                  if(!this.food.count){
                        //this.food.count=1;这句不能要,要不然就不来不
                        vue.set(this.food,'count',1);//这种方法可以用
                        //this.food.set('count',1);这种方法不可以用
                  }else{
                        this.food.count++;
                  };
            },
            disCount(event) {
                  if(!event._constructed){
                        return;
                  };
                  if(this.food.count){
                        this.food.count--;
                  } ;
            }
      }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
      color:rgb(0,160,220)
      line-height:24px
      //font-size:0
      vertical-align :top
      .discount,.addcount
            display:inline-block
            font-size:24px
      .num
            display:inline-block
            font-size:10px
            color:rgb(147,153,159)
            vertical-align :top
            width:24px
            text-align:center

</style>


