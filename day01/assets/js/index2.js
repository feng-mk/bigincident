$(function () {
  // 获取用户信息

  // /my/userinfo  ,,,, localStorage ,,,Authorization
  //   前面设置了拦截器，不用。。/。。/。。/。。完
  //   $.get("/my/userinfo", function (res) {
  //     console.log(res);
  //   });

  var token = window.localStorage.getItem("token") || "";
  getUserInfo();
  function getUserInfo() {
    $.ajax({
      url: "/my/userinfo",
      //   请求头 加s
      /* headers: {
        Authorization: token,
      }, */
      success: function (res) {
        //   debugger; //打断点
        // console.log("success", res);
        //   res.data.user_pic
        if (res.status === 1) return;
        var resname = res.data.nickname || res.data.username;
        $("#welcome").html(resname);
        // 存在显示图片头像，隐藏文字头像
        if (res.data.user_pic) {
          $(".layui-nav-img").attr("src", res.data.user_pic).show();
          $(".text-avatar").hide();
        } else {
          $(".layui-nav-img").hide();
          /* var first = resname[0].toUpperCase();
          $(".text-avatar").html(first); */
          // var first = resname[0].toUpperCase();
          $(".text-avatar").html(resname[0].toUpperCase());
        }
      },
      // 请求完成后判断
      /* complete: function (res) {
        console.log("complete---", res);
        if (
          res.responseJSON.status === 1 &&
          res.responseJSON.message === "身份认证失败！"
          //中文！号
        ) {
          window.localStorage.removeItem("token");
          window.location.href = "/index.html";
        } else {
          console.log("--------------");
        }
      }, */
    });
  }

  window.getUserInfo = getUserInfo;

  $("#btn-logout").click(function (e) {
    e.preventDefault();
    //   确认框
    layui.layer.confirm("is not?", { icon: 3, title: "提示" }, function (
      index
    ) {
      //do something

      // 取消
      // 确定

      // 2，清空token
      window.localStorage.removeItem("token");
      // 1，跳转登录
      window.location.href = "/index.html";

      //   console.log("----");

      layer.close(index);
    });
  });
});
