<template>
  <div class="star" :class="starType">
      <span class="star-item" v-for="starItem in itemClasses" :class="starItem"></span>
  </div>
</template>
<script type="text/ecmascript-6">
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      //下面的这中算法，非常的简单，将特殊的放在前面，简单直接放在后面，省略了很多的If else的结构，利用直接的模式来实现，简化代码
      //我们星星的颜色，整个，半个，无，将其放进一个数组中，我们直接调用starItem,并且绑定class来显示相应的样式
      let result = [];
      let score = Math.floor(this.score * 2) / 2; //这个部分是将小于0.4的小数部分给删掉，将大于0.5的小数部分，进1。所得到的结果，不是整数，就是带有0.5的数字。
      let hasDecimal = score % 1 !== 0;//%取余数，得到的答案是整数，
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {//这个地方好像就是必须这样，要不然就显示不出来
        result.push(CLS_ON);
      }//先检测整数部分，将整数部分放在前面
      if (hasDecimal) {
        result.push(CLS_HALF);
      }//如果有半颗星，则将它放在其次
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }//接下来就是空白的星星，放在最后面，上面的步骤中省略了很多的If else 
      return result;//最后将我们的星星数组的样式给返回
    }
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl';

.star {
      font-size: 0;

      .star-item {
            display: inline-block;
            background-repeat: no-repeat;
      }

      &.star-48 {
            .star-item {
                  width: 20px;
                  height: 20px;
                  margin-right: 22px;
                  background-size: 20px 20px;

                  &:last-child {
                        margin-right: 0;
                  }

                  &.on {
                        bg-image: 'star48_on';
                  }

                  &.half {
                        bg-image: 'star48_half';
                  }

                  &.off {
                        bg-image: 'star48_off';
                  }
            }
      }

      &.star-36 {
            .star-item {
                  width: 15px;
                  height: 15px;
                  margin-right: 6px;
                  background-size: 15px 15px;

                  &:last-child {
                        margin-right: 0;
                  }

                  &.on {
                        bg-image: 'star36_on';
                  }

                  &.half {
                        bg-image: 'star36_half';
                  }

                  &.off {
                        bg-image: 'star36_off';
                  }
            }
      }

      &.star-24 {
            .star-item {
                  width: 10px;
                  height: 10px;
                  margin-right: 3px;
                  background-size: 10px 10px;

                  &:last-child {
                        margin-right: 0;
                  }

                  &.on {
                        bg-image: 'star24_on';
                  }

                  &.half {
                        bg-image: 'star24_half';
                  }

                  &.off {
                        bg-image: 'star24_off';
                  }
            }
      }
}
</style>


