(function($){

    var Urls = window.location.search.split('?')[1].split('&');
    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/order/market/'+Urls[0]+'?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);

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
            
            if(Urls[1] == 'wait'){
                var operation = '';
                operation += '<div class="box-footer clearfix">';
                operation += '<button type="button" class="btn btn-default btn-lg pull-right" data-toggle="modal" data-target="#myModal">关闭</button>';
                operation += '<button type="button" class="btn btn-default btn-lg pull-right" data-toggle="modal" data-target="#deliverCompany">发货</button>';
                operation += '</div>';
                $('#detail').append(operation);
            }
            if(Urls[1] != 'wait'){
                var news = '';
                if(Urls[1] == 'out' || Urls[1] == 'receive'){
                    news += '<div class="box"><p class="spot">物流信息</p><div class="order"><ul><li>物流公司：<span>'+data.deliver.company+'</span>';
                    news += '</li><li>单号：<span>'+data.deliver.order_no+'</span></li></ul></div></div>';
                    if(Urls[1] == 'receive'){
                        //少了收货时间和收货方式数据
                        news += '<div class="box"><p class="spot">收货信息</p><div class="order"><ul><li>收货时间：<span>2013-12-12 23:23:23</span>';
                        news += '</li><li>收货方式：<span>超时默认收货/主动收货</span></li></ul></div></div>';
                    }
                    $('#detail').append(news);
                }else {
                    news += '<div class="box"><p class="spot">操作员信息</p><div class="order"><ul><li>操作员：<span>'+data.close.operator+'</span>';
                    news += '</li><li>关闭时间：<span>'+data.close.close_time+'</span></li>';
                    news += '<li>原因：<span>'+data.close.close_reason+'</span></li></ul></div></div>';
                    $('#detail').append(news);

                }

            }
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })

    function detailAjax(operation_type , close_reason, deliver_company, deliver_order_no){
        if(arguments == 2){
            deliver_company = '';
            deliver_order_no = '';
        }else{
            close_reason = '';
        }
        $.ajax({
            type:'PUT',
            url:"http://" + backend_host + '/web/staff/order/market/'+Urls[0]+'?'+token,
            data:{
                'operation_type': operation_type,
                'close_reason': close_reason,
                'deliver_company': deliver_company,
                'deliver_order_no': deliver_order_no,
            },
            dataType:'json',
            success:function(data){
                console.log(data);

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }
    
    $('#closeNews').on('click',function () {
        var closeNews = $('#myModal textarea:eq(0)').val();
        detailAjax('close', closeNews);
    })
    $('#receive').on('click',function () {
        var deliverCompany = $('#deliverCompany select:eq(0)').val();
        var order = $('#deliverCompany input[type = "text"]').val();
        console.log(deliverCompany+ ','+order);
        detailAjax('close', deliverCompany, order);
    })
})(jQuery)