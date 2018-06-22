
$(function () {
  var page = 1;
  var pageSize = 2;
  var img = [];
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        $("tbody").html(template("tpl", info))
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render()
          }
        })
      }
    })
  }

  $(".mb-15").on("click", function () {
    $("#productmodal").modal("show")
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info)
        $(".dropdown-menu").html(template("tpl2", info))
      }
    })
  })
  $(".dropdown-menu").on("click", "a", function () {
    var id = $(this).data("id");
    var text = $(this).text();
    $(".producttext").text(text);
    $(".brandId").val(id)
  })

  $("#secondfile").fileupload({
    dataType: "json",
    done: function (e, data) {
      if (img.length >= 3) {
        return
      }
      img.push(data.result);
      $(".productimg").append("<img src=" + data.result.picAddr + " width='100'>")
    }
  })


  $("form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {

      proName: {
        validators: {
          notEmpty: {
            message: "不能为空"
          },
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "不能为空"
          },
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "不能为空"
          },
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "不能为空"
          },
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "不能为空"
          },
        }
      },
      size:{
        validators:{
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"不对"
          }
        }
      },
      brandId: {
        validators: {
          notEmpty: {
            message: "不能为空"
          },
        }
      },



    }

  })

  $("form").on("success.form.bv", function (e) {
    e.preventDefault();
    var data = $("form").serialize();
    data += "&picName1=" + img[0].picName + "&picAddr1=" + img[0].picAddr
    data += "&picName2=" + img[1].picName + "&picAddr2=" + img[1].picAddr
    data += "&picName3=" + img[2].picName + "&picAddr3=" + img[2].picAddr
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: data,
      success: function (info) {
        if (info.success) {
          $("#productmodal").modal("hide")
          page = 1;
          render();
          $("form").data("bootstrapValidator").resetForm(ture);
          $(".producttext").text("选择二级分类");
          $(".productimg img").remove();
          img = [];
        }

      }
    })
  })

})