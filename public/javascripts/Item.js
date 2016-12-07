$("#Away").click(function(){
   $("[name='yoursuggest']").val("");


});

$("#reject").click(function(){
    var sub=$(".rejectFrame").css("display","block");
console.log(sub);


});

var url=window.location.href;
var indexOf=url.indexOf("?");
var val=url.substr(indexOf+1);
console.log(val);
$("#clear").click(function(){
    $("textarea").val("");
    
    
});
/*$(document).ready(function () {
    $.get("http://" + backend_host + '/web/staff/user/'+val+'?access_token=10ae0842b11080b0b6c9412773164797',
        function (data) {
            console.log(data);
            $("#user_id").html(data.user_id);
            $("#user_name").html(data.user_name);
            $("#user_phone").html(data.user_phone);
            $("#user_position").html(data.user_position);
            if(data.is_investor==true){
                $("#is_investor").html("是");
            }else{
                $("#is_investor").html("否");
            }
            if(data.is_shareholder==true){
                $("#is_shareholder").html("是");

            }else{
                $("#is_shareholder").html("否");
            }
            $("#birthday").html(data.birthday);
            $("#birthdate").html(data.birthdate);
            $("#location").html(data.location);
          //  $("#avatar").attr("src",'@routes.Assets.at("images'+data.avatar+'")');






        })
});*/

$('table img').zoomify();

   /*var sub= $(".zoomify").attr("class");
    if(sub="zoomify zoomed"){
        console.log("ss");
        $(".zoomify").css("transform","scale(10.4)translate(39.527px,13.2955px)");

    }*/