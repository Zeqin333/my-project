<template>
  <div class="seller-wrapper" ref="sellers">
      <div class="seller-content">
        <div class="simpleDesc">
          <div class="top border-1px">
            <div class="left">
              <div class="name">{{seller.name}}</div>
              <div class="starAcount">
                <star class="star" :score="seller.score" :size="36"></star>
                <span class="ratingCount">({{seller.ratingCount}})</span>
                <span class="sellCount">月售{{seller.sellCount}}单</span>
              </div>
            </div>
            <div class="right">
              <i @click="favoriteOrNot" class="icon-favorite" :class="{'active':favorite}"></i>
              <div class="collect">{{favorite===true?collected:collect}}</div>
            </div>
          </div>
          <div class="buttom">
            <div class="minPrice">
              <div class="desc">起送价</div>
              <div class="price"><span>{{seller.minPrice}}</span>元</div>
            </div>
            <div class="deliveryPrice">
              <div class="desc">商家配送</div>
              <div class="price"><span>{{seller.deliveryPrice}}</span>元</div>
            </div>
            <div class="deliveryTime">
              <div class="desc">平均配送时间</div>
              <div class="price"><span>{{seller.deliveryTime}}</span>分钟</div>
            </div>
          </div>

        </div>
        <split></split>
        <div class="bulletin">
          <div class="top border-1px">
            <h2 class="title">公告与活动</h2>
            <p class="desc">{{seller.bulletin}}</p>
          </div>
          <ul class="buttom supports" >
            <li class="item border-1px" v-for="(oneItem,index) in seller.supports">
              <span class="cheaper" :class="cheapers[index]"></span>
              <span class="description">{{oneItem.description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="sellerPics">
          <h2 class="title">商家实景</h2>
          <ul>
            <li class="item" v-for="pic in seller.pics">
              <img :src="pic" alt="">
            </li>
          </ul>
        </div>
        <split></split>
        <div class="infos">
          <h2 class="title">商家信息</h2>
          <ul>
            <li class="item" v-for="oneItem in seller.infos">{{oneItem}}</li>
          </ul>
        </div>
      </div>
  </div>  
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import split from 'components/split/split';
import star from 'components/star/star';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      cheapers:[],
      favorite:false,
      collected:'已收藏',
      collect:'收藏'
    }
  },
  created() {
    this.$nextTick(() => {
      this._initScroll();
    });
    this.cheapers = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    _initScroll() {
      this.sellers = new BScroll(this.$refs.sellers, {
        click:true
      });
    },
    favoriteOrNot() {
      this.favorite=!this.favorite;
    }
  },
  components:{
    split,
    star
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.seller-wrapper
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .seller-content
    color:rgb(7,17,27) 
    .simpleDesc
      margin:18px 18px
      font-size:0 
      .top 
        border-1px(rgba(7,17,27,0.1))
        padding-bottom:18px
        .left,.right 
          display:inline-block
        .left 
          .name
            font-size:14px 
            line-height:14px 
          .starAcount 
            margin-top:8px 
            height:18px 
            font-size:10px 
            color:rgb(77,85,93) 
            line-height:18px
            .star 
              display:inline-block 
              vertical-align :top
            .ratingCount,.sellCount
              vertical-align :top
              line-height:18px
            .ratingCount
              margin-left:8px 
            .sellCount
              margin-left:12px 
        .right
          float:right 
          width:80px
          .icon-favorite
            display:block
            font-size:24px 
            color:#D4D6D9
            line-height:24px 
            text-align:center
            &.active 
              color:rgb(240,20,20) 
          .collect
            text-align:center
            font-size:10px 
            color:rgb(77,85,93)
            line-height:10px 
            margin-top:4px

      .buttom
        padding-top:18px
        display:flex 
        
        .minPrice,.deliveryPrice,.deliveryTime
          flex:1
          text-align:center 
          border-right:1px solid rgba(7,17,27,0.1)
          .desc 
            font-size:10px 
            color:rgb(147,153,159) 
            line-height:10px 
          .price 
            margin-top:4px 
            font-size:10px
            color:rgb(7,17,27)
            line-height:24px
            span 
              font-size:24px 
              font-weight:200 
              vertical-align:buttom
        .deliveryTime
          border:none
    .bulletin 
      margin:0 18px
      font-size:0 
      .top 
        margin-top:18px 
        border-1px(rgba(7,17,27.0.1))
        .title 
          font-size:14px 
        .desc 
          margin-top:8px 
          padding:0 12px 16px 12px 
          font-size:12px 
          font-weight:200 
          color:rgb(240,20,20)
          line-height:24px  
      .buttom
        .item
          border-1px(rgba(7,17,27.0.1))
          padding:16px 12px 
          .cheaper
            display:inline-block 
            width:16px
            height:16px 
            background-size: 16px 16px
            background-repeat: no-repeat
            vertical-align: top
            &.decrease 
              bg-image('decrease_4')
            &.discount 
              bg-image('discount_4')
            &.guarantee 
              bg-image('guarantee_4')
            &.invoice 
              bg-image('invoice_4')
            &.special 
              bg-image('special_4')
          .description
            margin-left:6px 
            font-size:12px 
            font-weight:200 
            line-height:16px
    .sellerPics
      margin:18px 
      font-size:0
      .title 
        font-size:14px 
        margin-bottom:12px
      ul  
        @media only screen and (max-width:700px)
          display:flex
        .item
          display:inline-block
          margin-right:6px
          @media only screen and (max-width:700px)
            flex:1
            width:auto
            height:auto
          img
            width:120px 
            height:90px
            @media only screen and (max-width:700px)
              max-width:120px
              max-height:90px
    .infos
      margin:18px
      padding-bottom:18px
      .title 
        font-size:14px
        border-1px(rgba(7,17,27,0.1))
        padding-bottom:12px 
        font-weight:700
      ul  
        .item 
          border-1px(rgba(7,17,27,0.1))
          padding:16px 12px
          font-size:12px
          font-weight:200 
          line-height:16px




              

</style>
