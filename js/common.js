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
    //1.û�л��� 2.�¼����С��150ms��Ϊtap�¼�
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
        //���ò���
        isMove=false;
        time=0;
    });
}