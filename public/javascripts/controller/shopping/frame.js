(function($){
    //分类列表
    $.ajax({
        type:'GET',
        url:'http://' + backend_host + '/web/staff/goods/market/class?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var classNameLi = '', active = '';
            for(var i = 0; i<data.length; i++){
                if(i == 0){
                    active = 'class="active"';
                }else{
                    active = '';
                }
                classNameLi += '<li  '+ active +'><button type="button" class="close">×</button><a href="#" data-id="'+data[i].id+'">'+data[i].name+'</a></li>'
            }
            $('#className').append(classNameLi);
            frameList(data[0].id);
            ticketAjax();
            $('#searchGoods').attr('data-id',data[0].id);
            $('#addNew').attr('href','/shopping/frame/detail?' + data[0].id)
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
            url:'http://' + backend_host + '/web/staff/goods/market/class?'+token,
            data:{
                'class_name':addclass
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                $('#className').append('<li><button type="button" class="close">×</button><a href="#" data-id="'+data.id+'">'+addclass+'</a></li>');
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
        var dataId = $(this).next().attr('data-id');
        var thisBtn = $(this);
        if(confirm('是否删除'+text+'这个分类')){
            $.ajax({
                type:'PUT',
                url:'http://' + backend_host + '/web/staff/goods/market/class?class_id='+dataId+'&valid=false&'+token,
                dataType:'json',
                success:function(data){
                    console.log(data);
                    thisBtn.parent().remove();
                },
                error:function(jqXHR,textStatus,errorThrown){
                    if(jqXHR.status == 400){

                    }
                }
            })
        }
    })



    //门票列表
    function ticketAjax(searchText){
        var ajaxData = {};
        if(arguments.length == 1){
            ajaxData = {
                'keyword' : searchText
            }
        }
        $.ajax({
            type:'GET',
            url:'http://' + backend_host + '/web/staff/goods/ticket?'+token,
            data:ajaxData,
            dataType:'json',
            success:function(data){
                console.log(data);
                var tickets = '';
                for(var i = 0; i<data.length; i++){
                    tickets += '<tr><td><img src="'+data[i].goods_image+'" /><span>门票</span><span>'+data[i].price_point+'</span></td><td>';
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
    }
    $('#searchTicket').on('click',function(){
        var searchText = $('#ticketText').val();
        ticketAjax(searchText);
    })

    //选择分类
    $('#className').on('click','a',function(e){
        e.preventDefault();
        var addNew = $(this).attr('data-id');
        $('#searchGoods').attr('data-id',addNew);
        $('#addNew').attr('href','/shopping/frame/detail?' + addNew);
        frameList(addNew);
    })
    function frameList(addNew,searchText){
        var datas = {
            'class_id':addNew
        };
        if(arguments.length == 2){
            datas = {
                'keyword' : searchText,
                'class_id':addNew
            };
        }
        $.ajax({
            type:'GET',
            url:'http://' + backend_host + '/web/staff/goods/market?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(data);
                var frames = '', valid = '';
                for(var i = 0; i<data.length; i++){
                    valid = data[i].valid? '上架':'下架';
                    frames += '<tr><td><img src="http://' + backend_host+data[i].goods_image+'?'+token+'" />';
                    frames += '<span>'+data[i].goods_name +'</span><span>￥'+data[i].price_money+'</span></td><td>';
                    frames += '<span class="label label-info"><a href="#">'+ valid +'</a></span><span class="label label-info">';
                    frames += '<a href="/shopping/frame/detail?frame&'+data[i].goods_id+'">编辑</a></span></td></tr>';
                }
                $('#goods tbody:eq(0)').html(frames);
            },
            error:function(jqXHR,textStatus,errorThrown){
                if(jqXHR.status == 400){

                }
            }
        })
    }
    //商品搜索
    $('#searchGoods').on('click',function(){
        var searchText = $('#goodsText').val();
        var goodsClassId = $(this).attr('data-id');
        console.log(goodsClassId);
        frameList(goodsClassId,searchText);
    })

})(jQuery)