
if( location.href != "http://localhost:9000/" ){
    if(localStorage.getItem('caishengu-access_token') == null){
        location.href = '/';
    }
}

$('#btn').on('click', function () {
    var username = $('#username').val();
    var password = $('#password').val();
    var re = /[a-zA-Z0-9]$/;
    if (username == "" || password == "") {
        $("#prompt").text("请输入用户名或密码");
        console.log("2");
    } else if (re.test(username) == false) {
        $("#prompt").text("请输入有效的字符或数字");
        console.log("3");
    } else {
        console.log("4");
        $("#prompt").text("");
        $.ajax({
            type: 'POST',
            url: "http://" + backend_host + '/auth/oauth/access_token',
            data: {
                "username": username,
                "password": password,
                "grant_type": "password"
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $.ajax({
                    type: 'GET',
                    url: "http://" + backend_host + '/web/person/privilege?access_token=10ae0842b11080b0b6c9412773164797',
                    dataType: 'json',
                    success: function (data) {
                        var datas = "";
                        $.each(data, function (i, order) {
                            console.log(order);
                            if (order == true) {
                                datas += [i] + ',';
                                console.log([i]);

                            }

                        });
                        console.log(datas);
                        datas = datas.substr(0, datas.length - 1);
                        console.log(datas);
                        localStorage.setItem("user_list", datas);
                    }


                })
               if(data.scope=="staff"){
                   window.location.href="/statistics";
               }else if(data.scope=="admin"){
                   window.location.href="/merchart/index";
               }else if(data.scope=="user"){
                   window.location.href="/myproject/index";
                   
               }else{
                   window.location.href="/homepage";
               }
            }
        })
    }

});


   /* error: function(jqXHR){
        console.log(jqXHR.status);
        if (jqXHR.status == 400) {

        }
    }*/


