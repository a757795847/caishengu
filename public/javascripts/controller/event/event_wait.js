(function($){

    // {
    //     activity_id:
    //         string *
    //         活动id
    //     poster:
    //         string *
    //         活动海报
    //     start_datetime:
    //         string *
    //         开始时间
    //     end_datetime:
    //         string *
    //         结束时间
    //     host_address:
    //         string *
    //         举办地点
    //     host:
    //         string *
    //         举办方
    //     limit_datetime:
    //         string *
    //         报名截止时间
    //     limit_person:
    //         string *
    //         报名人数上限
    //     introduction:
    //         string *
    //         简介
    //     contact_person:
    //         string *
    //         联系人
    //     contact_phone:
    //         string *
    //         联系电话
    //     state:
    //         string *
    //         申请状态
    // }

    var data = {
        'activity_id' : '123456',
        'poster':'/dsfds/fsdf/dsf.jpg',
        'start_datetime':'2016.04.04 周六 14:00',
        'end_datetime':'2016.05.04 周六 14:00',
        'host_address':'杭州市文二路华星大厦12楼',
        'host':'杭州丽云集团',
        'limit_datetime':'2016.04.10 周六 14:00',
        'limit_person':'100人',
        'host':'100人',
        'introduction':'我是简介',
        'contact_person':'张经理',
        'contact_phone':'2345678',
        'state':'是'
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