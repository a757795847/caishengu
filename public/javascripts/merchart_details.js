

var url=window.location.href;
var indexOf=url.indexOf("?");   //获取第一次出现？的位置下标
var val=url.substr(indexOf+1);
console.log(val);

$("#resetting").click(function(){
    $(".ps").val("");


});

$("#recording").click(function(){
    window.location.href='/merchart/history?'+val+'';

});

$(document).ready(function () {

console.log(val);
    $.get("http://" + backend_host + '/web/admin/manage/shop/'+val+'?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',

        function (data){
            console.log(data);
            $("#user_id").text(data.id);
            $("#user_name").val(data.contact_person);
            $("#tel").val(data.contact_phone);
            $("#shop").val(data.shop_name);
            $("#address").val(data.shop_address);
            $("#account").val(data.account);
            $("#money").text(data.remain);

            
            })

})
console.log(val);
    $("#confirm").click(function(){
        $(".example-modal").css("display","none");

    });
    
$("#keep").click(function(){
    var contact_person=$("#user_name").val();
    var contact_phone=$("#tel").val();
    var shop_name=$("#shop").val();
    var shop_address=$("#address").val();
    var account=$("#account").val();
    var user_phone=$("#user_phone").val();
    var user_password=$("#user_password").val();
    if( val!="http://localhost:9000/merchart/details"){
        $.ajax({
            type:'PUT',
            url:"http://" + backend_host + '/web/admin/manage/shop/'+val+'?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
            data: {
                "contact_person": contact_person,
                "contact_phone": contact_phone,
                "shop_name": shop_name,
                "shop_address" :shop_address,
                "account": account
            },
            dataType:'json',
            success:function(data){
                console.log(data);
            }

        })

    }else {
        $.ajax({
            type: 'POST',
            url: "http://" + backend_host + '/web/admin/manage/shop?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
            data: {
                "user_phone":user_phone,
                "user_password":user_password,
                "contact_person": contact_person,
                "contact_phone": contact_phone,
                "shop_name": shop_name,
                "shop_address": shop_address,
                "account": account
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
            }

        })
    }
    
});
