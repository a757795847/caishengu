(function($){

    $('#tributeClass').on('click','li',function(){
        $('#tributeClass li').removeClass('active');
        $(this).addClass('active');
        var hrefUrl = $(this).find('a').attr('data-id');
        $('#tributeAddDetail').attr('href','/tribute/frame/detail?add&' + hrefUrl );
        tributeList('http://' + backend_host + '/web/staff/goods/virtual?'+ token +'&class_id='+hrefUrl);
        $('#searchGoods').attr('data-id',hrefUrl);
    })
    //分类
    $.ajax({
        type:'GET',
        url:'http://' + backend_host + '/web/staff/goods/virtual/class?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var classNameLi = '',active = '';
            for(var i = 0; i<data.length; i++){
                if(i == 0){
                    active = 'class="active"';
                }else{
                    active = '';
                }
                classNameLi += '<li  '+ active +' ><a href="#" data-id="'+data[i].id+'">'+data[i].name+'</a></li>';
            }
            $('#tributeClass').html(classNameLi);
            tributeList('http://' + backend_host + '/web/staff/goods/virtual?'+ token +'&class_id='+data[0].id);
            $('#tributeAddDetail').attr('href','/tribute/frame/detail?add&' + data[0].id);
            $('#searchGoods').attr('data-id',data[0].id)
        },
        error:function(jqXHR,textStatus,errorThrown){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })
    function tributeList(hrefUrl){
        $.ajax({
            type:'GET',
            url:hrefUrl,
            dataType:'json',
            success:function(data){
                console.log(data);
                var classNameTr = '', valid = '';
                for(var i = 0; i<data.length; i++){
                    valid = data[i].valid?'上架':'下架';
                    classNameTr += '<tr><td><img src="http://' + backend_host +data[i].goods_image+'?'+token+'" /><span>'+data[i].goods_name+'</span><span>'+data[i].price_point+'财神币/';
                    classNameTr += data[i].price_coin+'积分</span></td><td><span class="label label-info"><a href="#">'+valid+'</a>';
                    classNameTr += '</span><span class="label label-info"><a href="/tribute/frame/detail?edit&'+data[i].goods_id+'">编辑</a></span></td></tr>';
                }
                //$('#tributeContent').html(classNameTr);
            },
            error:function(jqXHR,textStatus,errorThrown){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }
    //搜索
    $('#searchGoods').on('click',function(){
        var classId = $(this).attr('data-id');
        var textGoods = $('#textGoods').val();
        console.log(classId);
        console.log(textGoods);
        tributeList('http://' + backend_host + '/web/staff/goods/virtual?'+ token +'&class_id='+classId+'&keyword='+textGoods);
    })
    
    
})(jQuery)