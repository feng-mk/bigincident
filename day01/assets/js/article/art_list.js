$(function () {
  var q = {
    pagenum: 1,
    // 是	int	页码值
    pagesize: 2,
    // 是	int	每页显示多少条数据
    cate_id: $("[cate_id]").val(),
    // 否	string	文章分类的 Id
    state: $("[state]").val(),
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
      // console.log(res);

      if (res.status === 0) {
        console.log(res.data);
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
        renderPage(res.total);
      }
    });
  }

  // 下拉框
  initCate();
  function initCate() {
    $.get("/my/article/cates", function (res) {
      if (res.status === 0) {
        // console.log(res);
        var strHtml = template("tpl-cate", res);
        // debugger;  打断点
        $("#sct-cate").html(strHtml);
        // 手动form重新渲染
        layui.form.render();
      }
    });
  }

  // 筛选按钮
  $("#form-search").submit(function (e) {
    e.preventDefault();
    q.cate_id = $("[name=cate_id]").val();
    q.state = $("[name=state]").val();
    // console.log(q);
    initList();
  });

  // 渲染分页
  function renderPage(total) {
    // 分页代码
    layui.use("laypage", function () {
      var laypage = layui.laypage;

      //执行一个laypage实例
      laypage.render({
        elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        curr: q.pagenum, //当前页码
        limit: q.pagesize, //每页条数
        limits: [2, 3, 5, 10],
        layout: ["count", "limit", "prev", "page", "next", "skip"],
        // 默认第一次调用  ||  jump切换页码时调用
        jump: function (obj, first) {
          //首次不执行
          if (!first) {
            //obj包含了当前分页的所有参数，比如：
            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); //得到每页显示的条数
            // 按照最新页码发送请求
            q.pagenum = obj.curr;
            q.pagesize = obj.limit;
            initList();
            //do something
          } else {
          }
        },
      });
    });
  }

  // 删除分类
  $("tbody").on("click", ".delete", function (e) {
    e.preventDefault();
    // 获取id
    var Id = $(this).attr("data-id");
    var len = $(".delete").length;

    layer.confirm("Sure?", { icon: 3, title: "删除文章" }, function (index) {
      $.get(`/my/article/delete/${Id}`, function (res) {
        if (res.status === 0) {
          console.log(len);
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          layer.close(index);
          initList();
        }
      });
    });
  });
});
