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

$("#merchart_history_close").click(function () {
    $("#eacl").css("display", "none");
});



/*

var url=window.location.href;
console.info("url", url);
var indexOf=url.indexOf("?");
console.info("indexOf", indexOf);
var val=url.substr(indexOf+1);
console.info("val", val);
*/

var val = window.location.search.slice(1);
console.info("val_id", val);

$(document).ready(function () {
   $.ajax({
        type: 'GET',
        url: "http://" + backend_host + '/web/admin/manage/shop/' + val + '/finance?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        dataType: 'json',
        data:{
           "page":0,
           "limit":5
        },
        success: function (data) {
            console.log(data);
            var tbody = "";
            if (data.list.length == 0) {
                tbody += '<tr><td class="nothing-data">暂无历史记录</td>></tr>'
            } else {
                $.each(data.list, function (i, order) {
                    tbody += '<tr><td><p style="height:36px;padding:10px"><span class="lt" id="Transfer">' + order.finance_type + '</span>';
                    tbody += '<span class="rg"id="add_rmb">+' + order.money + '</span></p><p style="height:36px;padding:10px">';
                    tbody += '<span class="lt">来源:</span><span class="lt" id="user_name">' + order.from_name + '</span><span class="lt" id="Name">' + order.from_id + '</span>';
                    tbody += '<span class="rg" id="date">' + order.datetime + '</span> </p> </td></tr>';
                });
            }
                $("#Table").html(tbody);

        }

    });
});

function indexAjxa(index,size){
    $.getJSON("http://" + backend_host + '/web/admin/manage/shop/' + val + '/finance?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":index,
            "limit":size
        },
        function (data) {
            var tbody = "";
                $.each(data.list, function (i, order){
                    tbody +='<tr><td><p style="height:36px;padding:10px"><span class="lt" id="Transfer">'+order.finance_type+'</span>';
                    tbody +='<span class="rg"id="add_rmb">+'+order.money+'</span></p><p style="height:36px;padding:10px">';
                    tbody +='<span class="lt">来源:</span><span class="lt" id="user_name">'+order.from_name+'</span><span class="lt" id="Name">'+order.from_id+'</span>';
                    tbody +='<span class="rg" id="date">'+order.datetime+'</span> </p> </td></tr>';
            });
            $('#Table').html(tbody);
        }
    )
}


$("#jqueryPage").pagination({
    count: 10, //总数
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
    }
});
$("#comfirm").click(function(){
    var datepicker=$("#datepicker").val();
    var Kobe=$("#Kobe").val();
    console.log("datepicker", datepicker);
    console.log("Kobe", Kobe);
    console.log("val", val);
    $.ajax({
        type: 'GET',
        url: "http://" + backend_host + '/web/admin/manage/shop/' + val + '/finance?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        dataType: 'json',
        data:{
            "page":0,
            "limit":5,
            "start_date":datepicker,
            "end_date":Kobe
        },
        success: function (data) {
            console.log(data);
            var tbody = "";
            $.each(data.list, function (i, order){
                tbody +='<tr><td><p style="height:36px;padding:10px"><span class="lt" id="Transfer">'+order.finance_type+'</span>';
                tbody +='<span class="rg" id="add_rmb">'+order.money+'</span></p><p style="height:36px;padding:10px">';
                tbody +='<span class="lt">来源:</span><span class="lt" id="user_name">'+order.from_name+'</span><span class="lt" id="Name">'+order.from_id+'</span>';
                tbody +='<span class="rg" id="date">'+order.datetime+'</span> </p> </td></tr>';
            });
            $('#Table').html(tbody);
        }
    });

});
 $("#turn").click(function(){
     // history.go(-1);
     window.location.href = '/merchart/details?' + val;
 });

$("#btnRight").click(function () {
    location.href = "http://" + backend_host + '/web/admin/manage/shop/'+val+'/finance/output?&access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1';
});