(function($){
    
    var data = {
        'images':[
            '/abc/acb.jpg'
        ],
        'title':'标题',
        'price_money':'300元',
        'price_coin':'4000元',
        'valid':true
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

    $('#operator').text(data.close.operator);
    $('#closeTime').text(data.close.close_time);
    $('#closeReason').text(data.close.close_reason);



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