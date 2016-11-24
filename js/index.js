/**
 * Created by wtt on 2016/8/15.
 */
window.onload = function () {
    search();
    banner();
    downTime();
};
//搜索框
function search() {
    //页面滑动时要求背景逐渐加深
    //滚动距离达到轮播图高度时不再加深
    //找对象
    //搜索框
    var search = document.querySelector(".jd_header_box");
    //轮播图高度
    var height = document.querySelector(".jd_banner").offsetHeight;
    //console.log(height);
    var opacity = 0;
    window.onscroll = function () {
        //滚动距离
        var top = document.body.scrollTop;
        //console.log(top);
        if (top < height) {
            opacity = 0.85 * (top / height);
        } else {
            opacity = 0.85;
        }
        search.style.backgroundColor = "rgba(201, 21, 35, " + opacity + ")";
    };
}
//轮播
function banner() {
    /*
     * 1.自动轮播  定时器  无缝衔接  动画结束瞬间定位
     * 2.点需要随着轮播的滚动改变对应的点  改变当前样式  当前图片的索引
     * 3.手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
     * 4.当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
     * 5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
     * */
    var timer = null;
    //轮播图大盒子
    var banner = document.querySelector(".jd_banner");
    //轮播图宽度
    var width = banner.offsetWidth;
    //轮播图ul
    var imageBox = banner.querySelector("ul:first-child");
    //点ul和li
    var pointBox = banner.querySelector("ul:last-child");
    var points = pointBox.querySelectorAll("li");

    //公用方法
    //设置过渡
    function addTransition() {
        imageBox.style.transition = "all 0.3s";
        imageBox.style.webkitTransition = "all 0.3s";
    }

    //清除过渡
    function removeTransiton() {
        imageBox.style.transition = "none";
        imageBox.style.webkitTransition = "none";
    }

    //设置移动
    function setTranslateX(translateX) {
        imageBox.style.transform = "translateX(" + translateX + "px)";
        imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
    }

    //加动画
    var index = 1;//最开始显示的是索引为1的图片
    timer = setInterval(function () {
        index++;
        //设置过渡
        addTransition();
        //设置移动
        setTranslateX(-index * width);
    }, 1000);

    //每移动一次触发一次transitionEnd事件，判断index
    //使用封装的兼容函数
    jd_web.transitionEnd(imageBox, function () {
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        //清除过渡
        removeTransiton();
        //设置移动
        setTranslateX(-index * width);
        //此处index取值范围为[1-8] 点的索引范围为[0-7]
        setPoint();
    });

    //让点的状态跟着改变
    function setPoint() {
        for (var i = 0; i < points.length; i++) {
            points[i].className = "";
        }
        points[index - 1].className = "now";
    }

    /*3.手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
     4.当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
     5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）*/
    //touch事件
    var startX = 0;//记录起始位置 x的坐标
    var moveX = 0;//记录滑动时x的位置
    var distance = 0;//滑动的距离
    var isMove = false;//是否滑动过

    imageBox.addEventListener("touchstart", function (e) {
        clearInterval(timer);//手指触摸时停止计时器
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener("touchmove", function (e) {
        moveX = e.touches[0].clientX;
        distance = moveX - startX;
        removeTransiton();
        setTranslateX(-index * width + distance);
        isMove = true;
    });
    imageBox.addEventListener("touchend", function (e) {
        //4.当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
        //5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
        if (isMove && Math.abs(distance) > width / 3) {
            if (distance > 0) {
                index--;
            } else {
                index++;
            }
        }
        addTransition();
        setTranslateX(-index * width);

        //离开后各项回归初始值
        startX = 0;
        moveX = 0;
        distance = 0;
        isMove = false;
        //离开时定时器照常工作
        //严谨 再清除一次定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            //设置过渡
            addTransition();
            //设置移动
            setTranslateX(-index * width);
        }, 1000);
    });
}
//倒计时
function downTime() {
    var timer=null;
    var time=4*60*60;
    var sk_time=document.querySelector(".sk_time");
    var spans=sk_time.querySelectorAll("span");
    timer=setInterval(function () {
        time--;
        if(time<0){
            clearInterval(timer);
            return false;
        }
        h=Math.floor(time/3600);
        m=Math.floor(time%3600/60);
        s=time%60;
        //时
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=h%10;
        //分
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        //秒
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
    },1000);
}