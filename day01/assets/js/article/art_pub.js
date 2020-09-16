$(function () {
  var state = "已发布";

  $("#caogao").click(function () {
    state = "草稿";
  });

  initEditor();
  //   initCate();
  //   function initCate() {
  $.get(`/my/article/cates`, function (res) {
    if (res.status === 0) {
      var strHTML = template("cate", res);
      $("[name=cate_id]").html(strHTML);
      layui.form.render(); //手动调用
    }
  });
  //   }

  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  // 伪造按钮
  $("#chooseImage").click(function (e) {
    $("#file").click();
  });

  $("#file").change(function (e) {
    var fd = e.target.files[0];
    console.log(fd);
    // if (!file) return;
    var newImgURL = URL.createObjectURL(fd);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  //   表单提交
  $("#formPud").submit(function (e) {
    e.preventDefault();
    // 实例化formData数据
    var fd = new FormData($(this)[0]);
    // console.log(fd);
    fd.append("state", state);

    $image
      .cropper("getCroppedCanvas", {
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        fd.append("cover_img", blob);

        /* fd.forEach(function (v, k) {
          console.log(k, v);
        }); */
        // form->submit->序列化->把表单数据变得像json，比如：key和value
        // 发送formDato这种数据类型时，需要设置下面两个属性
        // Content-Type:false
        // processData:false

        /*  $.ajax((url:`/my/article/add`,data: fd,method:'',success: function (res) {
          console.log(res);
        })); */

        $.ajax({
          url: `/my/article/add`,
          data: fd,
          method: "POST",
          contentType: false,
          processData: false,
          success: function (res) {
            console.log(res);
            if (res.status === 0) {
              window.location.href = "/article/art_list.html";
            }
          },
        });
      });
  });
});

// forEach 循环对象
// [1,2,3,4,5].forEach(function(a,b){})
