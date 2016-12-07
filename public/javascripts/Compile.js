
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
            $("#goods_market").attr("checked",data.goods_market);
            $("#goods_ticket").attr("checked",data.goods_ticket);
            $("#finance_approve").attr("checked",data.finance_approve);
            $("#coupon").attr("checked",data.coupon);
            $("#donate").attr("checked",data.donate);
            $("#caishengu_trend").attr("checked",data.caishengu_trend);
            $("#caishengu_introduction").attr("checked",data.caishengu_introduction);
            $("#caishengu_live").attr("checked",data.caishengu_live);

        })

});

console.log(val);
$("#target").click(function(){
    var staff_name = $("#admin_name").val();
    var staff_password = $("#staff_password").val();
    var staff_phone = $("#admin_tel").val();
    var statistic = $("#statistic").is(":checked");
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
    var goods_market = $("#goods_market").is(":checked");
    var goods_ticket = $("#goods_ticket").is(":checked");
    var finance_approve = $("#finance_approve").is(":checked");
    var coupon = $("#coupon").is(":checked");
    var donate = $("#donate").is(":checked");
    var caishengu_trend = $("#caishengu_trend").is(":checked");
    var caishengu_introduction = $("#caishengu_introduction").is(":checked");
    var caishengu_live = $("#caishengu_live").is(":checked");

         var datas = {
                  "staff_name": staff_name,
                  "staff_password":staff_password,
                  "staff_phone": staff_phone,
                  "statistic": statistic,
                  "user_related": User_related,
                  "investor": Investor,
                  "shareholder": Shareholder,
                  "order": Mall_orders,
                  "goods_market": goods_market,
                  "goods_virtual": Tripute,
                  "goods_ticket": goods_ticket,
                  "finance_approve": finance_approve,
                  "finance": Financial,
                  "activity": Activity,
                  "project": Project,
                  "quanzi": Circle,
                  "news_caishengu": Caishengu,
                  "news_financing": Financing,
                  "news_innovation": Business,
                  "coupon": coupon,
                  "donate": donate,
                  "caishengu_trend": caishengu_trend,
                  "caishengu_introduction": caishengu_introduction,
                  "caishengu_live": caishengu_live


    };
    datas = JSON.stringify(datas);
    if(val !='http://localhost:9000/administrator/details'){
        $.ajax({
            type:'PUT',
            contentType:'application/json',
            url:'http://'+ backend_host + '/web/admin/manage/staff/'+val+'?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
            data: datas,
            dataType:'json',
            success:function(data){
                console.log(data);
                $(".example-modal").css("display","block");
                console.log("put");
            },
            error:function(jqXHR){
                console.log(jqXHR.status);
                if(jqXHR.status == 406){
                    $(".example-modal").css("display","block");
                    $(".example-modal #keepWell").html("请正确填写信息!");

                }
            }

        })
    }else{
        $.ajax({
            type:'POST',
            contentType:'application/json',
            url:'http://'+ backend_host + '/web/admin/manage/staff?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
            data: datas,
            dataType:'json',
            success:function(data){
                console.log(data);
                $(".example-modal").css("display","block");
            },
            error:function(jqXHR){
                console.log(jqXHR.status);
                if(jqXHR.status == 406){
                    $(".example-modal").css("display","block");
                    $(".example-modal #keepWell").html("请正确填写信息!");
                    console.log("post");
                }
            }

        })

    }




    




});

$("#confirm").click(function(){
    $(".example-modal").css("display","none");

});

