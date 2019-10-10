<template>
  <div id='header'>
      <div class="content-wrapper">
        <div class="avatar">
          <img width='64' height='64' :src="seller.avatar" alt="">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="discraption">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
          <div v-if="seller.supports" class="supports">
            <span class="cheaper" :class='cheapers[seller.supports[0].type]'></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if="seller.supports" class='support-count' @click="showDetail">
          <span class='count'>{{seller.supports.length}}个</span>
          <i class='icon-keyboard_arrow_right'></i>
        </div>
      </div>
      <div class="bulletin-wrapper">
        <span class='brand'></span>
        <span class="bulletin">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div v-show="detailShow" class="detail" transition="fade">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">{{seller.name}}</div>
            <star class="starShow" :score="seller.score" :size="48"></star>
            <div class="supports">
              <div class="title">
                <div class="line-border border-1px"></div>
                <div class="infomation">商家信息</div>
                <div class="line-border border-1px"></div>
              </div>
              <div class="content">
                <div class="content-item" v-for="item in seller.supports">
                  <div class="icon" :class='cheapers[item.type]'></div>
                  <div class="support">{{item.description}}</div>
                </div>
              </div> 
            </div>
            <div class="announcement supports">
              <div class="title">
                <div class="line-border border-1px"></div>
                <div class="infomation">商家广告</div>
                <div class="line-border border-1px"></div>
              </div>
              <div class="content">
                <div class="bulletin">{{seller.bulletin}}</div>
              </div>
            </div>    
          </div>
        </div>
        <div class="icon-close" @click="hideDetail"></div>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt="">
      </div> 
  </div>
</template>

<script type="text/ecmascript-6">

import star from "components/star/star";

export default {
  props: ["seller"],
  data() {
    return {
      cheapers: [],
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.cheapers = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  components: {
    star
  }
};
</script>

<style lang='stylus' type='stylesheet/stylus'>
@import '../../common/stylus/mixin';

#header {
  margin-top: 0;
  background: rgba(7, 17, 27, 0.5);
  position: relative;
  overflow: hidden;
  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0; // 因为都是div,所有中间会有一些空白的字符，使得两个div中有空隙，当我们设置font-size：0的时候，可以减掉这个空隙。但是后面子元素会继承父元素，所以后面需要设置font-size
    position: relative;

    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    .content {
      display: inline-block;
      margin: 2px 0 2px 16px;

      .title {
        font-size: 16px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        line-height: 18px;
        margin-bottom: 8px;

        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
        }
      }

      .discraption {
        font-size: 12px;
        color: rgb(255, 255, 255);
        font-weight: 200;
        line-height: 12px;
        margin-bottom: 10px;
      }

      .supports {
        font-size: 10px;
        color: rgb(255, 255, 255);
        font-weight: 200;
        line-height: 12px;

        .cheaper {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;

          &.decrease {
            bg-image('decrease_1');
          }

          &.discount {
            bg-image('discount_1');
          }

          &.guarantee {
            bg-image('guarantee_1');
          }

          &.invoice {
            bg-image('invoice_1');
          }

          &.special {
            bg-image('special_1');
          }
        }
      }
    }

    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      color: #fff;
      vertical-align: middle;

      .count {
        font-size: 10px;
        font-weight: 200;
        margin-left: 9px;
      }

      .icon-keyboard_arrow_right {
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    color: rgb(255, 255, 255);
    font-size: 10px;
    background-color: rgba(7, 17, 27, 0.2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .brand {
      display: inline-block;
      width: 22px;
      height: 12px;
      bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
      vertical-align: top;
      margin-top: 8px;
    }

    .bulletin {
      vertical-align: top;
      font-weight: 200;
      margin: 0 4px;
    }

    .icon-keyboard_arrow_right {
      position: absolute;
      right: 12px;
      top: 8px;
    }
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(7, 17, 27, 0.8);
    z-index: 900;
    padding-bottom: 64px;
    overflow: auto;
    transition: all 0.5s
    backdrop-filter: blur(10px)//在某些ios中会显示出效果
    &.fade-transition{
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
    }
    &.fade-enter, &.fade-leave{
      opacity: 0
      background: rgba(7, 17, 27, 0)
    }
    .detail-wrapper {
      width: 100%;
      min-height: 100%;

      .detail-main {
        margin: 64px 36px 0 36px;
        padding-bottom: 64px;
        color: rgb(255, 255, 255);
        text-align: center;
        font-weight: 700;
        
        .name {
          font-size: 16px;
          font-weight: 700;
          line-height: 16px;
        }

        .starShow{
          margin-top:16px
        }

        .supports {
          font-size: 0;
          margin: 28px 0 24px 0;

          .title {
            display: flex;
            width: 90%;
            margin: 28px auto 24px auto;

            .line-border {
              flex: 1;
              position: relative;
              top: -6px;
              border-1px(rgba(255, 255, 255, 0.2));
            }

            .infomation {
              font-size: 14px;
              font-weight: 700;
              padding: 0 12px;
            }
          }

          .content {
            width: 90%;
            padding: 0 12px;
            margin:0 auto;

            .content-item {
              text-align: left;
              margin-bottom: 12px;

              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                margin: 0 6px 0 12px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                vertical-align: middle;

                &.decrease {
                  bg-image('decrease_2');
                }

                &.discount {
                  bg-image('discount_2');
                }

                &.guarantee {
                  bg-image('guarantee_2');
                }

                &.invoice {
                  bg-image('invoice_2');
                }

                &.special {
                  bg-image('special_1');
                }
              }

              .support {
                display: inline-block;
                text-align: left;
                margin-left: 6px;
                font-size: 12px;
                font-weight: 200;
                line-height: 12px;
                vertical-align :middle
              }
            }
          }

          .infomation {
            display: inline-block;
            font-size: 14px;
            font-weight: 700;
            line-height: 14px;
            vertical-align: middle;
            padding: 0 12px;
          }
        }

        .announcement {
          margin: 28px 0 24px 0;

          .content {
            margin: 24px auto 28px auto;

            .bulletin {
              font-size: 12px;
              font-weight: 200;
              line-height: 24px;
              text-align: left;
              padding: 0 12px;
            }
          }
        }
      }
    }

    .icon-close {
      position: relative;
      bottom: 32px;
      width: 32px;
      height: 32px;
      margin: -32px auto 0 auto;
      clear: both;
      font-size: 32px;
      color:rgba(255,255,255,0.5)
    }
  }

  .background {
    width: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    filter: blur(10px);

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
