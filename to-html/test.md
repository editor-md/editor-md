
<div><p>$$<br>\begin{eqnarray*}<br>f(x) = 3^x<br>\end{eqnarray*}<br>$$</p></div>

我们可以看出从 `DOMContentLoaded` 和 `Load` 两个值来比较，`flex` 模型的性能都是优于 `float` 模型的。


<details class = 'info' open>
<summary>目录</summary>

[TOC]

</details>

# 主要特性


- 支持“标准”Markdown / CommonMark和Github风格的语法，也可变身为代码编辑器；
- 支持实时预览、图片（跨域）上传、预格式文本/代码/表格插入、代码折叠、搜索替换、只读模式、自定义样式主题和多语言语法高亮等功能；
- 支持ToC（Table of Contents）、Emoji表情、Task lists、@链接等Markdown扩展语法；
- 支持TeX科学公式（基于KaTeX）、流程图 Flowchart 和 时序图 Sequence Diagram;
- 支持识别和解析HTML标签，并且支持自定义过滤标签解析，具有可靠的安全性和几乎无限的扩展性；
- 支持 AMD / CMD 模块化加载（支持 Require.js & Sea.js），并且支持自定义扩展插件；
- 兼容主流的浏览器（IE8+）和Zepto.js，且支持iPad等平板设备；
- 支持自定义主题样式；

# Editor.md

![](./Editor.md/img/editormd-logo-180x180.png)



# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
# Heading 1 link [Heading link](https://github.com/pandao/editor.md "Heading link")
## Heading 2 link [Heading link](https://github.com/pandao/editor.md "Heading link")
### Heading 3 link [Heading link](https://github.com/pandao/editor.md "Heading link")
#### Heading 4 link [Heading link](https://github.com/pandao/editor.md "Heading link") Heading link [Heading link](https://github.com/pandao/editor.md "Heading link")
##### Heading 5 link [Heading link](https://github.com/pandao/editor.md "Heading link")
###### Heading 6 link [Heading link](https://github.com/pandao/editor.md "Heading link")

#### 标题（用底线的形式）Heading (underline)

This is an H1
=============

This is an H2
-------------

### 表格

|                           Name                           |Date|Award|Rank|Solved|A|B|C|D|E|F|G|H|I|J|K|L|M|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|                        2018 ZJPSC$2^x$                   |2018.4.29|Bronze|86|6/13|O|O|.|.|.|.|.|.|.|O|O|O|O|
|                  2018 CCPC Jilin Onsite                  |2018.9.22|Bronze|95|5/12|O|O|O|O|O|.|.|.|.|.|.|.|
|                2018 ICPC Shenyang Onsite                 |2018.10.21|Bronze|74|2/13|.|.|O|.|.|.|.|.|.|O|.|.|.|
|                2018 ICPC Tsingdao Onsite                 |2018.11.4|Honorable|241|3/13|.|.|O|.|.|.|.|.|.|O|.|.|O|
|                     2018 CCPC Final                      |2018.11.25|Bronze|43|5/12|O|O|.|.|.|.|O|.|O|.|.|O|
|                        2019 ZJPSC                        |2019.4.27|Gold|7|9/13|.|O|O|.|O|O|O|O|O|O|O|.|.|
|2019 ICPC China Nanchang Invitational Programming Contest|2019.6.1|Silver|64|5/12|.|.|.|.|.|O|O|.|.|O|O|O|
|              2019 CCPC Qinghuangdao Onsite               |2019.9.22|Bronze|80|4/12|O|.|.|O|.|O|.|.|O|.|.|.|
|                 2019 CCPC Xiamen Onsite                  |2019.10.22|Silver|36|5/12|O|.|.|O|.|.|O|O|.|O|.|.|
|                 2019 ICPC Nanjing Onsite                 |2019.10.27|Silver|40|5/11|O|.|O|.|.|O|.|O|.|.|O|
|                2019 ICPC Nanchang Onsite                 |2019.11.10|Gold|28|5/13|.|.|O|.|O|.|O|.|.|.|O|O|.|
|                     2019 CCPC Final                      |2019.11.17|Honorable|91|3/12 |O|.|.|.|.|.|.|.|.|.|O|O|
|                    2019 ICPC EC Final                    |2019.12.15|Silver|87|4/13|O|.|.|.|O|.|.|O|.|.|.|.|O|

|Name|Score|
|:-:|:-:|
|Dup4|0|

### 内容折叠


<details class = 'success'>
<summary>成功</summary>

```math
$$
\begin{eqnarray*}
f(x) &=& 2^x \\
g(x) &=& 3^x
\end{eqnarray*}
$$
```

```math
$$
\begin{eqnarray*}
f(x) &=& 2^x \\
g(x) &=& 3^x
\end{eqnarray*}
$$
```

```cpp
#include <bits/stdc++.h>
using namespace std;
$$2^x$$
```

</details>

<details class = 'info'>
<summary>信息</summary>

每一行输入$n$个数，$2^x$, 最终以$2^n$结尾。

```math
$$
\sum\limits_{i = 1}^n 2^i
$$
```

```math
$$
\begin{eqnarray*}
f(x) &=& 2^x \\
g(x) &=& 3^x
\end{eqnarray*}
$$
```

```math
$$
\begin{eqnarray*}
f(x) = 2^x
\end{eqnarray*}
$$
```


```math
$$
\begin{eqnarray*}
f(x) = 2^x
\end{eqnarray*}
$$
```

```math
$$
\left( \sum\limits_{k=1}^n a_k b_k \right)^2
\leq
\left( \sum\limits_{k=1}^n a_k^2 \right)
\left( \sum\limits_{k=1}^n b_k^2 \right)$$$$\displaystyle 
    \frac{1}{
        \Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{
        \frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {
        1+\frac{e^{-6\pi}}
        {1+\frac{e^{-8\pi}}
         {1+\cdots} }
        } 
    }$$$$f(x) = \int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi x}
    \,d\xi
$$
```


```cpp
#include <bits/stdc++.h>
using namespace std;
```

</details>

<details class = 'danger'>
<summary>危险</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
```

</details>

<details class = 'note'>
<summary>笔记</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

#define dbg(x...) do { cout << "\033[32;1m" << #x << " -> "; err(x); } while (0) 
void err() { cout << "\033[39;0m" << endl; } 
template <class T, class... Ts> void err(const T& arg, const Ts&... args) { cout << arg << ' '; err(args...); }

const int mod = 1e9 + 7;
const int N = 5e3 + 10;
int n, S, B, f[N][N];

ll qpow(ll base, ll n) {
	ll res = 1;
	while (n) {
		if (n & 1) res = res * base % mod;
		base = base * base % mod;
		n >>= 1;
	}
	return res;
}

ll inv(ll x, ll mod) { return qpow(x, mod - 2); }

int main() {
	scanf("%d%d", &S, &B);
	n = B;
	memset(f, 0, sizeof f);
	for (int i = 0; i <= n; ++i) f[i][0] = 1, f[1][i] = 1;
	for (int i = 2; i <= n; ++i) {
		for (int j = 1; j < i; ++j) {
			f[i][j] = f[j][j];
		}
		for (int j = i; j <= n; ++j) {
			f[i][j] = (f[i - 1][j] + f[i][j - i]) % mod;
		}
	}
	ll res = 0;
	for (int i = 1; i < S; ++i) {
		for (int j = 0; j <= B - S; ++j) {
			dbg(i, j, S - i, B - S - j, f[i][j], f[S - i][B - S - j]);
			res += 1ll * f[i][j] * f[S - i][B - S - j] % mod; 
			res %= mod;
		}
	}
	cout << res << endl;
	res += 2ll * f[S][B - S] % mod;
	res %= mod;
//	if ((B - S) % S == 0) 
		res = (mod + res - S + 1) % mod;
		cout << res << endl;
	res = res * inv(2, mod) % mod;
//	res += 2ll * f[S][B - S] % mod;
	//cout << res << endl;
//	res = res * inv(S - 1, mod) % mod; 
//	if ((B - S) % S == 0) res = (mod + res - 1) % mod;
//	cout << res << endl;
//	res %= mod;
//	cout << f[S][B - S] << endl;
//	res = (mod + res - 1) % mod;
	printf("%lld\n", res);
	return 0;
}
```

<img style="display:block; margin:0px auto; border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);zoom:50%" src="http://dup4.top/Mobile/Document/site/Exercise/img/6/9.png">


$\displaystyle 2^x$

```math
$$
\sum\limits_{i = 1}^n f(x) = 2^x
$$
```

```math
$$
f(x) = 2^x
$$
```

```math
$$
f(x) = 2^x
$$
```

```math
$$
\begin{eqnarray*}
f(x) &=& 3^x \\
g(x) &=& 4^x
\end{eqnarray*}
$$
```

</details>





### 字符效果和横线等
                
----

~~删除线~~ <s>删除线（开启识别HTML标签时）</s>
*斜体字*      _斜体字_
**粗体**  __粗体__
***粗斜体*** ___粗斜体___

上标：X<sub>2</sub>，下标：O<sup>2</sup>

**缩写(同HTML的abbr标签)**

> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启

The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.

### 引用 Blockquotes

> 引用文本 Blockquotes

引用的行内混合 Blockquotes
                    
> 引用：如果想要插入空白换行`即<br />标签`，在插入处先键入两个以上的空格然后回车即可，[普通链接](http://localhost/)。

### 锚点与链接 Links

[普通链接](http://localhost/)

[普通链接带标题](http://localhost/ "普通链接带标题")

直接链接：<https://github.com>

[锚点链接][anchor-id] 

[anchor-id]: http://www.this-anchor-link.com/

GFM a-tail link @pandao

> @pandao

### 多语言代码高亮 Codes

#### 行内代码 Inline code

执行命令：`npm install marked`

多组数据。
每组数据第一行给出一个正整数$n(1 \leq n \leq 10^5)$，接下来$n$个数$a_i(1 \leq a_i \leq 10^9)$。

#### 缩进风格

即缩进四个空格，也做为实现类似`<pre>`预格式化文本(Preformatted Text)的功能。

	Hello world!

预格式化文本：

	| First Header  | Second Header |
	| ------------- | ------------- |
	| Content Cell  | Content Cell  |
	| Content Cell  | Content Cell  |

#### JS代码　

```javascript
function test(){
	console.log("Hello world!");
}
 
(function(){
    var box = function(){
        return box.fn.init();
    };

    box.prototype = box.fn = {
        init : function(){
            console.log('box.init()');

			return this;
        },

		add : function(str){
			alert("add", str);

			return this;
		},

		remove : function(str){
			alert("remove", str);

			return this;
		}
    };
    
    box.fn.init.prototype = box.fn;
    
    window.box =box;
})();

var testBox = box();
testBox.add("jQuery").remove("jQuery");
```

#### HTML代码 HTML codes

```html
<!DOCTYPE html>
<html>
    <head>
        <mate charest="utf-8" />
        <title>Hello world!</title>
    </head>
    <body>
        <h1>Hello world!</h1>
    </body>
</html>
```

#### C++代码

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

#define dbg(x...) do { cout << "\033[32;1m" << #x << " -> "; err(x); } while (0) 
void err() { cout << "\033[39;0m" << endl; } 
template <class T, class... Ts> void err(const T& arg, const Ts&... args) { cout << arg << ' '; err(args...); }

const int mod = 1e9 + 7;
const int N = 5e3 + 10;
int n, S, B, f[N][N];

ll qpow(ll base, ll n) {
	ll res = 1;
	while (n) {
		if (n & 1) res = res * base % mod;
		base = base * base % mod;
		n >>= 1;
	}
	return res;
}

ll inv(ll x, ll mod) { return qpow(x, mod - 2); }

int main() {
	scanf("%d%d", &S, &B);
	n = B;
	memset(f, 0, sizeof f);
	for (int i = 0; i <= n; ++i) f[i][0] = 1, f[1][i] = 1;
	for (int i = 2; i <= n; ++i) {
		for (int j = 1; j < i; ++j) {
			f[i][j] = f[j][j];
		}
		for (int j = i; j <= n; ++j) {
			f[i][j] = (f[i - 1][j] + f[i][j - i]) % mod;
		}
	}
	ll res = 0;
	for (int i = 1; i < S; ++i) {
		for (int j = 0; j <= B - S; ++j) {
			dbg(i, j, S - i, B - S - j, f[i][j], f[S - i][B - S - j]);
			res += 1ll * f[i][j] * f[S - i][B - S - j] % mod; 
			res %= mod;
		}
	}
	cout << res << endl;
	res += 2ll * f[S][B - S] % mod;
	res %= mod;
//	if ((B - S) % S == 0) 
		res = (mod + res - S + 1) % mod;
		cout << res << endl;
	res = res * inv(2, mod) % mod;
//	res += 2ll * f[S][B - S] % mod;
	//cout << res << endl;
//	res = res * inv(S - 1, mod) % mod; 
//	if ((B - S) % S == 0) res = (mod + res - 1) % mod;
//	cout << res << endl;
//	res %= mod;
//	cout << f[S][B - S] << endl;
//	res = (mod + res - 1) % mod;
	printf("%lld\n", res);
	return 0;
}


```

#### 文本

```plaintext
MathJax.Hub.Config({
    messageStyle: "none",
    config: ["MMLorHTML.js"],
    jax: ["input/TeX", "output/HTML-CSS", "output/NativeMML"],
    extensions: ["TeX/AMSmath.js", "TeX/AMSsymbols.js", "MathMenu.js", "MathZoom.js"]
});
```

### 图片 Images

Image:

![](http://dup4.top/Mobile/Document/site/Exercise/img/6/9.png)

> Follow your heart.

![](http://dup4.top/Mobile/Document/site/Exercise/img/6/8.png)

> 图为：厦门白城沙滩

图片加链接 (Image + Link)：


[![](./Editor.md/img/7.jpg)](./Editor.md/img/7.jpg "李健首张专辑《似水流年》封面")

> 图为：李健首张专辑《似水流年》封面
                
----

### 列表 Lists

#### 无序列表（减号）Unordered Lists (-)
                
- 列表一
- 列表二
- 列表三
     
#### 无序列表（星号）Unordered Lists (*)

* 列表一
* 列表二
* 列表三
* 
```math
$$
\begin{eqnarray}
f(x) = 2^x
\end{eqnarray}
$$
```



#### 无序列表（加号和嵌套）Unordered Lists (+)
                
+ 列表一
+ 列表二
    + 列表二-1
    + 列表二-2
    + 列表二-3
+ 列表三
    * 列表一
    * 列表二
    * 列表三

#### 有序列表 Ordered Lists (-)
                
1. 第一行
2. 第二行
3. 第三行
4. $2^x$

#### GFM task list

- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2
                
----
                    
### 绘制表格 Tables

| 项目        | 价格   |  数量  |
| --------   | -----:  | :----:  |
| 计算机      | $1600   |   5     |
| 手机        |   $12   |   12   |
| 管线        |    $1    |  234  |
                    
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell 

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Function name | Description                    |
| ------------- | ------------------------------ |
| `help()`      | Display the help window.       |
| `destroy()`   | **Destroy your computer!**     |

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |

| Item      | Value |
| --------- | -----:|
| Computer  | $1600 |
| Phone     |   $12 |
| Pipe      |    $1 |
                
----

#### 特殊符号 HTML Entities Codes

© &  ¨ ™ ¡ £
& < > ¥ € ® ± ¶ § ¦ ¯ « · 

X² Y³ ¾ ¼  ×  ÷   »

18ºC  "  '

### Emoji表情 :smiley:

> Blockquotes :star:

#### GFM task lists & Emoji & fontAwesome icon emoji & editormd logo emoji :editormd-logo-5x:

- [x] :smiley: @mentions, :smiley: #refs, [links](), **formatting**, and <del>tags</del> supported :editormd-logo:;
- [x] list syntax required (any unordered or ordered list supported) :editormd-logo-3x:;
- [x] [ ] :smiley: this is a complete item :smiley:;
- [ ] []this is an incomplete item [test link](#) :fa-star: @pandao; 
- [ ] [ ]this is an incomplete item :fa-star: :fa-gear:;
    - [ ] :smiley: this is an incomplete item [test link](#) :fa-star: :fa-gear:;
    - [ ] :smiley: this is  :fa-star: :fa-gear: an incomplete item [test link](#);
 
#### 反斜杠 Escape

\*literal asterisks\*
            
### 科学公式 TeX($\sum\limits_{i = 1}^n a_i$)

```math
$$E=mc^2$$
```

行内的公式$E=mc^2$行内的公式，行内的$E=mc^2$公式。

$$(\sqrt{3x-1}+(1+x)^2)$$
                    
$$\sin(\alpha)^{\theta}=\sum\limits_{i=0}^{n}(x^i + \cos(f))$$

多行公式：

```math
$$
\left( \sum\limits_{k=1}^n a_k b_k \right)^2
\leq
\left( \sum\limits_{k=1}^n a_k^2 \right)
\left( \sum\limits_{k=1}^n b_k^2 \right)
$$
```

```math
$$
\begin{eqnarray*}
f(x) = 2^x \mbox{(公式)}
\end{eqnarray*}
$$
```

```math
$$
    \frac{1}{
        \Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{
        \frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {
        1+\frac{e^{-6\pi}}
        {1+\frac{e^{-8\pi}}
         {1+\cdots} }
        } 
    }
$$
```

```math
$$
f(x) = \int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi x}
    \,d\xi
$$
```
                
### 绘制流程图 Flowchart

```flow
st=>start: 用户登陆
op=>operation: 登陆操作
cond=>condition: 登陆成功 Yes or No?
e=>end: 进入后台

st->op->cond
cond(yes)->e
cond(no)->op
```
                    
### 绘制序列图 Sequence Diagram
                    
```seq
Andrew->China: Says Hello 
Note right of China: China thinks\nabout it 
China-->Andrew: How are you? 
Andrew->>China: I am good thanks!
```

### End

```math
$$ 
f(n) =  
\begin{cases} 
n/2, & \text{if $n$ is even} \\
3n+1, & \text{if $n$ is odd} 
\end{cases} 
$$
```

```math
$$ 
f(n) = 
\begin{cases} 
n/2, & \text{if $n$ is even} \\
3n+1, & \text{if $n$ is odd} \end{cases} 
$$
```


```math
$$
\left\{ 
\begin{array}{c} 
a_1x+b_1y+c_1z=d_1 \\ 
a_2x+b_2y+c_2z=d_2 \\ 
a_3x+b_3y+c_3z=d_3 
\end{array} 
\right. 
$$
```

```math
$$X=\left( \begin{matrix} x_{11} & x_{12} & \cdots & x_{1d}\\ x_{21} & x_{22} & \cdots & x_{2d}\\ \vdots & \vdots & \ddots & \vdots\\ x_{m1} & x_{m2} & \cdots & x_{md}\\ \end{matrix} \right) =\left( \begin{matrix} x_1^T \\ x_2^T \\ \vdots\\ x_m^T \\ \end{matrix} \right) $$
```

```math
$$ \begin{align} \frac{\partial J(\theta)}{\partial\theta_j} & = -\frac1m\sum_{i=0}^m(y^i-h_\theta(x^i)) \frac{\partial}{\partial\theta_j}(y^i-h_\theta(x^i)) \\ & = -\frac1m\sum_{i=0}^m(y^i-h_\theta(x^i)) \frac{\partial}{\partial\theta_j}(\sum_{j=0}^n\theta_jx_j^i-y^i) \\ & = -\frac1m\sum_{i=0}^m(y^i-h_\theta(x^i))x^i_j \end{align} $$
```






题目大意：有个一开始为空的序列。每次操作会往序列最后加一个 $1$ 到 $m$ 的随机整数。当整个序列的 $\gcd$ 为 $1$ 时停止。问这个序列的期望长度对 $10^9+7$ 取模的值。

$1\le m\le 10^5$。

首先很容易想到DP：$f_i$ 表示目前的 $\gcd$ 为 $i$，期望还要多少次才能结束。

那么有 $f_1=0$。

转移，直接枚举即可：$f_i=1+\dfrac{1}{m}\sum\limits^m_{j=1}f_{\gcd(i,j)}$。

如果出现 $\gcd(i,j)=i$（也就是 $i|j$），那么把这种情况特殊判断，那么解个方程可以得到：

```math
$$f_i=\dfrac{1+\dfrac{1}{m}\sum\limits^m_{j=1,i | j}f_{\gcd(i,j)}}{1-\lfloor\frac{m}{i}\rfloor}$$
```

答案为 $\dfrac{1}{m}\sum\limits^m_{i=1}(f_i+1)$。

这是 $O(m^2\log m)$ 的。我当时就是在这里卡住了，现在感觉自己是个zz……

我们套路地枚举 $\gcd$，设 $c(i,j)$ 表示有多少个 $1\le x\le m$ 满足 $\gcd(i,x)=j$。那么就有：

```math
$$f_i=\dfrac{1+\dfrac{1}{m}\sum\limits_{j|i}f_{j}c(i,j)}{1-\lfloor\frac{m}{i}\rfloor}$$
```

接下来就要考虑求 $c(i,j)(j|i)$。

```math
$$
\begin{eqnarray*}
c(i,j)&=&\sum\limits^m_{x=1}[\gcd(i,x)=j] \\
&=&\sum\limits^m_{j|x}[\gcd(\frac{i}{j},\frac{x}{j})=1] \\
&=&\sum\limits^{\lfloor\frac{m}{j}\rfloor}_{x=1}[\gcd(\frac{i}{j},x)=1]
\end{eqnarray*}
$$
```

接下来有两条路可走：分解质因数（官方做法）和莫比乌斯反演（大众做法）。

那我们先来看看大众做法。

莫比乌斯反演：
```math
$$
\begin{eqnarray*}
c(i,j) &=& \sum\limits^{\lfloor\frac{m}{j}\rfloor}_{x=1}\sum\limits_{d|\gcd(\frac{i}{j},x)}\mu(d) \\
&=& \sum\limits_{d|\frac{i}{j}}\mu(d)\sum\limits^{\lfloor\frac{m}{j}\rfloor}_{d|x}1 \\
&=& \sum\limits_{d|\frac{i}{j}}\mu(d)\lfloor\dfrac{m}{jd}\rfloor
\end{eqnarray*}
$$
```


此时求 $c(i,j)$ 复杂度为 $O(\sqrt{\frac{i}{j}})$。

总复杂度为 
```math
$$
O(\sum\limits^m_{i=2}\sum\limits_{j|i}\sqrt{\frac{i}{j}})=O(\sum\limits^m_{i=2}\sum\limits_{j|i}\sqrt{j})=O(\sum\limits^m_{j=1}\sqrt{j}\lfloor\frac{m}{j}\rfloor)\approx O(m\int^m_1j^{-\frac{1}{2}}\mathrm{d}j)=O(m\sqrt{m})
$$
```


分解质因数：
我们不妨修改一下定义（只是为了方便）：令 $c(x,y)=\sum\limits^y_{i=1}[\gcd(i,x)=1]$。那么原来的 $c(i,j)$ 就变成了现在的 $c(\frac{i}{j},\lfloor\frac{m}{j}\rfloor)$。

也就是要 $i$ 和 $x$ 的质因子集合没有交集。

我们从反向考虑，考虑与 $x$ 的质因子有交集的 $i$ 的个数。

先对 $x$ 质因数分解，设分解出的不同质因子有 $p_1,p_2\cdots p_k$。那么有 $k\le 6$。

那么与集合 $S$ 有交的 $i$ 的个数就是 $\displaystyle \lfloor\frac{y}{\prod S_i}\rfloor$。

然后还要再容斥一下。那么总的就是：

```math
$$c(x,y)=y-\sum\limits_{S\in x_{pr}}(-1)^{|S|}\lfloor\frac{y}{\prod S_i}\rfloor$$
```

此时转移方程为：

```math
$$f_i=\dfrac{1+\dfrac{1}{m}\sum\limits_{j|i}f_{j}c(\frac{i}{j},\lfloor\frac{m}{j}\rfloor)}{1-\lfloor\frac{m}{i}\rfloor}$$
```

这个可以做到 $O(2^k+\sqrt{x})$。注意最好用DFS，不要用二进制枚举，否则会退化为 $O(2^k\times k+\sqrt{x})$。（虽然也能过）

时间复杂度也是 $O(m\sqrt{m})$。