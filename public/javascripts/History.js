//日历插件
$('#btnLeft').click(function(){
    if($('#eacl').is(':hidden')){
        $('#eacl').show();}
    else{$('#eacl').hide();}
});
$("#clear").click(function(){
    $("#eacl input").val("");
});
$(function () {
    $('#datepicker').datepicker({
        autoclose: true
    });
    $('#Kobe').datepicker({
        autoclose: true
    });
});





var url=window.location.href;
var indexOf=url.indexOf("?");
var val=url.substr(indexOf+1);
console.log(val);
var data=[
    {
        "finance_type": "转账",
        "from_id": "1000001",
        "from_name": "布拉德皮特",
        "money": "+5",
        "datetime": "2016-10-31",
        "remark": "之前有拖账"
    },
    {
        "finance_type": "结清",
        "from_id": "10086",
        "from_name": "安吉丽娜朱莉",
        "money": "-500",
        "datetime": "2016-09-31",
        "remark": ""



    }


]

$(document).ready(function () {
   /* $.ajax({
        type: 'GET',
        url: "http://" + backend_host + '/web/admin/manage/shop/' + val + '/finance?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        dataType: 'json',
        success: function (data) {*/
            var body = "";
            $.each(data, function (i, order)
    body += '<tr></tr><td> <p style="height:36px;padding:10px"> <span class="lt" id="Transfer">' + order.finance_type + '</span><span class="rg"id="add_rmb">' + order.money + '</span> </p>'
    body += '<p style="height:36px;padding:10px"> <span class="lt">来源:</span><span class="lt" id="user_name">' + order.from_name + '</span>'
    body += '<span class="lt" id="Name">' + order.from_id + '</span> <span class="rg" id="date">' + order.datetime + '</span> </p> </td></tr>'
                $("#Table").append(body);
            });


        //}

   // });
});

function indexAjxa(index,size){
    $.get("http://" + backend_host + '/web/admin/manage/shop?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":index,
            "limit":size
        },
        function (data) {
            var body = "";
            $.each(data, function (i, order) {
                body = '<tr></tr><td> <p style="height:36px;padding:10px"> <span class="lt" id="Transfer">' + order.finance_type + '</span><span class="rg"id="add_rmb">' + order.money + '</span> </p>'
                body += '<p style="height:36px;padding:10px"> <span class="lt">来源:</span><span class="lt" id="user_name">' + order.from_name + '</span>'
                body += '<span class="lt" id="Name">' + order.from_id + '</span> <span class="rg" id="date">' + order.datetime + '</span> </p> </td></tr>'
                $('#Table').append(body);

            });
        }
    )
}


$("#jqueryPage").pagination({
    count: 5, //总数
    size:5, //每页数量
    index: 1,//当前页
    lrCount: 3,//当前页左右最多显示的数量
    lCount: 1,//最开始预留的数量
    rCount: 1,//最后预留的数量
    callback: function (options) {
        var index = options.index -1;
        var size = options.size;
        indexAjxa(index,size);
        //options.count = 300;
        //return options;
    },
});
