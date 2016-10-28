(function($){
    var data = [
        {
            'id': 'sdfsadfas',
            'name': '热销'
        },
        {
            'id': 'sdfsadfas',
            'name': '新品'
        },
        {
            'id': 'sdfsadfas',
            'name': '爆款'
        },
        {
            'id': 'sdfsadfas',
            'name': '热销'
        }
    ];



    $.ajax({
        type:'GET',
        url:'http://' + backend_host + '/web/staff/goods/market/class?access_token=10ae0842b11080b0b6c9412773164797',
        dataType:'json',
        success:function(data){
            console.log(data);
            var classNameLi = '';
            for(var i = 0; i<data.length; i++){
                classNameLi += '<li><button type="button" class="close">×</button><a href="'+data[i].id+'">'+data[i].name+'</a></li>'
            }
            $('#className').append(classNameLi);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })


    // [ 商城货架
    //     WebStaffGoodsMarketGetResItem {
    //     goods_id:
    //     string *
    //     商品id
    //     goods_image:
    //     string *
    //     商品图片
    //     price_money:
    //     string *
    //     现金价格
    //     price_coin:
    //     string *
    //     财神币价格
    // }
    // ]



    $.ajax({
        type:'GET',
        url:'http://' + backend_host + '/web/staff/goods/market?access_token=10ae0842b11080b0b6c9412773164797',
        dataType:'json',
        success:function(data){
            console.log(data);
            var frames = '';
            for(var i = 0; i<frame.length; i++){
                frames += '<tr><td><img src="'+frame[i].goods_image+'" /><span>门票</span><span>￥'+frame[i].price_money+'</span><span>'+frame[i].price_coin+'积分</span></td><td>';
                frames += '<span class="label label-info"><a href="#">下架</a></span><span class="label label-info"><a href="/shopping/frame/detail">编辑</a></span></td></tr>';
            }
            $('#goods tbody:eq(0)').html(frames);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })

    // [ 门票
    //     WebStaffGoodsTicketGetResItem {
    //     goods_id:
    //     string *
    //     商品id
    //     goods_image:
    //     string *
    //     商品图片
    //     price_point:
    //     string *
    //     积分价格
    // }
    // ]




    $.ajax({
        type:'GET',
        url:'http://' + backend_host + '/web/staff/goods/ticket?access_token=10ae0842b11080b0b6c9412773164797',
        dataType:'json',
        success:function(data){
            console.log(data);
            var tickets = '';
            for(var i = 0; i<dataTicket.length; i++){
                tickets += '<tr><td><img src="'+dataTicket[i].goods_image+'" /><span>门票</span><span>￥50</span><span>'+dataTicket[i].price_point+'积分</span></td><td>';
                tickets += '<span class="label label-info"><a href="#">下架</a></span><span class="label label-info"><a href="#">编辑</a></span></td></tr>'
            }
            $('#ticket tbody:eq(0)').html(tickets);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })


    $('#addClassName').on('click',function(){
        var addclass = $('#addName').val();
        $('#className').append('<li><button type="button" class="close">×</button><a href="#">'+addclass+'</a></li>');
        $('#addName').val('');
    });
    $('#className').on('click','li',function(){
        $('#className').find('li').removeClass('active');
        $(this).addClass('active');
    });
    $('#className').on('click','button',function(){
        var text = $(this).next().text();
        if(confirm('是否删除'+text+'这个分类')){
            $(this).parent().remove();
        }
    })

    //搜索
    $('#searchGoods').on('click',function(){
        var searchText = $('#goodsText').val();
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/goods/market?access_token=10ae0842b11080b0b6c9412773164797',
            data:{
                'keyword' : searchText
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                var frames = '';
                for(var i = 0; i<frame.length; i++){
                    frames += '<tr><td><img src="'+frame[i].goods_image+'" /><span>门票</span><span>￥'+frame[i].price_money+'</span><span>'+frame[i].price_coin+'积分</span></td><td>';
                    frames += '<span class="label label-info"><a href="#">下架</a></span><span class="label label-info"><a href="/shopping/frame/detail">编辑</a></span></td></tr>';
                }
                $('#goods tbody:eq(0)').html(frames);
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
    $('#searchTicket').on('click',function(){
        var searchText = $('#ticketText').val();
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/goods/market?access_token=10ae0842b11080b0b6c9412773164797',
            data:{
                'keyword' : searchText
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                var tickets = '';
                for(var i = 0; i<dataTicket.length; i++){
                    tickets += '<tr><td><img src="'+dataTicket[i].goods_image+'" /><span>门票</span><span>'+dataTicket[i].price_point+'积分</span></td><td>';
                    tickets += '<span class="label label-info"><a href="#">下架</a></span><span class="label label-info"><a href="#">编辑</a></span></td></tr>'
                }
                $('#ticket tbody:eq(0)').html(tickets);
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