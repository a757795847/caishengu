(function ($) {
    // //日历插件
    // $('#btnLeft').click(function(){
    //     if($('#eacl').is(':hidden')){
    //         $('#eacl').show();}
    //     else{$('#eacl').hide();}
    // });
    // $("#clear").click(function(){
    //     $("#eacl input").val("");
    // });
    //
    //


    var val=location.search.split('?')[1];

    $.ajax({
        type: 'GET',
        url: "http://" + backend_host + '/web/staff/finance/manage/shop/entity/history/collection?'+token+'&shop_id='+val,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var tbody = "";
            $.each(data.list, function (i, order){
                tbody +='<tr><td><p style="height:36px;padding:10px"><span class="lt" id="Transfer">'+order.finance_type+'</span>';
                tbody +='<span class="rg"id="add_rmb">+'+order.money+'</span></p><p style="height:36px;padding:10px">';
                tbody +='<span class="lt">来源:</span><span class="lt" id="user_name">'+order.from_name+'</span><span class="lt" id="Name">'+order.from_id+'</span>';
                tbody +='<span class="rg" id="date">'+order.datetime+'</span> </p> </td></tr>';
            });
            $("#Table").html(tbody);

        }

    });


    function indexAjxa(index,size){
        $.get("http://" + backend_host + '/web/admin/manage/shop/' + val + '/finance?'+token,
            {
                "page":index,
                "limit":size
            },
            function (data) {
                var tbody = "";
                $.each(data, function (i, order){
                    tbody +='<tr><td><p style="height:36px;padding:10px"><span class="lt" id="Transfer">'+order.finance_type+'</span>';
                    tbody +='<span class="rg"id="add_rmb">+'+order.money+'</span></p><p style="height:36px;padding:10px">';
                    tbody +='<span class="lt">来源:</span><span class="lt" id="user_name">'+order.from_name+'</span><span class="lt" id="Name">'+order.from_id+'</span>';
                    tbody +='<span class="rg" id="date">'+order.datetime+'</span> </p> </td></tr>';


                });
                $('#Table').html(tbody);
            }
        )
    }


    $("#comfirm").click(function(){
        var datepicker=$("#datepicker").val();
        var Kobe=$("#Kobe").val();
        $.ajax({
            type: 'GET',
            url: "http://" + backend_host + '/web/admin/manage/shop/' + val + '/finance?'+token,
            dataType: 'json',
            data:{
                "page":0,
                "limit":5,
                "start_date":datepicker,
                "end_date":Kobe
            },
            success: function (data) {
                console.log(data);
                var tbody = "";
                $.each(data, function (i, order){
                    tbody +='<tr><td><p style="height:36px;padding:10px"><span class="lt" id="Transfer">'+order.finance_type+'</span>';
                    tbody +='<span class="rg"id="add_rmb">+'+order.money+'</span></p><p style="height:36px;padding:10px">';
                    tbody +='<span class="lt">来源:</span><span class="lt" id="user_name">'+order.from_name+'</span><span class="lt" id="Name">'+order.from_id+'</span>';
                    tbody +='<span class="rg" id="date">'+order.datetime+'</span> </p> </td></tr>';


                });
                $('#Table').html(tbody);


            }
        });

    });

    $(".turn").on('click',function(){
        history.go(-1);
    });

    $('#btnRight').on('click',function () {
        location.href = "http://" + backend_host + "/web/staff/finance/manage/shop/entity/history/collection/output?"+token+"&shop_id="+val;
    });

})(jQuery)
