$(function(){
  $("form").bootstrapValidator({
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"不能为空"
        },
        stringLength:{
            min:3,
            max:6,
            message:"必须在3到6位"
        }
        }
      },
      password:{
        validators:{
          notEmpty: {
            message: '用户密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '用户密码长度是6-12位'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  })
  $("form").on("success.form.bv", function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url: "/employee/employeeLogin",
      data:$("form").serialize(),
      success:function(info){
        console.log(info)
        if(info.success){
          location.href = "index.html";
        }
        if(info.error===1000){
          alert("用户名错误")
        }
        if(info.error===1001){
          alert("密码错误")
        }
      }
    })
  })
  $("[type='reset']").on("click",function(){
    $("form").data("bootstrapValidator").resetForm(true);
  })
})