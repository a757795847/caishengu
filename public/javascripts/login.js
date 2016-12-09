if (location.href != "http://localhost:9000/") {
    if (localStorage.getItem('caishengu-access_token') == null) {
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
                var dataT = data;
                console.log(data);
                var token = data.access_token;
                localStorage.setItem("user_token", token);
                $.ajax({
                    type: 'GET',
                    url: "http://" + backend_host + '/web/person/privilege?access_token=' + token + '',
                    dataType: 'json',
                    success: function (data) {
                        var datas = [];
                        $.each(data, function (i, order) {
                            if (order == true) {
                                /*datas += [i] + ',';
                                 console.log([i]);*/
                                var route = ""
                                switch (i) {
                                    case "activity":
                                        route = 'event';
                                        break;
                                    case "caishengu_introduction":
                                        route = 'introduce';
                                        break;
                                    case "caishengu_live":
                                        route = 'live';
                                        break;
                                    case "caishengu_trend":
                                        route = 'trends';
                                        break;
                                    case "coupon":
                                        route = 'ticket';
                                        break;
                                    case "donate":
                                        route = 'love';
                                        break;
                                    case "finance":
                                        route = 'manage';
                                        break;
                                    case "finance_approve":
                                        route = 'approve';
                                        break;
                                    case "goods_market":
                                        route = 'shopping';
                                        break;
                                    case "goods_ticket":
                                        route = 'shopping';
                                        break;
                                    case "goods_virtual":
                                        route = 'tribute';
                                        break;
                                    case "investor":
                                        route = 'investors';
                                        break;
                                    case "news_caishengu":
                                        route = 'csg';
                                        break;
                                    case "news_financing":
                                        route = 'borrow';
                                        break;
                                    case "news_innovation":
                                        route = 'create';
                                        break;
                                    case "order":
                                        route = 'shopping';
                                        break;
                                    case "project":
                                        route = 'item';
                                        break;
                                    case "quanzi":
                                        route = 'round';
                                        break;
                                    case "shareholder":
                                        route = 'shareholder';
                                        break;
                                    case "statistic":
                                        route = 'statistics';
                                        break;
                                    case "user_related":
                                        route = 'user';
                                        break;
                                }

                                var item = {
                                    name: i,
                                    route: route
                                }
                                datas.push(
                                    item
                                )
                            }

                        });


                        localStorage.setItem("user_list", JSON.stringify(datas));

                        if(dataT.scope == "staff")
                         {
                             if(datas.length == 0){
                                 $("#prompt").text("您没有相关用户权限");

                             }else{
                                 window.location.href = "/"+datas[0].route;
                             }
                         }
                         else if (dataT.scope == "admin") {
                         window.location.href = "/merchart/index";
                         } else if (dataT.scope == "user") {
                         window.location.href = "/myproject/index";

                         } else {
                         window.location.href = "/homepage";
                         }
                    }


                })

            }
        })
    }

});


/* error: function(jqXHR){
 console.log(jqXHR.status);
 if (jqXHR.status == 400) {

 }
 }*/


