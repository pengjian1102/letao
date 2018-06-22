$(function () {
  if(location.href.indexOf("login.html")==-1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function(info){
        if(info.error===400) {
          location.href = "login.html";
        }
      }
    })
  }

  $(".child").prev().on("click", function () {
    $(".child").slideToggle();
  })

  $(".icon_menu").on("click", function () {
    $(".aside").toggleClass("now")
    $(".main").toggleClass("now")
  })

  $(".icon_logout").on("click", function () {
    $("#logoutModal").modal('show');
    $(".btn_logout").off().on("click",function(){
      $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        success: function (info) {
          if (info.success) {
            location.href = "login.html";
          }
        }
      });
    })
  });
  
 
})
