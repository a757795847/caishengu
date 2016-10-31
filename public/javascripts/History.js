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
   /* $.get("http://" + backend_host + '/web/admin/manage/shop/'+val+'/finance?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        function (data) {
            console.log(data);
        });*/
        $.each(data, function (i, order) {
            var body = "";
            body = '<tr></tr><td> <p style="height:36px;padding:10px"> <span class="lt" id="Transfer">' + order.finance_type + '</span><span class="rg"id="add_rmb">' +order.money+ '</span> </p>'
            body += '<p style="height:36px;padding:10px"> <span class="lt">来源:</span><span class="lt" id="user_name">' + order.from_name + '</span>'
            body += '<span class="lt" id="Name">'+order.from_id+'</span> <span class="rg" id="date">' + order.datetime + '</span> </p> </td></tr>'
            $('#Table').append(body);
        });

                var tab = '<li id="Left"><a href="#">&laquo;</a></li>';
                for(var i=0;i<5;i++){
                    tab +='<li><a href="#">'+[i+1]+'</a></li>'
                }
                tab += '<li id="Right"><a href="#">&raquo;</a></li>';
                $('.pagination').append(tab);

});



$('.pagination:eq(0)').on('click','li',function() {
    var index = $(this).index() - 1;
    if(index==0){
        $("#Left").addClass("disabled");
    }else{
        $("#Left").removeClass('disabled');

    }
    var index_right=$(this).index()+1;
    if(index_right==6){
        $("#Right").addClass("disabled");

    }else{
        $("#Right").removeClass('disabled');
    }
    $(this).addClass('active').siblings().removeClass('active');



    $.get("http://" + backend_host + '/web/admin/manage/shop/'+val+'/finance?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":index,
            "limit":5
        },
        function (data) {
           $.each(data, function (i, order) {
                var body = "";
                body = '<tr></tr><td> <p style="height:36px;padding:10px"> <span class="lt" id="Transfer"></span><span class="rg"id="add_rmb">' +order.money+ '</span> </p>'
                body += '<p style="height:36px;padding:10px"> <span class="lt">来源:</span><span class="lt" id="user_name">' + order.from_name + '</span>'
                body += '<span class="lt" id="Name">'+order.from_id+'</span> <span class="rg" id="date">' + order.datetime + '</span> </p> </td></tr>'
                $('#Table').append(body);
            });

        }
    )


});
