#一、新建项目
1. $ npm install --global vue-cli
2. $ vue init webpack my-project
3. $ cd my-project
4. $ npm install
5. $ npm run dev
# 二、使用linkActiveClass
1. 在router中使用
```
linkActiveClass: 'active'

```
2. 在vue中使用下面的来定义我们的样式
    ```
    &>a.active {
    color:rgb(240,20,20)
    }

    ```
# 三、如何在移动端设置1px的border，参见印象笔记的部分。
# 四、文字不换行，隐藏
    ```
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis


     文字多行溢出隐藏 
    ```
    overflow: hidden
    text-overflow: ellipsis
    display:-webkit-box 
    -webkit-line-clamp:2 
    -webkit-box-orient:vertical
    ```
    ``` 
# 五、修改host的方法：
    在config的index中修改
# 六、如何运用babell-scroll
1. 运用`cnpm install babell-scroll --s`
2. 
    ```
    import BScroll from "better-scroll";
    this.$nextTick(() => {
            if (!this.listWrapper) {
                this._initScroll();
                console.log(1);
            } else {
                this.listWrapper.refresh();
                console.log(2);
            }
    });
    methods: {
        _initScroll() {
                this.listWrapper = new BScroll(this.$refs.listWrapper, {
                    click:true
                });
        }
    }

    ```
3. 在直接的父元素上设置overflow
    ```
    .list-wrapper (在这个元素上设置ref)
        max-height:305px 
        min-height:0 
        overflow:hidden
        //如果想要我们能够很好的检测出来高度，我们需要在相应的位置上设置高度和overflow:hidden,要不然就会没有鲜果

    ```
4. 注意，在那个上面设置的ref那就就设置overflow在哪个元素上。
# 七、如何在图片异步的时候，我们屏幕上还留下一部分的空白给图片占用地方 
    ```
        .big-image （图片的父元素，设置如下，主要是padding-top:100%）
                    position:relative 
                    width:100%
                    height:0 
                    padding-top:100%
                    img (图片设置如下，宽高都为100%)
                        position:absolute
                        top:0 
                        left:0 
                        width:100% 
                        height:100%

    ```
# 八、$emit ,$on的用法
    1. 在子组件中写
    this.$emit('contenttoggle', this.onlyContents);
    2. 在父组件中的引用部分写@ratingtypeselect="ratingtypeselect" 
    在方法中写ratingtypeselect方法需要做的事情。
    ```
    <ratingSelect @ratingtypeselect="ratingtypeselect" @contenttoggle="contenttoggle" :only-content="onlyContent" :rate-type="selectType" :ratings="food.ratings" :desc="desc"></ratingSelect>  

    ``` 
# 九、this.scroll.refresh()
    这个是会报错的，是无效的，查阅的方法是改为:
    1. 原因是：JS中又栈队。
    ```
    setTimeout(function(){
           this.scroll.refresh();
    },1500)

    ```
    
# 十、被vue2.0废除的属性和方法
    $dispath()-----------$emit代替
    events(){}-----------@(v-on)代替，写在HTML语句中
