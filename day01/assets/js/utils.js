// 公共的js代码
// 提取公共的baseUrl
var token = window.localStorage.getItem("token") || "";

$.ajaxPrefilter(function (options) {
  //   console.log("ajaxPrefilter");
  // console.log(options.url);
  //   设置选项 url
  // 一：公共的url
  //   请求根路径：http://ajax.frontend.itheima.net
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  // ===
  // 二：统一设置请求头
  // "abcdefghi".includes("a");
  if (!options.url.includes("/api/")) {
    options.headers = {
      Authorization: token,
    };
  }
  // console.log(options.headers);
  /* options.headers = {
    Authorization: token,
  }; */
  // 三：统一判断token有无token
  options.complete = function (res) {
    // console.log("complete---", res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
      //中文！号
    ) {
      window.localStorage.removeItem("token");
      window.location.href = "/index.html";
    } else {
      // console.log("--------------");
    }
  };
});
