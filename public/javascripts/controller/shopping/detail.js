(function($){

    var Urls = window.location.search.split('?')[1].split('&');
    Urls[1] = decodeURI(Urls[1]);
    if(Urls[1] == '已支付'){
        $('.stateName').html('待发货详情')
    }else{
        console.log(Urls[1])
        $('.stateName').html(Urls[1]+'详情')
    }

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/order/goods/market/entity?order_id='+Urls[0]+'&'+token,
        dataType:'json',
        success:function(data){
            console.log(data);

            $('#downTime').text(data.order_time);
            $('#downTime').attr('data-id',data.order_id)
            $('#closeNews').attr('data-id',data.order_id)
            $('#downName').text(data.nick_name);
            var goodslist = '',goodsState = '',isRefund ;
            for(var i = 0; i < data.goods_list.length;i++){
                isRefund = data.goods_list[i].is_refund == true?
                    '<span class="label label-info label-text-left"><a href="#">已退货</a></span><span class="label  label-info"><a href="#">详情</a></span>':
                    '<span class="label label-info"><a href="#" class="refund" data-id="'+data.goods_list[i].goods_id +'"  data-spec="'+data.goods_list[i].spec_id +'" data-toggle="modal" data-target="#goodsRefund">退货</a></span><span class="label labelNone label-info"><a href="#">详情</a></span>';
                
                goodsState = data.goods_list[i].goods_status == '已支付'?
                '<input class="goodsState"  data-spec="'+data.goods_list[i].spec_id +'"  data-num="'+data.goods_list[i].number+'" data-id="'+data.goods_list[i].goods_id+'" type="checkbox">':
                    data.goods_list[i].goods_status;

                goodslist += '<tr><th><span>'+ data.goods_list[i].goods_name +'</span>规格:  <span>'+ data.goods_list[i].spec_size +'</span>      颜色:  <span>'+ data.goods_list[i].spec_color +'</span></th>';
                goodslist += '<th>¥<span>'+ data.goods_list[i].price +'</span></th><th>X <span>'+ data.goods_list[i].number +'</span></th><th>'+ data.goods_list[i].point_of_origin +'</th>';
                goodslist += '<th>'+ goodsState +'</th><th>'+ data.goods_list[i].delivery_company +'</th><th>'+ data.goods_list[i].delivery_id +'</th>';
                goodslist += '<th class="'+data.goods_list[i].goods_id+'">'+ isRefund +'</th></tr>';
            }
            $('#downGoods').html(goodslist);
            if(data.receive){
                $('#userName').text(data.receive.receiver_name);
                $('#userPhone').text(data.receive.phone);
                $('#address').text(data.receive.address);
            }
            if(Urls[1] == '已支付'){
                var operation = '';
                operation += '<div class="box-footer clearfix">';
                operation += '<button type="button" class="btn btn-default btn-lg pull-right" data-toggle="modal" data-target="#myModal">关闭</button>';
                operation += '<button type="button" class="btn btn-default btn-lg pull-right" data-toggle="modal" data-target="#deliverCompany">发货</button>';
                operation += '</div>';
                $('#detail').append(operation);
            }
            if(Urls[1] != '已支付'){
                var news = '';
                if(Urls[1] == '已收货'){
                    // news += '<div class="box"><p class="spot">物流信息</p><div class="order"><ul><li>物流公司：<span>'+data.deliver.company+'</span>';
                    // news += '</li><li>单号：<span>'+data.deliver.order_no+'</span></li></ul></div></div>';
                        //少了收货时间和收货方式数据
                        news = '<div class="box"><p class="spot">收货信息</p><div class="order"><ul><li>收货时间：<span>2013-12-12 23:23:23</span>';
                        news += '</li><li>收货方式：<span>超时默认收货/主动收货</span></li></ul></div></div>';
                    $('#detail').append(news);
                }else if(Urls[1] == '已关闭'){
                    news = '<div class="box"><p class="spot">操作员信息</p><div class="order"><ul><li>操作员：<span>'+data.closed.closed_name+'</span>';
                    news += '</li><li>关闭时间：<span>'+data.closed.closed_time+'</span></li>';
                    news += '<li>原因：<span>'+data.closed.closed_reason+'</span></li></ul></div></div>';
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


    //退货
    function returnAjax(orderId,goodsId,returnReason,goodsSpecId) {
        $.ajax({
            type:'PUT',
            url:"http://" + backend_host + '/web/staff/order/goods/market/entity/goods?'+token,
            data:{
                'order_id': orderId,
                'goods_id':goodsId,
                'return_reason': returnReason,
                'goods_spec_id':goodsSpecId
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

    function closeAjax( orderId ,closeReason) {
        $.ajax({
            type:'PUT',
            url:"http://" + backend_host + '/web/staff/order/goods/market/entity?'+token+'&order_id='+orderId+'&close_reason='+closeReason,
            dataType:'json',
            success:function(data){
                console.log(data);
                location.href = '/shopping';
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
    function deliveryAjax(orderId,goodsId,goodsSpecId,goodsQuantity,deliveryCompanyId,deliveryCompanyName,deliveryOrderId) {
        $.ajax({
            type:'POST',
            url:"http://" + backend_host + '/web/staff/order/goods/market/entity/delivery/entity?'+token,
            contentType:"application/json; charset=UTF-8",
            data:JSON.stringify({
                'order_id': orderId,
                'goods_id':goodsId,
                'goods_spec_id':goodsSpecId,
                'goods_quantity':goodsQuantity,
                'delivery_company_id': deliveryCompanyId,
                'delivery_company_name':deliveryCompanyName,
                'delivery_order_id':deliveryOrderId
            }),
            dataType:'json',
            success:function(data){
                console.log(data);
                location.href = '/shopping'
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
    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/other/definition/delivery?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var delivery = '';
            for (var i = 0;i<data.length;i++){
                delivery += '<option data-id="'+ data[i].id +'">'+ data[i].company_name +'</option>'
            }
            $('#delivery').html(delivery);

        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })

    $('#detail').on('click','.refund',function () {
        $('#refundNews').attr('data-id',$(this).data('id'))
        $('#refundNews').attr('data-spec',$(this).data('spec'))
    })

    $('#refundNews').on('click',function () {
        var orderId = $('#downTime').data('id');
        var goodsId = $(this).data('id')
        var returnReason = $('#goodsRefund .form-control').val();
        var goodsSpecId = $(this).data('spec')
        returnAjax(orderId,goodsId,returnReason,goodsSpecId);
        var reasonHtml = '<span class="label label-info label-text-left"><a href="#">已退货</a></span><span class="label  label-info"><a href="#">详情</a></span>';
        $('#downGoods').find('.'+$(this).data('id')).html(reasonHtml);
        $('#goodsRefund .form-control').val('')
    })
    //receive
    $('#receive').on('click',function () {
        var orderId = $('#downTime').data('id');
        var deliveryCompanyId = $("#delivery").find("option:selected").data('id');
        var deliveryCompanyName = $("#delivery").val();
        var deliveryOrderId = $('#deliverCompany').find('input').val();
        var goodsStateInputs = [];
        for(var i = 0;i < $('.goodsState').length;i++){
            if($('.goodsState').eq(i).is(":checked")){
                goodsStateInputs.push({
                    'id':$('.goodsState').eq(i).data('id'),
                    'num':$('.goodsState').eq(i).data('num'),
                    'spec':$('.goodsState').eq(i).data('spec')
                })
            }
        }

        if(goodsStateInputs.length > 0){
            for(var i =0;i<goodsStateInputs.length;i++){
                deliveryAjax(orderId,goodsStateInputs[i].id,goodsStateInputs[i].spec,goodsStateInputs[i].num,deliveryCompanyId,deliveryCompanyName,deliveryOrderId)
            }
            $('#deliverCompany').find('input').val('')
        }else{
            alert('未选择商品')
            $('#deliverCompany').find('input').val('')
        }

    })
    //close
    $('#closeNews').on('click',function () {
        var orderId = $(this).data('id');
        var closeReason = $('#myModal').find('textarea').val();
        closeAjax( orderId ,closeReason)
        $('#myModal').find('textarea').val('')
    })

    // $('#receive').on('click',function () {
    //     var deliverCompany = $('#deliverCompany select:eq(0)').val();
    //     var order = $('#deliverCompany input[type = "text"]').val();
    //     console.log(deliverCompany+ ','+order);
    //     detailAjax('close', deliverCompany, order);
    // })
})(jQuery)