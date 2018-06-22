
$(function(){
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function(info){
      $(".content-side ul").html(template("tpl",info))
      render(info.rows[0].id)
    }
  })
render(1)

  $(".content-side").on("click","li",function(){
    var id=$(this).data("id");
    $(this).addClass("now").siblings().removeClass("now")
    render(id)
  })




  function render(id){
   
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      success:function(info){
        console.log(2)
        console.log(info)
        $(".content-main ul").html(template("tpl2",info))
      }
    })
  }




})