(function($){
    // {
    //     order_id:
    //         string *
    //         订单id
    //     order_time:
    //         string *
    //         下单时间
    //     goods:
    //         [
    //             商品
    //             WebStaffOrderVirtualEntityGetResBasicGoods {
    //             goods_id:
    //             string *
    //             商品id
    //             goods_name:
    //             string *
    //             商品名
    //             quantity:
    //             integer * (int32)
    //             数量
    //         }
    //         ]
    //     user_name:
    //         string *
    //         收货人姓名
    //     user_phone:
    //         string *
    //         收货人联系方式
    // }
    
    var order_id = window.location.search.split('?')[1];
    console.log(order_id);
    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/order/virtual/entity?'+token+'&order_id='+order_id,
        dataType:'json',
        success:function(data){
            console.log(data);
            $('#orderTime').text(data.order_time);
            var goods = '';
            for(var i=0; i<data.goods.length;i++){
                goods += '<li><span>'+data.goods[i].goods_id+'</span><i>X'+data.goods[i].quantity+'</i></li>'
            };
            $('#goods').html(goods);
            $('#userName').text(data.user_name);
            $('#userPhone').text(data.user_phone);
        },
        error:function(jqXHR,textStatus,errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            if(jqXHR.status == 404){
                //history.go(-1);
            }
        }
    })


})(jQuery)