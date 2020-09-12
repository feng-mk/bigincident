$(function () {
  layui.form.verify({
    len: [/^\S{6,12}$/, "长度必须6到12位，不能有空格"],
    diff: function (value) {
      var oldPwd = $('[name="oldPwd"]').val();
      if (value === oldPwd) {
        return "新密码不能和原密码相同";
      }
    },

    same: function (value) {
      var newPwd = $('[name="newPwd"]').val();
      if (value !== newPwd) {
        return "确认密码不一致";
      }
    },
  });

  $("#changePwd").click(function (e) {
    e.preventDefault();

    $.post("/my/updatepwd", $("#formInfo").serialize(), function (res) {
      // console.log(res);
      if (res.status === 0) {
        $('button[type="reset"]').click();
      } else {
      }
    });
  });
});
