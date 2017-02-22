
$("#clear").click(function(){
    $("#echo input").val("");
});


var val=window.location.href.split('?')[1];
console.log(val);
$('#history').on('click',function () {
    location.href = '/manage/history?'+val
})
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;

    return currentdate;
}

$.get("http://" + backend_host + '/web/staff/finance/manage/shop/entity?'+token,
    {
        "shop_id":val,
    },
    function (data) {
        $('#datepicker').daterangepicker({
            drops:'up',
            opens:'right',
            minDate:data.last_settle_date,
            maxDate:getNowFormatDate()
        });
        console.log(data);
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


$("#confirm").click(function(){
    //没写完
    var vals = $("#datepicker").val();
    var datepicker=vals.split(' - ');
    var startDate = datepicker[0].toString().replace(/\/+/g,'-');
    var endDate = datepicker[1].toString().replace(/\/+/g,'-');
    $.ajax({
        type:'POST',
        url:"http://" + backend_host + '/web/staff/finance/manage/shop/entity/settlement?'+token+'&shop_id='+val+'&start_date='+startDate+'&end_date='+endDate,
        // contentType:'application/json',
        dataType:'json',
        success:function(data){
            console.log(data);
            // $("#confirm").attr("data-target","#myModal");
            $('#myModal').modal('show');
            $('#settlementTime').val(vals);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){
                $('#settlement').modal('hide');
                $('#settlement').on('hidden.bs.modal', function (e) {
                    errorMessage(jqXHR.responseJSON.error_description);
                })
            }
        }

    })

});

