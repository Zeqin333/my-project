<template>
      <div class="ratingSelect">
            <div class="typeSelect border-1px">
                  <div @click="select(2,$event)" :class="{'active':rateTypes===2}" class="positive select-item">{{desc.all}}<span class="count">{{ratings.length}}</span></div>
                  <div @click="select(0,$event)" :class="{'active':rateTypes===0}" class="positive select-item">{{desc.positive}}<span class="count">{{positives.length}}</span></div>
                  <div @click="select(1,$event)" :class="{'active':rateTypes===1}" class="negative select-item">{{desc.negative}}<span class="count">{{negatives.length}}</span></div>
            </div>
            <div class="select">
                  <i @click="toggleContent($event)" id="descL" class="icon-check_circle" :class="{'on':onlyContents}" ></i>
                  <span @click="toggleContent($event)" class="descL" >只看有内容的评价</span>
            </div>
      </div>
</template>

<script type="text/ecmascript-6">
      const ALL=2;
      const POSITIVE=0;
      const NEGATIVE=1;
      export default {
            props: {
                  desc:{
                        type:Object,
                        default() {
                              return {
                                    all:'全部',
                                    positive:'满意',
                                    negative:'不满意'

                              }
                        }
                  },
                  ratings:{
                        type:Array,
                        default() {
                              return [];
                        }
                  },
                  rateType:{
                        type:Number,
                        default:ALL
                  },
                  onlyContent:{
                        type:Boolean,
                        default:false
                  }
            },
            data() {
                  return {
                        rateTypes:this.rateType,
                        onlyContents:this.onlyContent
                  }
            },
            methods: {
                  select(type,event) {
                        if (!event._constructed) {
                              return;
                        }
                        this.rateTypes=type;
                        this.$emit('ratingtypeselect', type);
                  },
                  toggleContent(event) {
                        if(!event._constructed){
                              return;
                        };
                        this.onlyContents=!this.onlyContents;
                        this.$emit('contenttoggle', this.onlyContents);
                  }
            },
            computed:{
                  positives(){
                        return this.ratings.filter( (rating)=>{
                              return rating.rateType===POSITIVE;
                        })
                  } ,
                  negatives() {
                        return this.ratings.filter( (rating)=>{
                              return rating.rateType===NEGATIVE;
                        })
                  }
            }
      };
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.ratingSelect
      margin:0 18px
      cursor:pointer
      .typeSelect 
            padding:18px 0
            font-size:0
            border-1px(rgba(7,17,27,0.1))
            .select-item 
                  display:inline-block
                  background:#E9EBEC 
                  height:16px 
                  line-height:16px 
                  color:#4d555d
                  font-size:12px
                  letter-spacing:2px
                  text-align:center
                  padding:8px 12px 
                  border-radius:2px
                  margin-right:8px
                  &.active 
                        color:#fff 
                  &.positive 
                        background: rgba(0, 160, 220, 0.2)
                        &.active 
                              background: rgb(0, 160, 220)
                  &.negative 
                        background: rgba(77, 85, 93, 0.2)
                        &.active 
                              background: rgb(77, 85, 93)
      .select
            font-size:0
            padding:12px 0
            .icon-check_circle
                  font-size:24px 
                  color:rgb(147,153,159) 
                  height:24px 
                  vertical-align:top
                  &.on 
                        color:#00A0DC
            .descL
                  font-size:12px
                  color:rgb(147,153,159) 
                  line-height:24px
                  vertical-align:top
                  margin-left:4px

</style>