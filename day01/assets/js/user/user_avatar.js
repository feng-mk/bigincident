$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");

  // 1.2 配置选项
  var options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $("#btn-upload").click(function () {
    $("#file").click();
  });

  $("#file").on("change", function (e) {
    // e.target可以获取当前的input：file这个DOM属性
    console.log(e.target.files);

    // 获取图片对象
    var file = e.target.files[0];
    // 根据选择文件，创建一个对应的URL 地址
    var newImgURL = URL.createObjectURL(file);
    // console.log(newImageUrl);

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });
  // 确定上传
  $("#sure").on("click", function (e) {
    e.preventDefault();

    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); //{
    // 将 Canvas 画布上的内容，转化为base64(文件对象)
    console.log(dataURL); //结果是 base64文秘
    // 得到文件对象后，进行后续的操作
    // console.log(img)
    // };

    $.post("/my/update/avatar", { avatar: dataURL }, function (res) {
      if (res.status === 0) {
        console.log(res);
        window.parent.getUserInfo();
      }
    });
  });
});
