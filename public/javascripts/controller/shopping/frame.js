(function($){
    //分类列表
    $.ajax({
        type:'GET',
        url:'http://' + backend_host + '/web/staff/goods/market/class?access_token=10ae0842b11080b0b6c9412773164797',
        dataType:'json',
        success:function(data){
            console.log(data);
            var classNameLi = '';
            for(var i = 0; i<data.length; i++){
                classNameLi += '<li><button type="button" class="close">×</button><a href="#" data-id="'+data[i].id+'">'+data[i].name+'</a></li>'
            }
            $('#className').append(classNameLi);
        },
        error:function(jqXHR,textStatus,errorThrown){
            if(jqXHR.status == 400){

            }
        }
    })


    //商品列表
    // $.ajax({
    //     type:'GET',
    //     url:'http://' + backend_host + '/web/staff/goods/market?access_token=10ae0842b11080b0b6c9412773164797',
    //     dataType:'json',
    //     success:function(data){
    //         console.log(data);
    //         var frames = '';
    //         for(var i = 0; i<frame.length; i++){
    //             frames += '<tr><td><img src="'+frame[i].goods_image+'" /><span>门票</span><span>￥'+frame[i].price_money+'</span><span>'+frame[i].price_coin+'积分</span></td><td>';
    //             frames += '<span class="label label-info"><a href="#">下架</a></span><span class="label label-info">';
    //             frames += '<a href="/shopping/frame/detail?frame&"'+data.goods_id+'>编辑</a></span></td></tr>';
    //         }
    //         $('#goods tbody:eq(0)').html(frames);
    //     },
    //     error:function(jqXHR,textStatus,errorThrown){
    //         if(jqXHR.status == 400){
    //
    //         }
    //     }
    // })


    //门票列表
    $.ajax({
        type:'GET',
        url:'http://' + backend_host + '/web/staff/goods/ticket?access_token=10ae0842b11080b0b6c9412773164797',
        dataType:'json',
        success:function(data){
            console.log(data);
            var tickets = '';
            for(var i = 0; i<dataTicket.length; i++){
                tickets += '<tr><td><img src="'+dataTicket[i].goods_image+'" /><span>门票</span><span>￥50</span></td><td>';
                tickets += '<span class="label label-info"><a href="#">下架</a></span><span class="label label-info">';
                tickets += '<a href="/shopping/frame/detail?ticket&"'+data.goods_id+'>编辑</a></span></td></tr>'
            }
            $('#ticket tbody:eq(0)').html(tickets);
        },
        error:function(jqXHR,textStatus,errorThrown){
            if(jqXHR.status == 400){

            }
        }
    })

    //新增分类
    $('#addClassName').on('click',function(){
        var addclass = $('#addName').val();
        $.ajax({
            type:'POST',
            url:'http://' + backend_host + '/web/staff/goods/market/class?access_token=10ae0842b11080b0b6c9412773164797',
            data:{
                'class_name':addclass
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                $('#className').append('<li><button type="button" class="close">×</button><a href="#" data-id="'+data[i].id+'">'+addclass+'</a></li>');
                $('#addName').val('');
            },
            error:function(jqXHR,textStatus,errorThrown){
                if(jqXHR.status == 400){

                }
            }
        })
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



    //商品搜索
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
                    frames += '<span class="label label-info"><a href="#">下架</a></span><span class="label label-info">';
                    frames += '<a href="/shopping/frame/detail?frame&"'+data.goods_id+'>编辑</a></span></td></tr>';

                }
                $('#goods tbody:eq(0)').html(frames);
            },
            error:function(jqXHR,textStatus,errorThrown){
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
                    tickets += '<span class="label label-info"><a href="#">下架</a></span><span class="label label-info">';
                    tickets += '<a href="/shopping/frame/detail?ticket&"'+data.goods_id+'>编辑</a></span></td></tr>'
                }
                $('#ticket tbody:eq(0)').html(tickets);
            },
            error:function(jqXHR,textStatus,errorThrown){
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                if(jqXHR.status == 400){

                }
            }
        })
    })

    //新建
    $('#className').on('click','a',function(e){
        e.preventDefault();
        var addNew = $(this).attr('data-id');
        $('#addNew').attr('href','/shopping/frame/detail?' + addNew);
        $.ajax({
            type:'GET',
            url:'http://' + backend_host + '/web/staff/goods/market?access_token=10ae0842b11080b0b6c9412773164797',
            data:{
                'class_id':addNew
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                var frames = '';
                for(var i = 0; i<data.length; i++){
                    frames += '<tr><td><img src="'+frame[i].goods_image+'" /><span>财神像</span><span>￥'+data[i].price_money+'</span></td><td>';
                    frames += '<span class="label label-info"><a href="#">下架</a></span><span class="label label-info">';
                    frames += '<a href="/shopping/frame/detail?frame&"'+data.goods_id+'>编辑</a></span></td></tr>';
                }
                $('#goods tbody:eq(0)').html(frames);
            },
            error:function(jqXHR,textStatus,errorThrown){
                if(jqXHR.status == 400){

                }
            }
        })
    })


})(jQuery)