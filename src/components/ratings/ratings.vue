<template>
  <div class="rating" ref="rating">
    <div class="ratings-wrapper">
      <div class="ratings">
        <div class="totalScore">
          <div class="score">{{seller.score}}</div>
          <div class="desc">综合评分</div>
          <div class="compare">高于周边的商家{{seller.rankRate}}%</div>
        </div> 
        <div class="star-wrapper">
          <div class="item">
            <div class="foodScore">食物评价</div>
            <star class="star" :score="seller.foodScore" :size="36"></star>
            <div class="score">{{seller.foodScore}}</div>
          </div>
          <div class="item">
            <div class="serviceScore">服务态度</div>
            <star class="star" :score="seller.serviceScore" :size="36"></star>
            <div class="score">{{seller.serviceScore}}</div>
          </div>
          <div class="item">
            <div class="arrive">送达时间</div>
            <div class="time">{{seller.deliveryTime}}分钟</div>
          </div>
        </div>
      </div>
      <split></split>
      <ratingSelect @ratingtypeselect="ratingtypeselect" @contenttoggle="contenttoggle" :only-content="onlyContent" :rate-type="selectType" :ratings="ratingContent" :desc="desc"></ratingSelect>   
      <div class="content" v-show="ratingContent && ratingContent.length">
          <ul>
            <li class="item border-1px" v-for="item in ratingContent" v-show="needShow(item.rateType,item.text)">
              <div class="avatar">
                <img class="avatar-img" :src="item.avatar" alt="作者图像">
              </div>
              <div class="right">
                <div class="nameAstar">
                  <div class="name">{{item.username}}</div>
                  <div class="star">
                    <star class="score" :score="item.score" :size="24"></star>
                    <span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
                  </div>
                </div>
                <div class="rateTime">{{item.rateTime}}</div>
                <div class="text">{{item.text}}</div>
                <div class="buttom">
                  <i class="rateType" :class='{"icon-thumb_down":item.rateType===1,"icon-thumb_up":item.rateType===2 || item.rateType===0}'></i>
                  <ul class="recommend">
                    <li class="item" v-for="oneItem in item.recommend">{{oneItem}}</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import star from 'components/star/star';
import split from 'components/split/split';
import ratingSelect from 'components/ratingSelect/ratingSelect';

const ERR_OK = 0;
const  ALL=2;

export default {
  props: {
    seller:{
      type:Object
    }
  },
  data() {
    return {
          desc:{
                all:'全部',
                positive:'满意',
                negative:'不满意' 
          },
          selectType:ALL,
          onlyContent:false,
          ratingContent:[]
    }
  },
  created() {
    this.$http.get('/api/ratings').then( response => {
      response=response.body;
      if (response.errno === ERR_OK) {
        this.ratingContent = response.data;
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    })
  },
  methods: {
    _initScroll() {
      this.rating = new BScroll(this.$refs.rating, {
        click:true
      });
    },
    ratingtypeselect(type) {
          this.selectType = type;
    },
    contenttoggle(onlyContent) {
          this.onlyContent = onlyContent;
    },
    needShow(type,text) {
      if(this.onlyContent && !text){
        return false;
      }
      if(this.selectType===ALL) {
        return true;
      }
      else {
        return this.selectType===type;
      }
    }
  },
  components: {
    star,
    split,
    ratingSelect
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.rating
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .ratings-wrapper
    .ratings 
      display:flex 
      padding:18px 0
      color:rgb(7,17,27) 
      .totalScore
        flex:0 0 135px
        width:135px
        text-align:center
        border-right:1px solid #E6E7E8 
        .score
          font-size:24px 
          color:rgb(255,153,0) 
          height:28px
          line-height:28px
        .desc 
          font-size:12px 
          height:12px 
          line-height:12px 
          margin:6px auto 8px auto
        .compare
          font-size:10px 
          color:#93999F  
          height:10px 
          line-height:10px o
          margin-bottom:6px
      .star-wrapper
        flex:1
        font-size:0
        .item 
          padding:0 24px 
          font-size:12px  
          height:18px 
          line-height:18px
          margin-bottom:8px
          text-align:left
          box-sizing:border-box
          @media only screen and  (max-width:375px)
            padding:0 8px
          @media only screen and  (max-width:320px)
            padding:0 3px
          &:last-child 
            margin-bottom:0
          .foodScore,.serviceScore,.star,.score,.arrive,.time 
            display:inline-block 
            box-sizing:border-box
            vertical-align:top
          .score
            color:rgb(255,153,0) 
          .time,.star
            margin:0 12px
          .time
            color:rgb(147,153,159) 
          .star 
            vertical-align:top
            @media only screen and  (max-width:375px)
              padding:0 0
              margin:0 4px
            @media only screen and  (max-width:320px)
              padding:0 0
              margin:0 2px
    .content 
      margin:0 18px 
      font-size:12px
      
      ul  
        .item 
          padding:18px 0
          font-size:0 
          display:flex 
          border-1px(rgba(7,17,27,0.1))
          .avatar,.right 
            display:inline-block
          .avatar 
            width:28px 
            vertical-align :top
            border-radius:50%
            .avatar-img
              width:28px 
              border-radius:50%
          .right
            flex:1
            margin-left:12px 
            .nameAstar,.rateTime
              display:inline-block
            .nameAstar
              line-height:12px 
              .name 
                font-size:12px 
                color:rgb(7,17,27) 
                line-height:12px
              .star
                margin-top:4px
                .score 
                  display:inline-block 
                .deliveryTime
                  display:inline-block
                  margin-left:6px 
                  font-size:10px 
                  font-weight:200 
                  color:rgb(147,153,159) 
            .rateTime
              float:right 
              font-size:10px 
              font-weight:200 
              color:rgb(147,153,159) 
              line-height:12px 
            .text 
              font-size:12px 
              color:rgb(7,17,27) 
              line-height:18px 
              margin-top:6px 
            .buttom 
              margin-top:8px 
              display:flex 
              vertical-align :middle
              .rateType 
                font-size:12px 
                line-height:16px
                margin-top:5px
                &.icon-thumb_down
                  color:rgb(183,187,191) 
                &.icon-thumb_up 
                  color:rgb(0,160,220) 
              .recommend 
                flex:1
                display:inline-block
                vertical-align :top
                .item 
                  max-width:50px
                  height:16px 
                  overflow:hidden
                  white-space: nowrap
                  text-overflow: ellipsis
                  margin-left:8px
                  margin-top:5px
                  display:inline-block
                  padding:0 6px 
                  font-size:9px 
                  color:rgb(147,153,159) 
                  line-height:16px 
                  border:1px solid rgba(7,17,27,0.1) 
                  border-radius:1px 
                  background-color:#fff





</style>
