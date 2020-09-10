$(function () {
  $("#link-login").on("click", function () {
    $(".reg-box").show();
    $(".login-box").hide();
  });
  $("#link-reg").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // ====自定义规则
  layui.form.verify({
    /* layui的验证方法有两种
         1，既支持上述函数式的方式，
         2，也支持下述数组的形式 */
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // reg 的 form 的 rule
    // (value,item) item没用上删除
    repassword: function (value) {
      //value：表单的值、item：表单的DOM对象
      /* var val2 = $("#reg-psd").val();
       if (val2 !== value) { */
      if ($("#reg-psd").val() !== value) {
        return "密码不一致";
      }
    },
  });

  //   ====发送注册请求
  // 1,绑定submit事件
  $("#btn-reg").submit(function (e) {
    // 2，阻止默认行为
    e.preventDefault();
    // 3，获取表单数据
    // var username = $(".reg-box input [name=username]").val();
    var username = $("#reg-username").val();
    var password = $("#reg-psd").val();
    // 4，看接口文档，发送ajax
    // $.post(url,data,function(res){})
    var formdata = {
      username: username,
      password: password,
    };
    $.post("/api/reguser", formdata, function (res) {
      // console.log(res);
      // 5，处理res响应
      if (res.status === 0) {
        $("#link-reg").click();
      }

      layui.layer.msg(res.message);
    });
  });

  // login请求
  $("#btn-login").submit(function (e) {
    e.preventDefault();
    // console.log(111);
    var formdata = $(this).serialize();
    // http://ajax.frontend.itheima.net/api/login
    $.post("/api/login", formdata, function (res) {
      // console.log("ajax---success---");
      if (res.status === 0) {
        // 跳转
        // console.log(1);
        window.location.href = "./index2.html";
        // console.log(res.token)
        // if (res.token.length !== 0) {
        // window.localStorage.setItem("token", res.token);
        // }
        res.token.length !== 0 &&
          window.localStorage.setItem("token", res.token);
      }
      layui.layer.msg(res.message); //Authorization 身份认证段
    });
  });
});
