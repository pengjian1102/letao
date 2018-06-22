$(function(){
  var page=1;
  var pageSize=3;
  console.log(1)
  render()
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info)
        var html=template("tpl",info);
        $("tbody").html(html);
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages:Math.ceil(info.total/info.size),
          size: 'small',
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    })


  }
})