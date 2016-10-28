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

    var data = [
        {
            'order_id': '123456',
            'order_description': '蜡烛等3件商品',
            'user_name': '张三',
            'phone': '12345678933',
        },
        {
            'order_id': '123431234156',
            'order_description': '蜡烛等3件商品',
            'user_name': '张三',
            'phone': '12345678933',
        },
        {
            'order_id': '1234156',
            'order_description': '蜡烛等3件商品',
            'user_name': '张三',
            'phone': '12345678933',
        },
        {
            'order_id': '1456',
            'order_description': '蜡烛等3件商品',
            'user_name': '张三',
            'phone': '12345678933',
        }
    ]

    var orders = '';
    for (var i = 0; i < data.length; i++) {
        orders += '<tr><td>'+data[i].order_id+'</td><td>'+data[i].order_description+'</td><td>'+data[i].user_name+'</td><td>'+data[i].phone+'</td><td>';
        orders += '<span class="label label-info"><a href="/tribute/order/detail?'+data[i].order_id+'">查看详情</a></span></td></tr>'
    }
    $('#order').html(orders);

    //搜索
    $('#searchOrder').on('click',function(){
        var textOrder = $('#textOrder').val();
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/user?access_token=10ae0842b11080b0b6c9412773164797',
            data:{
                'keyword' : textOrder
            },
            dataType:'json',
            success:function(data){
                var users = '';
                for (var i = 0; i < data.length; i++) {
                    users += '<tr><td>'+data[i].user_id+'</td><td>'+data[i].user_name+'</td><td>'+data[i].user_phone+'</td>';
                    users += '<td><span class="label label-info"><a href="#">查看</a></span></td></tr>'
                }
                $('#users').html(users);
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