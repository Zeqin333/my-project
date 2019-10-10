<template>
      <div class="shopcart-wrapper">
            <div class="content" @click="toggleList">
                  <div class="content-left">
                        <div class="logo-wrapper">
                              <div class="logo" :class="{'heightlight':totalCount>0}" >
                                    <i class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></i>
                              </div>
                              <div v-show="totalCount>0" class="num">
                                   {{totalCount}}
                              </div>
                        </div>
                        <div class="price" :class="{'heightlight':totalCount>0}">
                              <span>
                                    ￥{{totalPrice}}
                              </span>
                        </div>
                        <div class="desc">
                              <span>另外需要配送费￥{{deliveryPrice}}元</span>
                        </div>
                  </div>
                  <div class="content-right" :class="payClass">
                        <div class="price" >
                              {{payDesc}}
                        </div>
                  </div>
            </div>
            <div v-show="listshow" class="selectList-wrapper">
                  <div class="selectList">
                        <div class="list-header">
                              <span class="desc">购物车</span>
                              <span class="clear" @click="clearList">清空</span>
                        </div>
                        <div class="list-wrapper" ref="listWrapper">
                              <ul class="list">
                                    <li v-for="food in selectFoods" class="food-item border-1px">
                                          <div class="name">{{food.name}}</div>
                                          <cartcontrol class="cartcontrol" :food="food"></cartcontrol>
                                          <div class="price">￥{{food.price*food.count}}</div>
                                    </li>
                              </ul>
                        </div>
                  </div>
            </div> 
      </div>         
</template>
<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import cartcontrol from 'components/cartcontrol/cartcontrol';
export default {
      props:{
            deliveryPrice:{
                  type:Number,
                  default:0
            },
            minPrice:{
                  type:Number,
                  default:0
            },
            selectFoods: {
                  type: Array,
                        default() {
                              return [];
                        }
            }
      },
      data() {
            return {
                  fold:true
            }
      },
      computed: {
            totalPrice() {
                  let totalPrice=0;
                  this.selectFoods.forEach( (food) => {
                        totalPrice+=food.price*food.count;
                  });
                  return totalPrice;
            },
            totalCount() {
                  let count=0;
                  this.selectFoods.forEach( (food) => {
                        count+=food.count;
                  })
                  return count;
            },
            payDesc() {
                  if(this.totalPrice===0){
                        return `￥${this.minPrice}起送`;
                  }else if( this.totalPrice < this.minPrice ){
                        let diff=this.minPrice-this.totalPrice;
                        return `还差￥${diff}元`
                  }else{
                        return `去结算`
                  }
            },
            payClass() {
                  if( this.totalPrice >= this.minPrice ) {
                        return 'enough';
                  }else{
                        return 'not-enough';
                  }
            },
            listshow() {
                  if(!this.totalCount){
                        this.fold=true
                        return false;
                  }
                  let show=!this.fold;
                  if(show){
                        this.$nextTick(() => {
                              if (!this.listWrapper) {
                                    this._initScroll();
                              } else {
                                    this.listWrapper.refresh();
                              }
                        });
                  }
                  return show;
            }
      },
      methods: {
            _initScroll() {
                  this.listWrapper = new BScroll(this.$refs.listWrapper, {
                        click:true
                  });
            },
            toggleList() {
                  if (!this.totalCount) {
                        return;
                  }
                  this.fold = !this.fold;
            },
            clearList() {
                  //清空购物车
                  this.selectFoods.forEach( (food) => {
                        food.count=0;
                  })
            }
      },
      components: {
           cartcontrol 
      }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin'
.shopcart-wrapper
      position:fixed
      left:0
      bottom:0
      width:100%
      height:48px
      background-color:#141d27
      color:rgba(255,255,255,0.4) 
      z-index:999
      .content
            display:flex
            .content-left
                  flex:1
                  vertical-align :top
                  font-size:0
                  .logo-wrapper
                        display:inline-block
                        width:56px 
                        height:58px
                        margin-left:18px
                        position:relative
                        top:-24px
                        background-color:#141d27
                        border-radius:50%
                        padding:6px
                        .logo
                              width:100%
                              height:100% 
                              background:#2b343c
                              border-radius:50%
                              text-align:center
                              &.heightlight 
                                    background:#00A0DC
                              .icon-shopping_cart
                                    display:inline-block
                                    vertical-align :top
                                    font-size:24px  
                                    line-height:58px 
                                    color:#80858a 
                                    &.heightlight 
                                          color:#fff
                        .num
                              position:absolute
                              right:0
                              top:0
                              width:24px
                              height:16px
                              font-size:9px
                              font-weight:700
                              line-height:16px
                              background:rgb(240,20,20)
                              box-shadow:0px 4px 8px 0px rgba(0,0,0,0.4)
                              border-radius:6px
                              color:#fff 
                              text-align:center
                  .price,.desc
                        display:inline-block
                        vertical-align :top
                        line-height:24px
                        margin-top:12px
                        
                  .price
                        box-sizing:border-box
                        padding:0 6px 0 6px
                        border-right:1px solid rgba(255,255,255,0.1)
                        font-size:16px
                        &.heightlight
                              color:#fff
                  .desc
                        font-size:12px
                        font-weight:700
                        box-sizing:border-box
                        padding:0 3px
                        
            .content-right
                  flex:0 0 105px//这个有固定的宽度，所以就不需要设置flex：1。
                  width:105px
                  font-size:12px
                  font-weight:700
                  text-align:center
                  vertical-align :top
                  line-height:24px
                  padding-top:12px
                  &.enough
                        background:green
                        color:#fff
                  &.not-enough
                        background:#2B333B
                        .price
                              padding:0 8px
      .selectList-wrapper
            position:absolute
            left:0
            bottom:48px
            width:100%
            z-index:-1
            background:#ffffff 
            .selectList
                  .list-header
                        height:40px 
                        background:#f3f5f7 
                        line-height:40px
                        padding:0 18px
                        .desc,.clear 
                              display:inline-block
                        .desc 
                              text-align:left
                              font-size:14px 
                              font-weight:200 
                              color:rgb(7,17,27) 
                              float:left
                        .clear 
                              text-align:right
                              font-size:12px 
                              color:rgb(0,160,220) 
                              float:right
                  .list-wrapper 
                        max-height:305px 
                        min-height:0 
                        overflow:hidden
                        //如果想要我们能够很好的检测出来高度，我们需要在相应的位置上设置高度和overflow:hidden,要不然就会没有鲜果
                        .list
                              background:#fff 
                              .food-item
                                    height:48px
                                    line-height:48px
                                    padding:0 18px
                                    vertical-align:top
                                    border-1px(rgba(7,17,27,0.1))
                                    &:last-child
                                    border-none()  
                                    .name,.price,.cartcontrol
                                          display:inline-block
                                          line-height:24px
                                          font-size:14px  
                                    .name 
                                          color:rgb(7,17,27)
                                          display:inline-block
                                    .price
                                          color:rgb(147,153,159) 
                                          font-weight:700 
                                          color:rgb(240,20,20) 
                                          float:right
                                          line-height:48px
                                          margin: 0 12px 0 18px
                                    .cartcontrol
                                          font-size:24px
                                          float:right
                                          line-height:48px 
</style>




