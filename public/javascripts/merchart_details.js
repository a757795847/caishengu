

var merchart_details_type = window.location.search;
console.info("merchart_details_type", merchart_details_type);

var merchart_details_id = merchart_details_type.slice(1);
console.info("merchart_details_id", merchart_details_id);

/*var url=window.location.href;
console.info("url", url);
var indexOf=url.indexOf("?");   //获取第一次出现？的位置下标
console.info("indexOf", indexOf);
var val=url.substr(indexOf+1);
console.log("val", val);*/

$("#resetting").click(function(){
    $(".ps").val("");
});

$("#recording").click(function(){
    window.location.href='/merchart/history?'+merchart_details_id+'';
});

$(document).ready(function () {

    if (merchart_details_type !== "") {
        $.getJSON("http://" + backend_host + '/web/admin/manage/shop/' + merchart_details_id + '?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',

            function (data) {
                console.log(data);
                $("#mobile").val(data.mobile);
                $("#user_id").text(data.id);
                $("#user_name").val(data.contact_person);
                $("#tel").val(data.contact_phone);
                $("#shop").val(data.shop_name);
                $("#address").val(data.shop_address);
                $("#account").val(data.account);
                $("#money").text(data.remain);
                $("#openbank").val("中国银行-西城分行");
                jQuery('#qrcode').qrcode({width: 100,height: 100,correctLevel:0,text: data.id});
            })
    } else {
        $(".merchart-details-message").css("display", "none");
    }
});
    $("#confirm").click(function(){
        $(".example-modal").css("display","none");

    });
    
$("#keep").click(function(){
    var contact_person=$("#user_name").val();
    var contact_phone=$("#tel").val();
    var shop_name=$("#shop").val();
    var shop_address=$("#address").val();
    var account=$("#account").val();
    var user_phone=$("#mobile").val();
    var user_password=$("#user_password").val();

        if (merchart_details_type !== "") {
            if (contact_person == "" || contact_phone == "" || shop_name == "" || shop_address == "" || account == "") {
                $(".form-validation2").css("display", "none");
                $(".form-validation1").css("display", "block");
            } else if (!/^(\+86)?\s*1[34578]\d{9}$/.test(contact_phone)) {
                $(".form-validation1").css("display", "none");
                $(".form-validation2").css("display", "block");
            } else {
                $(".form-validation1").css("display", "none");
                $(".form-validation2").css("display", "none");
                $.ajax({
                    type: 'PUT',
                    url: "http://" + backend_host + '/web/admin/manage/shop/' + merchart_details_id + '?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
                    data: {
                        "contact_person": contact_person,
                        "contact_phone": contact_phone,
                        "shop_name": shop_name,
                        "shop_address": shop_address,
                        "account": account
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        location.href = "/merchart/index";
                    }

                })
            }
        } else {
            if (contact_person == "" || contact_phone == "" || shop_name == "" || shop_address == "" || account == "" || user_phone == "" || user_password == "") {
                $(".form-validation2").css("display", "none");
                $(".form-validation1").css("display", "block");
            } else if (!/^(\+86)?\s*1[34578]\d{9}$/.test(contact_phone)) {
                $(".form-validation1").css("display", "none");
                $(".form-validation2").css("display", "block");
            } else {
                $(".form-validation1").css("display", "none");
                $(".form-validation2").css("display", "none");
                $.ajax({
                    type: 'POST',
                    url: "http://" + backend_host + '/web/admin/manage/shop?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
                    data: {
                        "user_phone": user_phone,
                        "user_password": user_password,
                        "contact_person": contact_person,
                        "contact_phone": contact_phone,
                        "shop_name": shop_name,
                        "shop_address": shop_address,
                        "account": account
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        location.href = "/merchart/index";
                    }

                })
            }
        }


});
