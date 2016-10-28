(function($){

    // [
    //     WebStaffOrderMarketGetResItem {
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
            'order_description': '财神饼等3件商品',
            'user_name': '张三',
            'phone': '12345678933'
        },
        {
            'order_id': '123456',
            'order_description': '财神饼等3件商品',
            'user_name': '张三',
            'phone': '12345678933'
        },
        {
            'order_id': '123456',
            'order_description': '财神饼等3件商品',
            'user_name': '张三',
            'phone': '12345678933'
        },
        {
            'order_id': '123456',
            'order_description': '财神饼等3件商品',
            'user_name': '张三',
            'phone': '12345678933'
        }
    ]

    var waits = '';
    for (var i = 0; i < data.length; i++) {
        waits += '<tr><td>'+data[i].order_id+'</td><td>'+data[i].order_description+'</td><td>'+data[i].user_name+'</td><td>'+data[i].phone+'</td><td><span class="label label-info">';
        waits += '<a href="/shopping/wait">详情</a></span><span class="label label-info"><a href="#" data-toggle="modal" data-target="#myModal">关闭</a></span></td></tr>';
    }
    $('#wait tbody:eq(0)').html(waits);


    function indexAjax(tabID,state){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/order/market?access_token=10ae0842b11080b0b6c9412773164797',
            data : {
                'state': state
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                var shopping = '',urlA = '';
                if(state == 'paid'){
                    urlA = '/shopping/wait?'+data[i].shop_id;
                }else if(state == 'deliver'){
                    urlA = '/shopping/out?'+data[i].shop_id;
                }else if(state == 'delivered'){
                    urlA = '/shopping/receive?'+data[i].shop_id;
                }else{
                    urlA = '/shopping/close?'+data[i].shop_id;
                }
                for (var i = 0; i < data.length; i++) {
                    shopping += '<tr><td>'+data[i].shop_id+'</td><td>'+data[i].shop_name+'</td><td>'+data[i].contact_person+'</td>';
                    shopping += '<td><span class="label label-info"><a href="'+ urlA +'">查看</a></span>';
                    if(state == 'paid'){
                        shopping += '<span class="label label-info"><a href="#" data-toggle="modal" data-target="#myModal">关闭</a></span>';
                    }
                    shopping +='</td></tr>';
                    if(state == 'closed'){
                        shopping += '<td>张三</td><td>2015-3-3 12：34：35</td>';
                    }
                }
                tabID.html(shopping);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }
    indexAjax($('#wait tbody:eq(0)'),'paid');
    indexAjax($('#out tbody:eq(0)'),'deliver');
    indexAjax($('#receive tbody:eq(0)'),'delivered');
    indexAjax($('#close tbody:eq(0)'),'closed');

    $('#closeNews').on('click',function(){
        $('#myModal textarea').val();
        
    })
})(jQuery)