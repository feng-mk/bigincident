$(function () {
  layui.form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1~6个字符之间";
      }
    },
  });

  initUserInfo();
  function initUserInfo() {
    //   获取用户信息
    $.get("/my/userinfo", function (res) {
      console.log(res);
      if (res.status === 0) {
        layui.form.val("formInfo", res.data);
      } else {
      }
    });
  }

  //   重置按钮
  $("#btn-reset").click(function (e) {
    e.preventDefault();
    initUserInfo();
  });

  $("#formupdate").submit(function (e) {
    e.preventDefault();
    $.post("/my/userinfo", $(this).serialize(), function (res) {
      console.log(res);
      if (res.status === 0) {
        // 更新页面信息
        // console.log(window.parent.getUserInfo);
        window.parent.getUserInfo();
      }
    });
  });
});
