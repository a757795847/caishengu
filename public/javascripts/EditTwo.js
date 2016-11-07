$("#Btnfifa").click(function(){
    if($('#echo').is(':hidden')){
        $('#echo').show();
    }
    else{
        $('#echo').hide();
    }
});
$("#clear").click(function(){
    $("#echo input").val("");

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
var indexOf=url.indexOf("?");   //获取第一次出现？的位置下标
var val=url.substr(indexOf+1);
console.log(val);



$(document).ready(function () {

    console.log(val);
    $.get("http://" + backend_host + '/web/staff/finance/manage/shop/entity?access_token=10ae0842b11080b0b6c9412773164797',
        {
            "shop_id":val,

        },

        function (data) {
            $("#shop_id").html(data.shop_id);
            $("#contact_person").html(data.contact_person);
            $("#contact_phone").html(data.contact_phone);
            $("#shop_name").html(data.shop_name);
            $("#shop_address").html(data.shop_address);
            $("#shop_account").html(data.shop_account);
            if(data.unfinished_finance !== undefined){
                $("#Btnfifa").html("申请中");
            }
            $("#last_settle_date").html(data.last_settle_date);




            



        })
});

$("#confirm").click(function(){
    var datepicker=$("#datepicker").val();
    var Kobe = $("#Kobe").val();
    $.ajax({
        type:'POST',
        url:"http://" + backend_host + '/web/staff/finance/manage/shop/entity/settlement?access_token=10ae0842b11080b0b6c9412773164797',
        data: {
            "shop_id":val,
            "start_date":datepicker,
            "end_date":Kobe
        },
        dataType:'json',
        success:function(data){
            console.log(data);
            $("#confirm").attr("data-target","#myModal");
        },
       error:function(jqXHR){
            if(jqXHR.status == 400){
            alert("请输入正确日期");
            }
        }

    })

});

