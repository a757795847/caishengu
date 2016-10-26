(function($){
    var data = {
        'basic':{
            'order_id':'123456',
            'order_time':'2013-03-01 12:12:12',
            'goods':[
                {
                    'goods_id':'123456',
                    'goods_name':'财神饼',
                    'quantity':1

                },
                {
                    'goods_id':'123456',
                    'goods_name':'财神水',
                    'quantity':1

                }
            ],
            'user_name':'张三',
            'user_phone':1234567891232133,
            'address':'浙江省杭州市滨江区天恒大厦',
            'zipcode':31000
        },
        'deliver':{
            'company':'顺丰快递',
            'order_no':'12345678933'

        },
        'close':{
            'operator':'张三',
            'close_time':'2014-10-2 23：23：23',
            'close_reason':'客户打电话说不要了'
        }
    }
    $('#downTime').text(data.basic.order_time);
    var goodslist = '';
    for(var i = 0; i<data.basic.goods.length;i++){
        goodslist += '<li><span>'+data.basic.goods[i].goods_name+'</span><i>X'+data.basic.goods[i].quantity+'</i></li>';
    }
    $('#downGoods').html(goodslist);

    $('#userName').text(data.basic.user_name);
    $('#userPhone').text(data.basic.user_phone);
    $('#address').text(data.basic.address);
    $('#zipcode').text(data.basic.zipcode);


    $('#company').text(data.deliver.company);
    $('#orderNo').text(data.deliver.order_no);


    // $.ajax({
    //     type:'POST',
    //     url:"http://" + backend_host + '/auth/oauth/access_token',
    //     dataType:'json',
    //     success:function(data){
    //
    //     },
    //     error:function(jqXHR){
    //         if(jqXHR.status == 400){
    //
    //         }
    //     }
    // })
})(jQuery)