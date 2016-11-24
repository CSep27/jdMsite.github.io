/**
 * Created by wtt on 2016/8/17.
 */
window.onload = function () {
    deleteFun();
};
function deleteFun() {
    /*
     * 1.点击删除按钮的时候
     * 1.1显示弹出层  改变display
     * 1.2弹出框以动画的形式进入  写动画序列  动态的加上动画属性
     * 1.3动画的打开盖子 加过渡 改变属性
     * 2.点击取消按钮的时候
     * 2.1关闭弹出层 改变display
     * 2.2动画的盖上盖子  加过渡 还原属性
     * */
    //所有删除按钮
    var deleteBtns = document.querySelectorAll(".option_delete");
    //弹出层
    var cover = document.querySelector(".jd_cover");
    //弹出框
    var promptBox = cover.querySelector(".prompt");
    //取消按钮
    var cancel = promptBox.querySelector(".cancel");
    var up = null;
    for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].onclick = function () {
            cover.style.display = "block";
            promptBox.className = "prompt myBounceInDown";
            up = this.querySelector(".delete_up");
            up.style.webkitTransformOrigin = "left bottom";
            up.style.transformOrigin = "left bottom";
            up.style.webkitTransform = "translateY(2px) rotate(-30deg)";
            up.style.transform = "translateY(2px) rotate(-30deg)";
        };
    }
    cancel.onclick = function () {
        cover.style.display = "none";
        up.style.webkitTransform = "none";
        up.style.transform = "none";
    };

}