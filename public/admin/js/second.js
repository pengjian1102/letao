$(function(){
  var page=1;
  var pageSize=5;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        var html=template("tpl",info)
        $("tbody").html(html)
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: page,
          totalPages:Math.ceil(info.total/info.size),
          size:"small",
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })
      }
    })
  }


  $(".btn").on("click",function(){
    $("#secondmodal").modal("show")
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info)
        $(".dropdown-menu").html( template("tpl2",info) )
      }
    })
  })
  $(".dropdown-menu").on("click","a",function(){
    var text=$(this).text();
    // console.log(text);
    $(".secondtext").text(text);
    var id=$(this).data("id");
    console.log(id)
    $(".categoryId").val(id);
    $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })
  $("#secondfile").fileupload({
    dataType:"json",
    done:function(e,data){
      console.log(data.result.picAddr)
      $(".secondimg img").attr("src",data.result.picAddr)
      $("[name='brandLogo']").val(data.result.picAddr)
      $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  })
  $("form").bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandName:{
        validators:{
          notEmpty:{
            message:"给一个类名"
          }
        }
      },
      categoryId:{
        validators:{
          notEmpty:{
            message:"选择一个类名"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"上传一个图片"
          }
        }
      }
    }
  })
  $("form").on("success.form.bv",function(e){
    e.preventDefault()
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("form").serialize(),
      success:function(info){
        $("#secondmodal").modal("hide")
        page=1;
        render();
        $("form").data("bootstrapValidator").resetForm(true)
        $(".secondimg img").attr("src","images/default.png")
        $(".secondtext").text("请选择一级分类");
      }
    })
  })
})