$(function () {
  var q = {
    pagenum: 1,
    // 是	int	页码值
    pagesize: 2,
    // 是	int	每页显示多少条数据
    cate_id: "",
    // 否	string	文章分类的 Id
    state: "",
    // 否	string	文章的状态，可选值有：已发布、草稿
  };
  // template.defaults.imports.过滤器名字 = 过滤器功能
  template.defaults.imports.formatData = function (olddata) {
    // console.log(a);
    var timenew = moment(olddata).format("MMM Do YYY, h:mm:ss a");

    return timenew;
  };
  initList();
  function initList() {
    $.get(`/my/article/list`, q, function (res) {
      console.log(res);

      if (res.status === 0) {
        console.log(res.data);
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
      }
    });
  }
});
