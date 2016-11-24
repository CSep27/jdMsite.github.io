/**
 * Created by wtt on 2016/8/16.
 */
window.onload = function () {
    leftSwipe();
    rightSwipe();
};
//左边框
function leftSwipe() {
    /*
     * 1.滑动Y轴方向的滑动   touch事件y轴方向的坐标轴的改变
     * 2.在滑动区间范围内  移动     确定滑动区间
     * 3.在定位区间范围内  定位     确定定位区间
     * 4.点击分类的时候  要求改变当前样式    tap 事件来（封装）
     * 5.点击过后 要判断是否有滑动的位子  当前被点击的盒子要求  滑动到和顶部对齐的位子   transition
     * 6.点击的时候  要判断是否有滑动的位子  没有滑动的位子保持不动
     * */
    var parentBox = document.querySelector(".jd_category_left");
    var parentHeight = parentBox.offsetHeight;
    var childBox = parentBox.querySelector("ul");
    var childHeight = childBox.offsetHeight;
    var lis = childBox.querySelectorAll("li");
    //定位区间
    var maxPosition = 0;
    var minPosition = parentHeight - childHeight;
    //缓冲距离
    var distance = 100;
    //滑动区间
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;

    //当前定位
    var currentY = 0;


    //公用方法
    //加过渡
    function addTransition() {
        childBox.style.webkitTransition = "all,0.3s";
        childBox.style.transition = "all,0.3s";
    }

    //清除过渡
    function removeTransition() {
        childBox.style.webkitTransition = "none";
        childBox.style.transition = "none";
    }

    //定位
    function setTranslateY(translateY) {
        childBox.style.webkitTransform = "translateY(" + translateY + "px)";
        childBox.style.transform = "translateY(" + translateY + "px)";
    }


    //定义初始值
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var isMove = false;


    childBox.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener("touchmove", function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //清除过渡
        removeTransition();
        //定位
        //setTranslateY(currentY + distanceY);
        //在滑动范围内移动
        if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
            //定位
            setTranslateY(currentY + distanceY);
        }
        isMove = true;
    });
    window.addEventListener("touchend", function (e) {
        //在定位范围内定位
        if ((currentY + distanceY) > maxPosition) {
            currentY = maxPosition;
            addTransition();
            setTranslateY(currentY);
        }
        else if ((currentY + distanceY) < minPosition) {
            currentY = minPosition;
            addTransition();
            setTranslateY(currentY);
        }
        else {
            currentY = currentY + distanceY;
        }

        //重置
        startY = 0;
        moveY = 0;
        distanceY = 0;
        isMove = false;
    });
    jd_web.tap(childBox, function (e) {
        var tapli = e.target.parentNode;
        //console.log(e.target);
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
            lis[i].index = i;
        }
        tapli.className = "now";

        //点击后判断是否有滑动的位置
        //计算将要去做定位的位置 往上移动 是负值
        var translateY = -tapli.index * 50;
        if (translateY > minPosition) {
            currentY = translateY;
            addTransition();
            setTranslateY(currentY);
        } else {
            currentY = minPosition;
        }

    });
}
//右边框
function rightSwipe() {
    itcast.iScroll({
        swipeDom: document.querySelector(".jd_category_right"),
        swipeType: "y",
        swipeDistance: 100
    });
}
