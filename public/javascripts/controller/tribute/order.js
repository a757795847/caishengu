(function($){
    // [
    //     WebStaffOrderVirtualCollectionGetResItem {
    //     order_id:
    //     string *
    //     订单id
    //     order_description:
    //     string *
    //     订单描述
    //     user_name:
    //     string *
    //     购买人
    //     phone:
    //     string *
    //     联系方式
    // }
    // ]


    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/order/virtual/collection?'+token+'&state=all',
        dataType:'json',
        success:function(data){
            console.log(data);
            var orders = '';
            for (var i = 0; i < data.length; i++) {
                orders += '<tr><td>'+data[i].order_id+'</td><td>'+data[i].order_description+'</td><td>'+data[i].user_name+'</td><td>'+data[i].phone+'</td><td>';
                orders += '<span class="label label-info"><a href="/tribute/order/detail?'+data[i].order_id+'">查看详情</a></span></td></tr>'
            }
            $('#order').html(orders);
        },
        error:function(jqXHR){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            if(jqXHR.status == 400){

            }
        }
    })

    //搜索
    $('#searchOrder').on('click',function(){
        var textOrder = $('#textOrder').val();
        console.log(textOrder);
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/order/virtual/collection?'+token,
            data:{
                'state':'all',
                'keyword' : textOrder
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                var users = '';
                for (var i = 0; i < data.length; i++) {
                    users += '<tr><td>'+data[i].user_id+'</td><td>'+data[i].user_name+'</td><td>'+data[i].user_phone+'</td>';
                    users += '<td><span class="label label-info"><a href="/tribute/order/detail?'+data[i].order_id+'">查看</a></span></td></tr>'
                }
                $('#order').html(users);
            },
            error:function(jqXHR){
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                if(jqXHR.status == 400){

                }
            }
        })
    })

})(jQuery)