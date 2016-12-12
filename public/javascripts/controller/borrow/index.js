(function ($) {

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/news/financing?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var news = '';
            for (var i = 0; i < data.length; i++) {
                news += '<tr><td>'+data[i].order+'</td><td>'+data[i].name +'</td><td>'+data[i].stage+'</td>';
                news += '<td><span class="label label-info"><a href="/borrow/detail?change&'+data[i].news_id+'">编辑</a></span>'
                news += '<span class="label label-info"><a class="delete" data-id="'+data[i].news_id+'" href="#">删除</a></td></tr>';
            }
            $('#news').html(news);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){
                
            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })
    $('.delete').on('click',function(){
        var dataId = $(this).attr('data-id');
        $.ajax({
            type:'DELETE',
            url:"http://" + backend_host + '/web/staff/news/financing/'+dataId+'?'+token,
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
    })
    
})(jQuery)