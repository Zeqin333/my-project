### 一、模板
#### 1.1、在vs中新建一个html文件，然后直接输入vue然后按tab键，就可以出现vue的基本的模板。
```
<!DOCTYPE html>
<html lang="en">
    
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app">
        
    </div>
</body>
<script src="../jquery.js"></script>
<script src="../vue.js"></script>
    
</html>
```
#### 1.2、制作模板的方法
+ 过程：在你所在的地方按住shift+ctrl+p,然后在搜索框中输入snippet ，然后选择首选项：打开用户代码段，选择代码的语言，然后点进去。
```
"Print to console": {
        "prefix": "vue",  <!--这个是我们输入的入口，输入这个回车，就可以得到代码段-->
        "body": [
            "<!DOCTYPE html>",  <!--插入的代码，每一行都需要用""括起来-->
            "<html lang=\"en\">",<!--如果语句中有用" "的，我们就需要转义用\就可以了-->
            "\t",
            "<head>",
                "\t<meta charset=\"UTF-8\">",
                "\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
                "\t<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
                "\t<title>Document</title>",
            "</head>",
            "<body>",
            "\t<div id=\"app\">",
            "\t\t${1}",
            "\t</div>",
            "</body>",
            "<script src=\"../jquery.js\"></script>",
            "<script src=\"../vue.js\"></script>",
            "\t",
            "</html>"
        ],
        "description": "Log output to console"
    }
```
### 二、插值（插值中允许有表达式）
#### 2.1、文本插值[单项绑定]
+ + 单项绑定:当Model发生变化的时候，我们插值也会发生改变，但是插值改变的时候，我们的model是不会发生改变的
+ v-text的方式优于{{}}。
+ 在显示的时候，v-text，如果等new Vue({})完成后，数据显示出来了，就可以显示在页面上，但是{{}}，如果数据还没有加载出来，就会出现双大括号。
    ```
    <p v-text="test_01"></p>
    <!-- 结果：插值的第一种方法，文本插值 -->
    <p>{{test_01}}</p>
    <!-- 结果：插值的第一种方法，文本插值 -->
    <p>{{test_01?'aaa':'bbb'}}</p><!--插值中允许有表达式-->
    <!-- 结果：aaa -->


    var app=new Vue({
            el:'#app',
            data:{
                test_01:'插值的第一种方法，文本插值'
            }
        })
    ```
#### 2.2、html插值
+ 2.2.1、用法：
    ```
    <!-- 只能够通过这种属性的插值法。不能使用v-html="<a href="http://www.baidu.com">百度</a>"，会报错。 -->
    <p v-html="test_01"></p>
    <p v-html="content"></p>
    <!-- 结果：插值的第一种方法，文本插值 -->

    var app=new Vue({
        test_01:'插值的第一种方法，文本插值',
        content:'<a href="http://www.baidu.com">百度</a>'
    })
    ```
+ 2.2.2、下面这种会报错，还不知道什么原因？
    ```
    <p v-html="<a href='http://www.baidu.com'>百度</a>"></p>

    <!-- 错误原因 -->
    - invalid expression: Unexpected token < in

        <a href='http://www.baidu.com'>百度</a>

    Raw expression: v-html="<a href='http://www.baidu.com'>百度</a>"
    (found in <Root>)
    ```
+ 2.2.3、这种带有javascript语言，或者是{{}}的语言是绝对禁止的。
    ```
    <p v-html="<a href='javascript:;'></a>"></p>
    <p v-html="<a>{{test_01}}</a>"></p>
    ```

+ 注意：
    * HTML插值，只对可信任的内容使用Html插值，绝不要用户提供的内容插值，除非是内容过滤，否则很容易引起xss攻击
    * v-html 语句中不允许有javascript表达式，或只是插值。
#### 2.3、属性插值
+ v-bind: 这里绑定的数据需要在模型中定义，如果没有定义，就会出现错误。如果没有定义，那就只能用id="p1",而不能用v-bind:id="p1"。
    ```
    <p v-bind:id="p1">属性插值</p>

    <script>
    var app=new Vue({
            el:'#app',
            data:{
                test_01:'插值的第一种方法，文本插值',
                p1:'p1'
            }
        })
    </script>
    ```
### 三、插值中允许有表达式
```
<p>{{test_01?'aaa':'bbb'}}</p>
<!-- 结果：aaa ，-->
```
+ 注意：只能出现上面的表达式，不允下面类似的语句
    ```
    <p>{{if(test_01) {'aaa'} else {'bbb'} }}</p>

    <!-- 错误的原因 -->
    avoid using JavaScript keyword as property name: "if"
    Raw expression: {{if(test_01) {'aaa'} else {'bbb'} }}
    ```
### 四、单项绑定()、一次性绑定(v-once)、双向绑定(v-model)
+ 单项绑定: {{test}、v-html="test"、v-bind:id="test"}。
+ 一次性绑定(v-once):只绑定一次，当模型的数据发生变化时，插值不发生变化，即数据不会联动更新。
+ 双向绑定(v-model):相互作用，相互影响，数据可以联动更新。
### 五、方法的调用
+ 用法：
    ```
    <!-- 双大括号中需要加括号（） -->
    <p>{{toUpperCase()}}</p>
    <!-- v-text中需要加括号（） -->
    <p v-text="toUpperCase()"></p>

    <script>
    var app=new Vue({
            el:'#app',
            data:{
                test_01:'插值的第一种方法，文本插值
            },
            methods:{
                toUpperCase:function(){
                    return this.test_01.toUpperCase();
                }
            }
        })
    </script>
    ```
+ 注意：
  * v-text、{{}}双大括号方法的调用需要加括号toUpperCase()，而不能是toUpperCase。
  * methods中可以使用父组件的属性和方法。引用时用this。
### 六、计算属性
+ 6.1、用法：
    ```
    <p v-text="getSlice"></p>

    var app=new Vue({
            el:'#app',
            data:{
                test_02:'17798227615'
            },
            computed:{
                getSlice:function(){
                    return this.test_02.slice(0,3)
                }
            }
        })
    ```
+ 6.2、注意：
	* 计算属性引用是不需要加括号的，加括号反而是错的，不同于方法。
	
+ 6.3、计算属性的缓存
	* 当我们的依赖没有发生改变的时候，计算属性不会进行第二次的渲染，我们的计算属性的值可以重复利用。只有当依赖的值发生改变的时候，我们的计算属性才会重新渲染。
	* **当app.test_02的值发生改变的时候，我们的getSlice的值才会发生改变。即计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
	* 如：
	```
	app.test_02='1888888888';
	console.log(app.getSlice);
	<!-- 结果：188 -->
	```

### 七、计算属性和方法的区别：
+ 方法每一次的调用都会执行一次。计算属性只要依赖的值没有发生改变，那么其值就可以一直用，不需要重新渲染。
### 八、观察属性watch:
+ 8.1、watch 是用来观察和响应实例上的数据变化。
+ 8.2、watch的特点：
    *  watch主要时监视父组件的变化，如果发生改变了，就执行watch函数，对数据进行操控。
	*  回调函数没有返回值，回调函数可以执行复杂的任务，比如绘制图形。
	*  属性值没有返回值，所以不适用在表达式中。
+ 8.3、用法：
    ```
    <input type="text" v-model="test_04">
    <p>{{hhh}}</p>

    var app=new Vue({
            el:'#app',
            data:{
                test_04:'222',
                hhh:''
            },
            watch:{
                test_04:function(val){
                    this.hhh=val;
                }
            }
        })
    ```
+ 8.4、如果是想要同步输入和显示的值时，可以直接使用v-model来显示。如：
    ```
    <input type="text" v-model="test_04">
    <p>{{test_04}}</p>
    ```
+ 8.5、上面的例子是当改变的时候，我们的test_04就会随之改变。
+ 8.6、v-model和watch的区别，v-model是数据的来回传递。watch是监视数据的变化，当数据变化的时候，对数据做出相应的动作，但是没有返回值。就如watch中的this.hhh=val,是不可以写成return this.hhh=val。是直接改变数据，而不需要返回。
+ 8.7、计算属性和watch的区别：
	* 计算属性的方法来实现数据的监控:
	```
	<p>{{test_04}}</p>
    <p>{{test04}}</p>

	var app=new Vue({
        el:'#app',
        data:{
            test_04:'222'
        },
        computed:{
            test04:function(){
                return this.test_04;
            }
        }
    })
	```
	* 因为computed存在数据的缓存，当我们依赖项发生变化的时候我们computed会产生重新渲染，会return出新的值。所以当我们的值发生变化的时候，我们通过计算属性也能够得到新的值。
	* 其二、我们计算属性的步骤也相应的会少一点，比wacth简单。

### 九、指令
+ 注意：
	* 指令必须是属性
+ 8.1、v-bind:绑定指令
	* 指令可以接受参数
	如：
	```
	<a v-bind:href="url">百度</a>

	var app=new Vue({
        el:'#app',
        data:{
            url:'http://www.baidu.com'
        }
    })
	```
    * 指令接收关于类的属性的时候，值可以是对象、数组、数组里有对象、用在组件里面。
    如：
    ```
    <!-- 对象： 结果：字是红色 -->
    <p v-bind:class="{active:isActive,error:isError}">啊哈哈哈哈</p>

    var app = new Vue({
        el: '#app',
        data: {
            isActive:false,
            isError:true
        }
    })
    <!-- 数值：结果红色 -->
    <p v-bind:class="['active','error']">啊哈哈哈哈</p><!--里面的值如果是字符串就要加''-->
    var app = new Vue({
        el: '#app',
        data: {
            active:false,
            error:true
        }
    })
    <!-- 数组中有对象：结果：红色 -->
    <p v-bind:class="[{active:isActive},'error']">啊哈哈哈哈</p>
    var app = new Vue({
        el: '#app',
        data: {
            isActive:false,
            error:true
        }
    })
    <!-- 用在组件里面（局部模板注册） -->
    <my-component></my-component>

    var app=new Vue({
        el:"#app",
        data:{
            components:{'my-component':{
                template:'<a class="active">component</a>'
            }
        }
    });
    ```
+ 8.2、v-bind和v-on的缩写：
	* v-bind:   : 
	* v-on:  @
+ 8.3、条件指令 (v-if)
	* v-if/v-else-if/v-else
	```
	<p v-if="test_05">当有test_05时，我显示了。</p>
    <p v-else-if="test_06">当有test_06时，我显示了。</p>
    <p v-else="test_01">当有test_01时，我显示了。</p>
	```
+ 8.4、v-show
	* 
	```
	<p v-show="ok">
    <span>哈哈哈，v-show的方法.</span>
	</p>
	<!-- 结果 :无-->
	<p v-show="ok==false"><!--注意这个时双等于号-->
    	<span>哈哈哈，v-show的方法.</span>
	</p>
	<!-- 结果:出现哈哈哈,v-show的方法 -->

    var app = new Vue({
        el: '#app',
        data: {
            ok: false
        }
    })
	```
### 十、v-show和v-if的区别：
+ v-show:无论是显示或隐藏，其所带的html始终会被渲染出来的。
+ v-if:是满足条件的时候才会被渲染，并且重新构建html，并且在刷新后，就不存在了，需要重新渲染。
+ v-show和v-if:在切换的时候，v-show不会重新渲染，但是if会重新渲染。
+ v-if指令切换时开销大，v-show小。v-if初始渲染时开销小，v-show大。
+ 如：
    ```
    <div id='p2' v-show="fff=='fff'">
        <input type="button" @click="add" value="add">
    </div>

    var item=1;
    var app = new Vue({
        el: '#app',
        data: {
            fff: 'fff'
        },
        methods: {
            add:function(){
                var p2=$("#p2");
                var p=document.createElement("p");
                p.innerHTML=item;
                item+=1;
                p2.append(p);
            }
        }
    ```
    * 上面的v-show，如果满足就可以，如果不满足就不行。然后切换的时候，不需要重新渲染，会展现之前所添加的结果。
    如： app.fff="kkk";那么按钮和所添加的都会被隐藏，如果切回，就会显示我们的按钮和添加的p。
    但是如果时v-if,那么在切换的时候就没有添加的p,只有按钮，需要重新添加p。
### 十一、v-for(列表渲染)
+ 用法

    ```
    <ul>
        <li v-for="(value,index) in box">{{(index+1)}}{{value}}</li>
    </ul>

    var app = new Vue({
        el: '#app',
        data: {
            box:['hahaha','777','99','00']
        },
        components:{'my-component':{
                template:'<a class="active">component</a>'
        }
        
    })

    <!-- 结果 -->
    <ul>
        <li>1hahaha </li>
        <li>2777 </li>
        <li>399 </li>
        <li>400 </li>
    </ul>
    ```
### 十二、过滤器 filters
+ 用法：
    ```
    <p>{{ message | UpperCase}}</p>

    var app = new Vue({
        el: '#app',
        data: {
            message:'eiofjierjfref'
        },
        filters:{
            UpperCase:function(value){
                return value.toUpperCase();
            }
        }
    })
    ```
    * filters中的值是value,不是this.message
### 十三、事件处理
 + 用法：
    ```
    <input type=button @click="test()">
    <!-- 或者是下面的这种事件不加括号 -->
    <input type=button @click="test">

    var app = new Vue({
        el: '#app',
        data: {
       },
        methods: {
            test:function(){
                alert(11);
            }
        }
    })
    ```
    * 注意： 调用的事件可以加括号，也可以不加括号。
### 十四、事件参数
 + 用法：
    ```
    <input type="button" @click="getPageX($event)">

    var app = new Vue({
        el: '#app',
        data: {
            
        },
        methods:{
            getPageX:function($event){
                alert($event.pageX);
                console.log($($event.target).attr('type','text'));
            }
        }
    })

    <!-- 结果 -->
    37
    按钮变成了文本框
    ```
    * 其用法：当我们的事件发生以后，发生那个事件的event会包含我们点击事件的所有的信息，我们可以用来获取我们想要的信息。还有就是所得到的$event是js原生的，如果想要形成jquery时，需要加上$($event.target),将其括起来。
### 十五、事件修饰符
+ 5个事件修饰符
    * .stop
    * .prevent
    * .capture
    * .self
    * .once
+ (.stop)阻止事件冒泡:
    + 用法：
        ```
        <div @click="stop1">
            <input @click.stop="stop2" type="button" value="提交">
        </div>

        var app = new Vue({
        el: '#app',
        data: {
        
        },
        methods:{
        stop1:function(){
            alert(111);
        },
        stop2:function(){
            alert(222);
        }
        }
        })
        ```
        * 注意：阻止事件冒泡，是相对于子元素来讲的。当父元素有点击事件，子元素也有点击事件的时候，我们想要的是点击子元素，而不冒泡父元素，所以是在子元素上加上阻止事件冒泡。所以阻止事件冒泡就是加在我们想要阻止的上面。所以给input加，而不是div。相对来说，这是针对子元素的。 
+ (.prevent)阻止默认事件:
    + 用法：
        ```
        <!-- 没有加入.prevent -->
        <form @submit="setSubmit($event)" action="https://www.baidu.com/s" method="get">
            username:<input type="text" name="wd" id="">
            <input type="submit" value="提交">
        </form>

        var app = new Vue({
        el: '#app',
        data: {
            
        },
        methods:{
            setSubmit:function($event){
                console.log($event);
            }
        }
        })     
        <!-- 结果就是：当我们输入的数据在控制台输出了$event事件相关的参数的后，页面会跳转到百度的搜索我们输入的内容 。-->
        
        <!-- 加入prevent之后 -->
        <form @submit.prevent="setSubmit($event)" action="https://www.baidu.com/s" method="get">
            username:<input type="text" name="wd" id="">
            <input type="submit" value="提交">
        </form>
        <!-- 结果：当我们输入的数据在控制台输出了$event事件相关的参数的后，页面不会发生跳转。 -->
        ```
+ (.capture)捕获冒泡事件:
    + 用法:
        ```
        <div @click.capture="stop1">
            <input @click="stop2" type="button" value="提交哈哈哈">
        </div>

        <!-- 结果是：主要是子元素点击后，先显示有capture的事件，然后再自己 -->




        ```
+ (.self)仅在当前的控件触发事件:
    + 用法:
    ```
    <div @click.self="stop1">
        <input @click="stop2" type="button" value="提交">
    </div>



    ```
    * 注意：当前控件触发事件，就是当父元素和子元素都要自己的点击事件，那个我们在父元素上加上self，我们的子元素就不会受到父元素的影响，而产生冒泡。相对来说，这是针对父元素的。
+ (.once)仅仅执行一次:
    * 仅仅调用一次。
### 十六、其他修饰符
+ 三个修饰符
    * .lazy
    * .number
    * .trim
+ (.lazy)在点击空回车的时候才能够同步
    + 用法：
        ```
        <input v-model.lazy="test_07" type="text">
        <p v-text="test_07"></p>

        var app = new Vue({
        el: '#app',
        data: {
        test_07:'222'
        }
        })
        ```
        * 设置.lazy后，当我们的input中的数据发生变化的时候，我们的p值并没有发生变化，只有当我们按下enter键，才会发生数据的同步。
+ (.number)将其转换为数字类型
    + 用法：
    ```
    <input v-model.number="test_07" type="text">
    <p v-text="test_07+100"></p>


   
    ```
+ (.trim)去掉首尾的空格，即前后的空格
    + 用法:
        ```
        <input type="text" v-model.tirm="test_07">
        <!-- 输入      哈哈哈            -->
        <!-- 结果：哈哈哈 -->


        
        ```
### 十七、组件
+ props的用法：
    * 1.当组件中直接写prop="content",那么我们Js所得到的数据就是字符串。
    * 2.组件中如果是用v-bind来绑定prop，那么：prop="conent",Js得到的javascript表达式。
+ 组件:
    * 全局组件
    * 局部组件
#### 1、全局组件
+ 普通的，直接加如template语句(注意：template不能直接输入文字，必须放在标签中。):
    ```
    Vue.component('student', {
        template: '<a href="https://www.baidu.com/s">百度</a>'
    })

    // 创建根实例
    new Vue({
        el: '#app'
    })
    ``` 
+ template 中加入指令v-for，和data函数(注意：在全局中，data必须是函数。data中必须是return。在template中可以使用插值和指令。):
    ```
    Vue.component('my-component', {
        template: '<ul><li v-if="kkk" @click="test" v-for="one in students">{{content+ one | length }}</li></ul>',
        data: function () {
            return {
                kkk: true,
                name: '周泽琴',
                studentNumber: 142203201129,
                age: 23,
                habby: '迪丽热巴',
                students: [333, 35354333, 555, 66345346, 88354358, 999, 10, 343, 5454, 434434]
            }
        },
        props:['content'],
        methods: {
            test: function () {
                alert('成功');
            }
        },
        filters: {
            length: function (value) {
                if (value < 1000) {
                    return value;
                }
            }
        }
    })

    ```
    * 注意：
        * 1.template禁止直接添加文字，文字必须放在标签中。
        * 2.props:['content'] ,里面的content和我们所创建的`<my-component content="Hellow world"></my-component>`属性content保持一致，然后在template中`template: '<ul><li v-if="kkk" @click="test" v-for="one in students">{{content+ one | length }}`运用。过程就是我们自己先定义属性，前端来传值，传来的值，模板使用。这种方法来实现前台数据和后台交互的原理。
        * 3.data必须是函数，且值必须用return来返回，可以是对象形式。
        * 4.template中，标签中可以使用我们vue 的指令或者是插值，仅仅在template中运用。前台`<my-component content="Hellow world"></my-component>`是不可以用后台的模板中的数据的。
        * 5.模板中可以像实例一样，可以定义data(必须是函数)、方法、过滤器等，template可以直接引用。
        * 6.如果前台想要使用指令，那么必须使用一些手段，下面的知识点会讲到。
        * 7.data和props的区别:
            * data传递的内容较多，结构复杂。props内容少，结构单一。
        * 8.组件属性不支持驼峰命名，必须使用‘-’，但是模板中都可以使用。
        * 9.动态的prop:当组件的值想要后台动态生成的话，那么可以用`v-bind:prop='msg'`,来实现，且msg在后台的实例中申明。如下：
        ```
        <my-component v-bind:content="msg"></my-component>
        <!-- 结果： heihei333....  -->
        // 创建根实例
        new Vue({
            el: '#app',
            data: {
                bar: 'hahhaha',
                test: 'errror',
                msg:'heihei'
            },
            methods: {
                doTheThing: function () {
                    alert(".native");
                }
            }
        })


        ```
        * 10.字面量语法和动态的prop(字面量会将值读为字符串。动态的读为javascript语言，所以是数值):
        ```
        <!-- 字面量语法:传递了一个字符串 "1" -->
        <comp some-prop="1"></comp>

        <!-- 动态的prop:传递真正的数值 -->
        <comp v-bind:some-prop="1"></comp>


        ```
#### 2、局部组件
+ 用法：
    ```
    <inner-component v-for="value in values" :value="value"></inner-component>

    // 创建根实例
    new Vue({
        el: '#app',
        data: {
            bar: 'hahhaha',
            test: 'errror',
            msg: 'heihei',
            values: ['用户名', '密码', '昵称']
        },
        methods: {
            doTheThing: function () {
                alert(".native");
            }
        },
        components: {
            'inner-component': {
                template: '<div>{{value}}:<input type="text" :placeholder="value"></div>',
                props:['value']
            }
        },
    })


    ```
    * 注意：
        + 局部组件是中的插值是根据prop来传递的，如果没有prop话，是不能传值的。
        + 组件可以直接使用实例中的数据。
#### 3、非父子组件的通信
+ 用法：
    ```
    <!-- HTML -->
    <div id="app">
        <my-component1 @test="test1"></my-component1>
        <my-component2 ></my-component2>
    </div>

    <!-- 结果：点击哈哈哈哈，弹出对话框，显示listen1监听成功! -->

    <!-- script -->
    var listen1 = new Vue();
    Vue.component(
        'my-component1', {
            template: '<div @click="test2">哈哈哈哈</div>',
            methods:{
                test2:function(){
                    listen1.$emit('test');
                }
            }
        }
    )

    Vue.component(
        'my-component2', {
            template: '<div>嘿嘿嘿嘿</div>',
            methods: {
                test2: function () {
                    alert('我是第二个');
                }
            },
            mounted: function () {
                listen1.$on('test', function () {
                    alert('listen1监听成功!');
                })
            }
        }
    )

    new Vue({
        el: '#app',
        methods: {
            test1: function () {
                alert('初始绑定的tes1的事件，但是现在数不出来!')
            }
        }
    })

    ```
    * 注意：
        * 非父子关系的两个组件之间也需要通信。在简单的场景下，可以使用一个空的 Vue 实例作为事件总线:
            * 
            ```
            var bus = new Vue()

            ```
            * // 触发组件 A 中的事件
            ```
            <!-- 这个是需要在A组件事件@click="test2"触发之后，发生的事件, -->
            bus.$emit('id-selected', 1)

            ```
            * // 在组件 B 创建的钩子中监听事件
            ```
            bus.$on('id-selected', function (id) {
            // ...
            })

            ```
        * 非父子组件的监听，实质上是当我们的组件1@click="test2"点击之后，然后触发listen1.$emit('test');，然后我们通过组件二的钩子来监听事件，并做出相应的处理。
        ```
        mounted: function () {
            listen1.$on('test', function () {
                alert('listen1监听成功!');
            })
        }

        ```
        * 3.就是当我们将listen1改为this,那么结果将会是`初始绑定的tes1的事件，但是现在数不出来!`
        ```
        methods:{
            test2:function(){
                listen1.$emit('test');
            }
        }

        ```
        * 这里的test1是需要在实例的methods中来定义。
#### 4、使用插槽分发内容
+ 除非子组件模板包含至少一个 `<slot> `插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。
##### 4.1、单个插槽：
+ 用法：
    ```
    <!-- HTML -->
    <div id="app">
        <div>
            哈哈哈哈
            <child-component>
                <p>
                    我是一个P标签
                    <p>11111</p>
                    <p>22222</p>
                    <p>3333</p>
                </p>
            </child-component>
        </div>
    </div>
    <!-- 结果：`
    哈哈哈哈
    我是子组件的内容，我将要替代负组件的内容
    我是一个P标签
    11111
    22222
    3333
    ` -->

    <!-- script -->
    Vue.component(
        'child-component',{
            template:`
            <div>
            我是子组件的内容，我将要替代负组件的内容
                <slot>
                    当父组件没有内容的时候，我们会显示。
                </slot>
            </div>
            `
        }
    )
    new Vue({
        el:'#app'
    })

    ```
##### 4.2、具名插槽：
+ 用法：
    ```
    <!-- HTML -->
    <my-component>
        <div slot="ha">
            <p>33333</p>
            <p>33333</p>
            <p>33333</p>
            <p>33333</p>
            <p>33333</p>
        </div>
        <div slot="hei">
            <p>444444</p>
            <p>444444</p>
            <p>444444</p>
            <p>444444</p>
            <p>444444</p>
        </div>
        <div slot="hai">
            <p>99999</p>
            <p>99999</p>
            <p>99999</p>
            <p>99999</p>
        </div>
    </my-component>

    <!-- 结果：-->
    `
    <div>
        具名插槽：
        <div>
            <div>
                <p>33333</p>
                <p>33333</p>
                <p>33333</p>
                <p>33333</p>
                <p>33333</p>
            </div>
        </div>
        <div>
            <p>444444</p>
            <p>444444</p>
            <p>444444</p>
            <p>444444</p>
            <p>444444</p>
        </div>
        <div>
            <p>
                <div>
                    <p>99999</p>
                    <p>99999</p>
                    <p>99999</p>
                    <p>99999</p>
                </div>
            </p>
        </div>
    </div>
    `


    <!--  Javascript -->
    Vue.component(
        'my-component',{
            template:`
            <div>
            具名插槽：
                <div>
                    <slot name="ha">显示ha</slot>
                </div>
                <slot name="hei">显示hei</slot>
                <div>
                    <p>
                        <slot name="hai">显示hai</slot>
                    </p>
                </div>
            </div>
            `
        }
    )

    ```
    * 当使用具名插槽的时候，我们的slot标签设置的name的值和我们父组件拥有的slot属性的值相同的时候，则用这部分父组件来覆盖我们对应的子组件slot的部分。
##### 4.3、作用域插值：
+ 用法：
    ```
    <div>
        <cump>
            <p slot-scope="props">{{props.text}}</p>
        </cump>
    </div>

    <!-- 结果：-->
    `
    <div>
        <div>
            <div>
                <p>
                    我是想要取代的那部分
                    <p>Hello world!</p>
                </p>
            </div>
        </div>
    </div>
    `

    <!-- javascript -->
    Vue.component(
        'cump',{
            template:`
                <div>
                    <div>
                        <p>
                            我是想要取代的那部分
                            <slot text="Hello world!"></slot>
                        </p>
                    </div>
                </div>
            `
        }
    )

    ```
    * 在父级中，具有特殊特性 slot-scope 的 `<template> `元素必须存在，表示它是作用域插槽的模板。slot-scope 的值将被用作一个临时变量名，此变量接收从子组件传递过来的 prop 对象。
    * 在 2.5.0+，slot-scope 能被用在任意元素或组件中而不再局限于 `<template>`
        * 作用域插槽更典型的用例是在列表组件中，允许使用者自定义如何渲染列表的每一项：
        ```
        <!-- HTML -->
        <div>
            <tryn>
                <li slot="ttt" slot-scope="props" >{{props.text.text}}</li>
            </tryn> 
        </div>    
        <!-- 结果： -->
        `
        <div>
            <div>
                <li>hahahha</li>
                <li>heiheihei</li>
                <li>555555</li>
                <li>222222</li>
            </div>
        </div>
        `
        <!-- javascript -->
        Vue.component(
            'tryn',{
                template:`
                <div>
                    <slot name="ttt" v-for="item in items" :text="item" ></slot>
                </div>
                `,
                data:function(){
                    return {
                        items:[
                            {text:'hahahha'},
                            {text:'heiheihei'},
                            {text:'555555'},
                            {text:'222222'}
                        ]
                    }
                }
            }
        )
        
        ```
        * 子组件中的:text="item"，是为了绑定我们的v-for="item in items"中的itemi奥大是，才会是javascript表达式，如果没有运用绑定，我们将得不到动态得值，只能是item字符串。还有父组件中得props.text.text，因为props对应得是text='item',然而item又为{text:'hahahha'}，想要得到最终得值，则需要props.text.text。
        * 在 2.5.0+，slot-scope 能被用在任意元素或组件中而不再局限于 `<template>`。
##### 4.4、解构
+ 用法：
    ```
    <!-- HTML -->
    <div>
        <ui>
            <p slot-scope="{text,he}">{{text+he}}+{{he}}</p>
        </ui>
    </div>
    <!-- 结果： -->
    `
    <div>
        <div>
            <p>嘿嘿active,error+[ "active", "error" ]
            </p>
        </div>
    </div>    

    <!-- javascript -->
    Vue.component(
        'ui',{
        template:'<div><slot :text="msg" :he="yyy"></slot></div>',
        data:function(){
            return {
                msg:'嘿嘿',
                yyy:['active','error']
            }
        }  
        }
    )
    `

    ```
    * props得值，就是slot中得某些属性，如果这些属性没有使用绑定，那么会直接输出他们得值。如果使用了绑定，那么值就是绑定得属性得值，可以在子组件中动态的改变。
    * slot-scope 的值实际上是一个可以出现在函数签名参数位置的合法的 JavaScript 表达式。这意味着在受支持的环境 (单文件组件或现代浏览器) 中，您还可以在表达式中使用 ES2015 解构。
#### 4、动态组件
+ 定义：通过使用保留的 `<component> `元素，动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换。
+ 用法：
    ```
    <!-- HTML -->
    <div id="app">
        <component :is="r"></component>
        <component :is="e"></component>
        <component :is="a"></component>
        <component :is="d"></component>
        <component :is="i"></component>
    </div>

    <!-- 结果： -->
    `
    <div id="app">
        <p>我是第二个</p>
        <span>我是第一个</span>
        <div>我是第三个</div>
        <b>我是第四个</b>
        <div style="color: red;">这是外面定义的一个模板</div>
    </div>
    `

    <!-- javascript -->
    var oooo={
    template:'<div style="color:red">这是外面定义的一个模板</div>'
    }
    new Vue({
        el:'#app',
        data:{
            r:'yyyy',
            e:'home',
            a:'iiii',
            d:'uuuu',
            i:oooo
        },
        components:{
            home:{template:'<span>我是第一个</span>'},
            yyyy:{template:'<p>我是第二个</p>'},
            iiii:{template:'<div>我是第三个</div>'},
            uuuu:{template:'<b>我是第四个</b>'}
        }
    })

    ```
    * 1.使用的局部变量。
    * 2.局部变量可以在实例中定义，也可以在实例外定义。当在实例中定义的时候，如上components中的。在实例外定义的话像oooo的定义。
    * 3.在实例外定义，引用的时候，只能当作一个对象 `i:oooo`，不能加引号。在实例中定义，就是需要加引号，如：`r:'yyyy'`。
+ `keep-alive`如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数：
    * 用法：
    ```
    <keep-alive>
        <component :is="currentView">
            <!-- 非活动组件将被缓存！ -->
        </component>
    </keep-alive>

    ```
#### 5 、杂项  
##### 5.1、编写可复用的组件
+ 在编写组件时，最好考虑好以后是否要进行复用。一次性组件间有紧密的耦合没关系，但是可复用组件应当定义一个清晰的公开接口，同时也不要对其使用的外层数据作出任何假设。
+ Vue 组件的 API 来自三部分——prop、事件和插槽：
    + Prop 允许外部环境传递数据给组件；
    + 事件允许从组件内触发外部环境的副作用；
    + 插槽允许外部环境将额外的内容组合在组件中。
##### 5.2、组件命名的约定
+ 一般的组件都是运用"-"的形式,子组件可以任意的使用     
##### 5.3、子组件的引用
+ 使用方法:尽管有 prop 和事件，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 ref 为子组件指定一个引用 ID。例如：`<component ref="profile"></component>`.
+ 用法：
    ```
    <component ref="profile"></component>

    <!-- 结果:78887 -->

    Vue.component(
        'component',{
            template:'<div>我只是一下小小的跟班</div>',
            data:function(){
                return {
                    'oooo':'78887'
                }
            }
        }
    )

    var app=new Vue({
        el:'#app'
    })

    var chlid=app.$refs.profile;
    console.log(chlid.$data.oooo);
    ```
    * 注意:
        * 当 ref 和 v-for 一起使用时，获取到的引用会是一个数组，包含和循环数据源对应的子组件。
        * $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅是一个直接操作子组件的应急方案——应当避免在模板或计算属性中使用 $refs。
##### 5.4 、内联模板
+ 如果子组件有 inline-template 特性，组件将把它的内容当作它的模板，而不是把它当作分发内容。这让模板编写起来更灵活。
+ 用法：
    ```
    <my-component inline-template>
        <div>
            <div>小跟班</div>
            <p>我是第一个</p>
            <p>我是第一个</p>
            <p>我是第一个</p>
            <p>我是第一个</p>
            <p>我是第一个</p>
        </div>
    </my-component>

    <!-- 结果 -->
    `
    <div>
        <div>小跟班</div>
        <p>我是第一个</p>
        <p>我是第一个</p>
        <p>我是第一个</p>
        <p>我是第一个</p>
        <p>我是第一个</p>
    </div>
    `

    Vue.component(
        'my-component',{
            template:''
        }
    )
    ```
    * 组件中可以直接插入我们想要的内容,但是这个内容只允许所有的一个子元.像下面这种是不行的,下面的这种,模板下的直接子元素有两个:
    `
    <my-component inline-template>
       <div>小跟班</div>
        <div>
            <p>我是第一个</p>
            <p>我是第一个</p>
            <p>我是第一个</p>
            <p>我是第一个</p>
            <p>我是第一个</p>
        </div>
    </my-component>
    `
    * 内联组件直接在组件中输入想要的内容在直接子元素中,可以添加任意,然后在组件中加入`inline-template`,然后在js中定义模板的名字.
##### 5.5 、组件间的循环引用
+ 用法：
    ```
    <tree-folder>
        <tree-folder-contents></tree-folder-contents>
    </tree-folder>
    <tree-folder>
        <tree-folder-contents></tree-folder-contents>
    </tree-folder>

    <!-- 结果 -->
    `
    <p>
        <span>我是首页</span>
        <ul children="[object Object],[object Object],[object Object],[object Object],[object Object]">
            <li>
                <span>hhh</span>
            </li>
            <li>
                <span>ooo</span>
            </li>
            <li>
                <span>hhh</span>
            </li>
            <li>
                <span>hhh</span>
            </li>
            <li>
                <span>hhh</span>
            </li>
        </ul>
    </p>
    `

    
    Vue.component(
        'tree-folder', {
            template:
                `
            <p>
                <span>{{ folder.name }}</span>
                <tree-folder-contents :children="folder.children" />
            </p>
            `,
            data: function () {
                return {
                    folder: { name: "我是首页", children: [{name:'hhh'}, {name:'ooo'},{name:'hhh'},{name:'hhh'},{name:'hhh'}] }
                }
            }
        }
    )
    Vue.component(
        'tree-folder-contents', {
            template:
                ` 
            <ul>
                <li v-for="child in children">
                    <tree-folder v-if="child.children" :folder="child" />
                    <span v-else>{{ child.name }}</span>
                </li>
            </ul>
        `
        ,
        data: function () {
            return {
                children: [{name:'hhh'}, {name:'ooo'},{name:'hhh'},{name:'hhh'},{name:'hhh'}]
            }
        }
        }
    )
    new Vue({
        el: '#app'
    })

    ```
    * 这段并没有弄清楚,组件中循环引用后,数据如何传递没有明白.比如children,不应该像我那样.
    * (这个也没有看懂.) 在我们的例子中，可以选择让 tree-folder 组件中来做这件事。我们知道引起矛盾的子组件是 tree-folder-contents，所以我们要等到 beforeCreate 生命周期钩子中才去注册它：
    `
    beforeCreate: function () {
    this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
    }

    `
##### 5.6 、x-template
+ 另一种定义模板的方式是在 JavaScript 标签里使用 text/x-template 类型，并且指定一个 id。例如：
+ 用法：
    ```
    
    <script type="text/x-template" id="hello-world-template">
    <p>Hello hello hello</p>
    </script>

    Vue.component('hello-world', {
    template: '#hello-world-template'
    })

    ```
    * 这在有很多大模板的演示应用或者特别小的应用中可能有用，其它场合应该避免使用，因为这将模板和组件的其它定义分离了。
##### 5.7 、对低开销的静态组件使用v-once
+ 尽管在 Vue 中渲染 HTML 很快，不过当组件中包含大量静态内容时，可以考虑使用 v-once 将渲染结果缓存起来，就像这样：
+ 用法：
    ```
    Vue.component('terms-of-service', {
    template: '\
        <div v-once>\
        <h1>Terms of Service</h1>\
        ...很多静态内容...\
        </div>\
    '
    })

    ```
### 十八、可复用性&组合
#### 1、混合
##### 1.1、基础

##### 1.2、选项合并
##### 1.3、全局混合
##### 1.4、自定义选项合并策略
#### 2、自定义指令
##### 2.1、简介
+ 局部的用法：
    ```
    <div id="app">
        <input v-focus>
    </div>
    <!-- 结果：input真的能够自动的获取焦点 -->

    new Vue({
        el:'#app',
        directives: {
            focus: {
            // 指令的定义
            inserted: function (el) {
                el.focus()
            }
            }
        }
    })

    ```
+ 全局的用法：
    ```
    <div id="app">
        <input v-focus>
    </div>
    <!-- 结果：input真的能够自动的获取焦点 -->
    Vue.directive('focus',{
        // 指令的定义
        inserted: function (el) {
            el.focus()
        }
    })
    new Vue({
        el:'#app'
    })

    ```
    * 注意：
        * el就是我们的元素
        * 在inserted中，我们可以对el进行其他复杂的操作
        `
        inserted: function (el) {
                el.setAttribute('placeholder','(｡･∀･)ﾉﾞ嗨');
                el.style.color="red";
                el.style.width="300px";
        }

        `
#### 3、渲染函数&JSX(与用于模板组件的创建)
+ 1、Vue 推荐在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力，这就是 render 函数，它比 template 更接近编译器。
+ 2、template和render函数的各自的优点:
    * template对于复杂的模板使用起来更加的方便，但是对于重复率比较高的html来说，我们可以考虑运用render函数来代替。vue推荐绝大多数的模板都是运用:
        ```
        <div id="app">
            <my-component v-for="msg in nums" :key="msg"  :level="msg" :color="colors[Math.floor(Math.random() * colors.length)]" ></my-component>
        </div>

        Vue.component('my-component', {
            render: function (createElement) {
                return createElement(
                    "h" + this.level,
                    {
                        class: {
                            active: true,
                            error: false
                        }
                        // ,
                        // domProps:{
                        //     innerHTML:'哈哈哈'
                        // }
                        ,
                        style: {
                            color: this.color,
                            fontSize: '20px'
                        },
                        on: {
                            click: this.demo
                        }
                    }
                    ,
                    [
                        createElement('a',
                            {

                                style: {
                                    color: this.color
                                }
                            },
                            [
                                createElement('span',
                                    {
                                        style: {
                                            color: this.color
                                        },
                                        domProps: {
                                            innerHTML: '我是span' + this.level
                                        }

                                    }
                                )
                            ]
                        )
                    ]
                )
            },
            props: ['level', 'color'],
            methods: {
                demo: function () {
                    alert('成功之后，我将会显示，我是h的绑定事件');
                }
            }
        })
        var vm = new Vue({
            el: '#app',
            data: {
                nums: [1, 2, 3, 4, 5, 6],
                colors: ['red', 'pink', 'yellow', 'green', 'blue', 'grey', 'black']
            },
            methods: {

            }
        })


        ```
        * 在使用render的过程中，首先创建标签的data里面的domProps:{innerHTML:'hahah'},如果添加了innerHTML,那么后面的子节点将无效，因为被innerHTML覆盖了。
        * 和render并列的props里面的值，所有的子元素都可以用，也可以定义。还可以定义事件，函数等等。
        * 还可以创建兄弟节点，如下:
            ```
            [
                createElement('span',
                    {
                        style: {
                            color: this.color
                        },
                        domProps: {
                            innerHTML: '我是span' + this.level
                        }
                    }
                ),
                createElement('span',
                    {
                        style: {
                            color: this.color
                        },
                        domProps: {
                            innerHTML: '我是span' + this.level
                        }
                    }
                )
            ]

            ```
            * 创建了两个span，他们彼此为兄弟节点。
        * 
        * 约束：VNodes 必须唯一，组件树中的所有 VNodes 必须是唯一的。这意味着，下面的 render function 是无效的:
            ```
            render: function (createElement) {
                var myParagraphVNode = createElement('p', 'hi')
                return createElement('div', [
                    // 错误-重复的 VNodes
                    myParagraphVNode, myParagraphVNode
                ])
            }

            ```
            * 但是亲生的经历告诉自己，也是可以使用上面的多个VNodes,并没有报错。
        * 官方提出了一个新的解决想要重复利用Vnode的方案。如果你真的需要重复很多次的元素/组件，你可以使用工厂函数来实现。例如，下面这个例子 render 函数完美有效地渲染了 20 个重复的段落:
            ```
            render: function (createElement) {
                return createElement('div',
                    Array.apply(null, { length: 20 }).map(function () {
                        return createElement('p', 'hi')
                    })
                )
            }
            ```
            * 新增知识：map的使用方法:
                * 第一：map的基本的语法:
                    ```
                    array.map(callback,[ thisObject]);

                    ```
                    * callback可以是下面我们所说的函数、String、Number等等。
                * map原理的实质是：由于map()方法定义在JavaScript的Array中，我们调用Array的map()方法，传入我们自己的函数，就得到了一个新的Array作为结果,map是将数组中的每一项进行自己的运算后返回一个新的数组。所以map(),括号中可以是函数，函数必须有返回值，这样才能被插入新的数组中。也可以是String，是将每一项变成字符串，如：data=[1,2,4,6,7],data.map(String),所得到的结果是['1','2','4','6','7']。也可以是number。
                ```
                var array=[1,3,4,5,6,7,44,23];
                function pow(x){
                return x*x;
                }
                <!-- map()传入的参数是pow，即函数对象本身 -->
                var t=array.map(pow);
                console.log(t);<!--[1, 9, 16, 25, 36, 49, 1936, 529]-->

                function add(x){
                x+30;
                }
                var m=array.map(add);
                console.log(m);<!--[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]-->
                m.forEach(console.log);<!--undefined 0 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
                eleven.js:30 undefined 1 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
                eleven.js:30 undefined 2 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
                eleven.js:30 undefined 3 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
                eleven.js:30 undefined 4 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
                eleven.js:30 undefined 5 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
                eleven.js:30 undefined 6 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
                eleven.js:30 undefined 7 [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]-->

                ```
                * 所以，map()作为高阶函数，事实上它把运算规则抽象了，因此，我们不但可以计算简单的f(x)=x2，还可以计算任意复杂的函数，比如，把Array的所有数字转为字符串：
                    ```
                    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
                    只需要一行代码。

                    ```
                    * 
                * 还可以获取数组中对象特定属性的值，如下:
                    ```
                    var i=array.map(function(x){
                        return {"email":'@'+x}
                    })
                    var r=i.map(function(x){
                        return x.email;
                    })
                    console.log(r);

                    ```
                    * 上面，我是先将数组转换成对象，将对象中的值给取出来。
                * 总结一下：map(),括号中是遍历的每一项，我们可以运用函数，或者直接是转换的类型，等对我们的每一项进行操作，然后返回新的数组的过程，实质是操作数组中每一项，然后返回新数组的过程。还有就是Array.prototype扩展可以让IE6-IE8浏览器也支持map方法：如：http://www.zhangxinxu.com/study/201304/array-map.html,张鑫旭的博客。
                
            * 新增知识：reduce的使用方法:
                * 再看reduce的用法。Array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算，其效果就是:
                    ```
                    var t=array.reduce(function(x,y){
                        return parseInt(x)*parseInt(y);
                    });
                    //var array=[1,3,4,5,6,7,44,23];
                    console.log(t);//2550240

                    ```
                * 总结：reduce就是将我们的数组中的每一项进行累乘的过程。
            * 新增知识点Array.apply(null,{length:20})的用法，解析可以看这篇博客：https://www.cnblogs.com/afeihome/p/6750539.html

+ 3、v-if 和 v-for
    * 由于使用原生的 JavaScript 来实现某些东西很简单，Vue 的 render 函数没有提供专用的 API。比如，template 中的 v-if 和 v-for：
    ```
    <ul v-if="items.length">
    <li v-for="item in items">{{ item.name }}</li>
    </ul>
    <p v-else>No items found.</p>
    
    ```
    * 这些都会在 render 函数中被 JavaScript 的 if/else 和 map 重写：
        ```
        render: function (createElement) {
            if (this.items.length) {
                return createElement('ul', this.items.map(function (item) {
                return createElement('li', item.name)
                }))
            } else {
                return createElement('p', 'No items found.')
            }
        } 
        
        ```
+ 4、v-model
    * render 函数中没有与 v-model 相应的 api - 你必须自己来实现相应的逻辑：
    ```
    render: function (createElement) {
        var self = this
        return createElement('input', {
            domProps: {
            value: self.value
            },
            on: {
            input: function (event) {
                self.value = event.target.value
                self.$emit('input', event.target.value)
            }
            }
        })
    }
    
    ```
    * 这就是深入底层要付出的，尽管麻烦了一些，但相对于 v-model 来说，你可以更灵活地控制。    
+ 5、事件 & 按键修饰符

    * 5.1、对于 .passive、.capture 和 .once事件修饰符, Vue 提供了相应的前缀可以用于 on：
       ```
        Modifier(s)	Prefix
        .passive	&
        .capture	!
        .once	~
        .capture.once or
        .once.capture	~!

        ```
    * 5.2、例如:
        ```
        on: {
        '!click': this.doThisInCapturingMode,
        '~keyup': this.doThisOnce,
        `~!mouseover`: this.doThisOnceInCapturingMode
        }
        
        ```
    * 5.3、对于其他的修饰符，前缀不是很重要，因为你可以在事件处理函数中使用事件方法：
        ```    
        Modifier(s)	Equivalent in Handler
            .stop	event.stopPropagation()
            .prevent	event.preventDefault()
            .self	if (event.target !== event.currentTarget) return
            Keys:
            .enter, .13	if (event.keyCode !== 13) return (change 13 to another key code for other key modifiers)
            Modifiers Keys:
            .ctrl, .alt, .shift, .meta	if (!event.ctrlKey) return (change ctrlKey to altKey, shiftKey, or metaKey, respectively)
        
        ```
    * 5.4、这里是一个使用所有修饰符的例子：
        ```
            on: {
                keyup: function (event) {
                    // 如果触发事件的元素不是事件绑定的元素
                    // 则返回
                    if (event.target !== event.currentTarget) return
                    // 如果按下去的不是 enter 键或者
                    // 没有同时按下 shift 键
                    // 则返回
                    if (!event.shiftKey || event.keyCode !== 13) return
                    // 阻止 事件冒泡
                    event.stopPropagation()
                    // 阻止该元素默认的 keyup 事件
                    event.preventDefault()
                    // ...
                }
            }
        
        ```
+ 6、插槽
    * 6.1 你可以从 this.$slots 获取 VNodes 列表中的静态内容：
        ```
        render: function (createElement) {
        // `<div><slot></slot></div>`
        return createElement('div', this.$slots.default)
        }

        ```
    * 6.2 还可以从 this.$scopedSlots 中获得能用作函数的作用域插槽，这个函数返回 VNodes：
        ```
        render: function (createElement) {
        // `<div><slot :text="msg"></slot></div>`
        return createElement('div', [
            this.$scopedSlots.default({
            text: this.msg
            })
        ])
        }

        ```
    * 6.3  如果要用渲染函数向子组件中传递作用域插槽，可以利用 VNode 数据中的 scopedSlots 域：
        ```
        render (createElement) {
        return createElement('div', [
            createElement('child', {
            // pass `scopedSlots` in the data object
            // in the form of { name: props => VNode | Array<VNode> }
            scopedSlots: {
                default: function (props) {
                return createElement('span', props.text)
                }
            }
            })
        ])
        }

        ```
#### 4、插件
#### 5、过滤器


    

     




    










