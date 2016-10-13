/*$('').click(function(){
    window.location.href="mould.html";
    var requestData = $('#login-form').serialize();

    $.post('data/1_check_login.php',requestData, function(data){
        if(data.code!==1){
            $('.panel-body .hint').html(data.msg);
        }else{
            location.href="mould.html";
            var uname = $('[name="uname"]').val();
            $('#welcome').html('欢迎回来：'+uname);


        }
    });

});*/
  function check(form) {

        if(form.userId.value=='') {
                $("#UserId").html("请输入用户名");
                form.userId.focus();
                return false;
           }
      else{
            $("#UserId").html("");

        }
       if(form.password.value==''){
              $("#UserPwd").html("请输入登录密码");
                form.password.focus();
                return false;
         }
       else{
           $("#UserPwd").html("");

       }
         return true;
         }