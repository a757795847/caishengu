var backend_host = "139.224.70.8:9001";
var token = 'access_token='+localStorage.getItem('user_token');

$("#one").click(function(){
    console.log("2");
    $("#one").addClass('active');
    $("#two").removeAttr('active');
});
$("#two").click(function(){
    $("#two").addClass('active');
    $("#one").removeAttr('active');
});