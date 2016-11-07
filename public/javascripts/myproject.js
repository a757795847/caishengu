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
    var data =[{
        project_name:"哈哈哈哈哈"},{
        project_name:"呵呵呵呵呵"},{
        project_name:"嘿嘿嘿嘿嘿"}

    ]

$(document).ready(function (){

        $.each(data,function (i, order){
                var tbody = '<tr><td><span class="lf">' + order.project_name + '</span> <span class="rt"><a href="">&gt</a></span> </td></tr>'

                $('#Table').append(tbody);
            }
        )
    });
