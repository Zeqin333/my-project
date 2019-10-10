<template>
      <div v-show="showFlag" class="food-wrapper" ref="foodScroll">
            <div class="foodContent">
                  <div class="big-image">
                        <img :src="food.image" alt="">
                        <i @click="hide" class="icon icon-arrow_lift"></i>
                  </div>
                  <div class="food-desc">
                        <h1 class="food">{{food.name}}</h1>
                        <div class="sellAndrating">
                              <span class="sellCount">月售{{food.sellCount}}份</span>
                              <span class="rating">好评率{{food.rating}}%</span>
                        </div>
                        <div class="price">
                              <div class="newPrice">￥{{food.price}}</div>
                              <div v-if="food.oldPrice"  class="oldPrice">￥{{food.oldPrice}}</div>
                        </div>
                        <div class="cartcontrol-wrapper">
                              <cartcontrol :food="food"></cartcontrol>
                        </div>
                        <div @click="addCount($event)" v-show="food.count===0 || !food.count" class="addShop">加入购物车</div>
                  </div>
                  <split></split>
                  <div v-show="!food.info==''" class="desc">
                        <h2 class="title">商品介绍</h2>
                        <div class="info">{{food.info}}</div>
                  </div>
                  <split v-show="!food.info==''"></split>
                  <div class="ratings">
                        <h3 class="title">商品评价</h3>
                        <ratingSelect @ratingtypeselect="ratingtypeselect" @contenttoggle="contenttoggle" :only-content="onlyContent" :rate-type="selectType" :ratings="food.ratings" :desc="desc"></ratingSelect>   
                  </div>
                  <div class="content-wrapper" v-show="food.ratings && food.ratings.length">
                        <div class="content" v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"  >
                              <div class="time">{{rating.rateTime}}</div>
                              <div class="username-desc">
                                    <div class="username">{{rating.username}}</div>
                                    <img :src="rating.avatar" alt="">
                              </div>
                              <div class="rating">
                                    <i :class='{"icon-thumb_down":rating.rateType===1,"icon-thumb_up":rating.rateType===2||rating.rateType===0}'></i>
                                    <span class="rating-desc">{{rating.text}}</span>
                              </div>
                        </div>
                  </div>
                  <div v-show="!food.ratings || !food.ratings.length" class="norating">暂无评论</div>
            </div>
      </div>            
</template>

<script type="text/ecmascript-6">
      import BScroll from "better-scroll";
      import split from 'components/split/split';
      import cartcontrol from 'components/cartcontrol/cartcontrol';
      import vue from 'vue';
      import ratingSelect from 'components/ratingSelect/ratingSelect';
      
      const ALL=2;
      export default {
            props: {
                  food:{
                        type:Object
                  }
            },
            data() {
                  return {
                        showFlag:false,
                        desc:{
                              all:'全部',
                              positive:'推荐',
                              negative:'吐槽' 
                        },
                        selectType:ALL,
                        onlyContent:false
                  }
            },
            created() {
                  this.$nextTick(() => {
                        if (!this.foodScroll) {
                              this._initScroll();
                        } else {
                              this.foodScroll.refresh();
                        }
                  });
            },
            methods: {
                  show() {
                        this.showFlag=true;
                  },
                  hide() {
                        this.showFlag=false;
                  },
                  _initScroll() {
                        this.foodScroll = new BScroll(this.$refs.foodScroll, {
                              click:true
                        })
                  },
                  addCount(event) {
                        if(!event._constructed){
                              return;
                        }
                        if(!this.food.count){
                              vue.set(this.food,'count',1);
                        }else{
                              this.food.count++;
                        };  
                  },
                  needShow(type,text) {
                        if(this.onlyContent && !text) {
                              return false;
                        }
                        if(this.selectType===ALL){
                              return true;
                        }else{
                              return type===this.selectType;
                        }
                        
                  },
                  ratingtypeselect(type) {
                        this.selectType = type;
                        // this.$nextTick(() => {
                        //       setTimeout(function(){
                        //             this.scroll.refresh();
                        //       },1500)
                        // });
                  },
                  contenttoggle(onlyContent) {
                        this.onlyContent = onlyContent;
                        // this.$nextTick(() => {
                        //       setTimeout(function(){
                        //             this.scroll.refresh();
                        //       },1500);
                              
                        // });
                  }
            },
            components: {
                  split,
                  cartcontrol,
                  ratingSelect
            }
      };
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.food-wrapper
      position:fixed 
      top:0
      left:0
      bottom:48px
      width:100%
      z-index:30
      background:#ffffff 
      .foodContent
            .big-image 
                  position:relative 
                  width:100%
                  height:0 
                  padding-top:100%
                  img 
                        position:absolute
                        top:0 
                        left:0 
                        width:100% 
                        height:100%
                        z-index:31
                  .icon 
                        position:absolute
                        top:10px 
                        left:10px 
                        color:#fff  
                        font-size:18px 
                        z-index:32
            .food-desc
                  font-size:0 
                  position:relative 
                  padding:18px
                  .food
                        font-size:14px 
                        font-weight:700 
                        color:rgb(7,17,27) 
                        line-height:14px 
                        margin-bottom:8px
                  .sellAndrating
                        font-size:10px 
                        color:rgb(147,153,159) 
                        line-height:10px
                        margin-bottom:18px  
                        .rating
                              margin-left:12px 
                  .price
                        font-weight:700 
                        line-height:24px
                        display:inline-block
                        .newPrice,.oldPrice
                              display:inline-block
                        .newPrice
                              font-size:14px 
                              color:rgb(240,20,20)                        
                        .oldPrice
                              font-size:10px 
                              color:rgb(147,153,159) 
                              margin-left:9px 
                              text-decoration:line-through
                  .addShop
                        position:absolute
                        bottom:18px 
                        right:18px
                        width:74px 
                        height:24px 
                        font-size:10px 
                        color:#fff 
                        line-height:24px 
                        padding:6px 12px
                        text-align:center
                        background:rgb(0,160,220) 
                        border-radius:18px 
                  .cartcontrol-wrapper 
                        position:absolute 
                        bottom:18px 
                        right:18px 

            .desc 
                  position:relative
                  padding:18px
                  .title 
                        font-size:14px 
                        margin-bottom:6px
                  .info 
                        font-size:12px 
                        font-weight:200 
                        color:rgb(77,85,93) 
                        line-height:24px 
                        padding:0 8px 
            .ratings
                  margin-top:18px
                  border-1px(rgba(7,17,27,0.1))
                  .title
                        margin-left:18px 
                        font-size:14px
            .content-wrapper
                  margin-left:18px 
                  margin-right:18px 
                  margin-bottom:20px 
                  font-size:0 
                  .content
                        padding:16px 0 16px 0
                        border-1px(rgba(7,17,27,0.1))
                        .time,.username-desc 
                              display:inline-block 
                        .time
                              font-size:10px
                              color:rgb(147,153,159) 
                              line-height:12px 
                        .username-desc
                              float:right 
                              .username,img 
                                    display:inline-block
                                    vertical-align :top
                              .username
                                    font-size:10px 
                                    color:rgb(147,153,159) 
                                    line-height:12px 
                                    margin-right:6px
                              img 
                                    width:12px 
                                    height:12px     
                        .rating 
                              margin-top:6px 
                              .icon-thumb_down,.icon-thumb_up
                                    font-size:12px 
                              .icon-thumb_down 
                                    color:rgb(147,153,159)
                              .icon-thumb_up
                                    color:rgb(0,160,220)
                              .rating-desc 
                                    margin-left:4px
                                    color:rgb(7,17,27)
                                    font-size:12px 
                                    line-height:16px


            .norating
                  font-size:14px 
                  color:rgb(147,153,159)
                  text-align:center 
                  padding:50px 0 50px 0
            

                        





            
            


</style>