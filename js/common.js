/**
 * Created by wtt on 2016/8/15.
 */
window.jd_web = {};
jd_web.transitionEnd = function (ele, callback) {
    if (!ele || typeof ele != "object") {
        return false;
    }
    ele.addEventListener("transitionEnd", function () {
        /*if(callback){
         callback();
         }*/
        callback && callback();
    });
    ele.addEventListener("webkitTransitionEnd", function () {
        callback && callback();
    });
}
jd_web.tap = function (ele, callback) {
    if (!ele || typeof ele != "object") {
        return false;
    }
    //1.没有滑动 2.事件间隔小于150ms则为tap事件
    var isMove = false;
    var time = 0;
    ele.addEventListener("touchstart", function () {
        time = Date.now();
    });
    ele.addEventListener("touchmove", function () {
        isMove = true;
    });
    ele.addEventListener("touchend", function (e) {
        if (!isMove && (Date.now() - time) < 150) {
            callback&&callback(e);
        }
        //重置参数
        isMove=false;
        time=0;
    });
}