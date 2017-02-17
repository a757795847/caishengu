$("#jqueryPage").pagination({
    count: 25, //总数
    size:5, //每页数量
    index: 1,//当前页
    lrCount: 3,//当前页左右最多显示的数量
    lCount: 1,//最开始预留的数量
    rCount: 1,//最后预留的数量
    callback: function (options) {

    }
});
$("#Pagetwo").pagination({
    count: 25, //总数
    size:5, //每页数量
    index: 1,//当前页
    lrCount: 3,//当前页左右最多显示的数量
    lCount: 1,//最开始预留的数量
    rCount: 1,//最后预留的数量
    callback: function (options) {

    }

});

$("#stretch").click(function(){

    $(".breadcrumb li a").html('<i class="fa fa-dashboard"></i>我的活动');

});
$("#project").click(function(){

    $(".breadcrumb li a").html('<i class="fa fa-dashboard"></i>我的项目');

});

$(document).ready(function (){

    $.getJSON("http://" + backend_host + '/web/user/project?access_token=b16470a96ef88930e260448733550bd3',
        function (data) {
            console.log(data);
            var tbody = "";

            $.each(data.list,function (i, order){
                 tbody += '<tr class="myProject-jump" id="'+order.project_id+'"><td><span class="lf">' + order.project_name + '</span> <span class="rt"><a href="">&gt</a></span> </td></tr>'

                }
            );
            $('#Table').append(tbody);
            $(".myProject-jump").click(function () {
                var project_id = $(this).attr("id");
                console.info("project_id", project_id);
                location.href = "/myproject/details" + "?id=" + project_id;
            })
        });

    $.getJSON("http://" + backend_host + '/web/user/activity?access_token=b16470a96ef88930e260448733550bd3',
        function (data) {
            console.log(data);
            var tbody = "";

            $.each(data.list,function (i, order){
                 tbody += '<tr class="myProject-jump" id="'+order.project_id+'"><td><span class="lf">' + order.activity_name + '</span> <span class="rt"><a href="">&gt</a></span> </td></tr>'

                }
            );
            $('#Table2').append(tbody);
        })

    $("#turn").click(function () {
        location.href = "/myproject/details";
    })

    });
