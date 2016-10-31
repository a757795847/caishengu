
$(".checkbox-toggle").click(function () {
    var clicks = $(this).data('clicks');
    if (clicks) {
        //Uncheck all checkboxes
        $(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
        $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
    } else {
        //Check all checkboxes
        $(".mailbox-messages input[type='checkbox']").iCheck("check");
        $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
    }
    $(this).data("clicks", !clicks);
});

$("#resetting").click(function(){
    $(".ps").val("");


});

var url=window.location.href;
var indexOf=url.indexOf("?");
var val=url.substr(indexOf+1);

$(document).ready(function () {

    console.log(val);
    $.get("http://" + backend_host + '/web/admin/manage/staff/'+val+'?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',

        function (data){
            $("#admin_id").text(data.staff_id);
            $("#admin_name").val(data.staff_name);
            $("#admin_tel").val(data.staff_phone);
            $("#statistics").attr("checked",data.statistic);
            $("#User_related").attr("checked",data.user_related);
            $("#Investor").attr("checked",data.investor);
            $("#Shareholder").attr("checked",data.shareholder);
            $("#Mall_orders").attr("checked",data.order);
            $("#Tripute").attr("checked",data.goods_virtual);
            $("#Financial").attr("checked",data.finance);
            $("#Activity").attr("checked",data.activity);
            $("#Project").attr("checked",data.project);
            $("#Circle").attr("checked",data.quanzi);
            $("#Caishengu").attr("checked",data.news_caishengu);
            $("#Financing").attr("checked",data.news_financing);
            $("#Business").attr("checked",data.news_innovation);
            var git=$("#statistics").is(":checked");
            console.log(git);
        })

});


$("#target").click(function(){
    var staff_name = $("#admin_name").val();
    var staff_password = $("#staff_password").val();
    var staff_phone = $("#admin_tel").val();
    var statistics = $("#statistics").is(":checked");
    var User_related = $("#User_related").is(":checked");
    var Investor = $("#Investor").is(":checked");
    var Shareholder = $("#Shareholder").is(":checked");
    var Mall_orders = $("#Mall_orders").is(":checked");
    var Tripute = $("#Tripute").is(":checked");
    var Financial = $("#Financial").is(":checked");
    var Activity = $("#Activity").is(":checked");
    var Project = $("#Project").is(":checked");
    var Circle = $("#Circle").is(":checked");
    var Caishengu = $("#Caishengu").is(":checked");
    var Financing = $("#Financing").is(":checked");
    var Business = $("#Business").is(":checked");

    $.ajax({
        type:'POST',
        url:"http://" + backend_host + '/web/admin/manage/staff?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        data: {
            "staff_name": staff_name,
            "staff_password": staff_password,
            "staff_phone": staff_phone,
            "statistics" :statistics,
            "user_related": User_related,
            "investor": Investor,
            "shareholder": Shareholder,
            "order": Mall_orders,
            "goods_virtual": Tripute,
            "finance": Financial,
            "activity": Activity,
            "project": Project,
            "quanzi": Circle,
            "news_caishengu": Caishengu,
            "news_financing": Financing,
            "news_innovation": Business,


        },
        dataType:'json',
        success:function(data){
            console.log(data);
            $(".example-modal").css("display","block");
        },
        error:function(jqXHR){
            console.log(jqXHR.status);
            if(jqXHR.status == 406){
                $(".example-modal").css("display","block");
                $(".example-modal #keepWell").html("请完整填写信息!");
            }
        }

    })
    




});

$("#confirm").click(function(){
    $(".example-modal").css("display","none");

});

