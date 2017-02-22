var backend_host = "139.224.70.8:9001";
// var token = 'access_token='+localStorage.getItem('user_token');
var token = 'access_token=10ae0842b11080b0b6c9412773164797';

$("#one").click(function(){
    console.log("2");
    $("#one").addClass('active');
    $("#two").removeAttr('active');
});
$("#two").click(function(){
    $("#two").addClass('active');
    $("#one").removeAttr('active');
});