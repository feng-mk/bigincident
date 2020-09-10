// 公共的工具

$.ajaxPrefilter(function (options) {
  //   console.log("ajaxPrefilter");
  //   console.log(options.url);

  //   设置选项 url
  //   请求根路径：http://ajax.frontend.itheima.net
  options.url = "http://ajax.frontend.itheima.net" + options.url;
});
