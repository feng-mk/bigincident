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
  $(".layui-form").submit(function (e) {
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
    $.post("http://ajax.frontend.itheima.net/api/reguser", formdata, function (
      res
    ) {
      console.log(res);
      if (res.status === 0) {
        // console.log(res, message);改修
        console.log(res.message);
      } else {
        // console.log(res, message);
        console.log(res.message);
      }
      alert(1);
    });
  });
  // 5，处理res响应
});
