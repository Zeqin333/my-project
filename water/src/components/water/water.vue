<template>
    <div class="content">
        <div class="left">
            <div class="img">
                <img @click="desc"  src="./car.jpg" alt="">
            </div>
            <div class="hydraulic-giant">
                <span class="giant-left">
                    <i>水枪1</i>
                    <img @click="descWater('left')" :class="{'active':left}" src="./giant1.jpg" alt="">
                </span>
                <span class="giant-right">
                    <i>水枪2</i>
                    <img @click="descWater('right')" :class="{'active':right}" src="./giant2.jpg" alt="">
                </span>
            </div>
        </div>
        <div class="right">
            <div class="big-box">
                <div class="box box-left">
                    <h4 class="desc">水枪1</h4>
                    <div class="water-box ">
                        <div class="water" :style="{height:leftH+'px'}" ref="waterleft"></div>
                    </div>
                </div>
                <div class="box box-right">
                    <h4 class="desc">水枪2</h4>
                    <div class="water-box">
                        <div class="water" :style="{height:rightH+'px'}" ref="waterright"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'water',
        data(){    
            return {
                leftH:300,
                rightH:300,
                left:false,
                right:false ,
                clickCount:0
            }
        },
        methods: {
            descWater(leftOrRight) {
                if(leftOrRight==='left'){
                    this.right=false;
                    this.left=!this.left; 
                }else if(leftOrRight==='right'){
                    this.left=false;
                    this.right=!this.right;
                } 
            },
            desc() {
                this.clickCount+=1;
                if(this.left===true){
                    if(this.leftH>0) {
                        if(this.clickCount===3){
                            this.leftH-=30;
                            this.clickCount=0;
                        }
                    }else{
                        alert('水枪1的水用完了。');
                    }
                }else if(this.right===true){
                    if(this.rightH>0) {
                        if(this.clickCount===3){
                            this.rightH-=50;
                            this.clickCount=0;
                        }
                    }else{
                        alert('水枪2的水用完了。');
                    }
                }else{
                    alert('并没有选中水枪');
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
@import '../../common/stylus/base'

.content 
    position:fixed 
    top:0 
    left:0 
    width:100% 
    height:100%
    display:flex
    border:1px solid border-color
    .left 
        flex:0 0 900px
        position:relative 
        font-size:0
        .img
            width:100% 
            height:100%
            img 
                width:100%
                height:100%
                cursor:pointer
            i 
                font-size:15px 
                color:#000
        .hydraulic-giant
            position:absolute 
            width:450px 
            height:200px
            left:50%
            bottom:50px 
            margin-left:-225px
            .giant-left,.giant-right
                display:inline-block
                width:200px 
                height:200px 
                cursor:pointer
                img 
                    width:200px 
                    height:200px
                    border-radius:50%
                    vertical-align:bottom
                    box-sizing:border-box
                    &.active 
                        border:5px solid blue
                    
            .giant-right
                margin-left:50px
    .right 
        flex:1 
        background:#000 
        .big-box 
            margin-top:100px   
            .box 
                display:inline-block
                margin-left:50px
                .desc 
                    font-size:14px 
                    color:#fff
                    text-align:center
                .water-box   
                    width:150px 
                    height:300px 
                    border:1px solid #fff
                    position:relative
                    .water  
                        position:absolute
                        left:0 
                        bottom:0
                        width:100% 
                        background:blue 
            

</style>