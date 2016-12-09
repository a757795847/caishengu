(function ($) {

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/news/caishengu?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var news = '';
            for (var i = 0; i < data.length; i++) {
                news += '<tr class="'+ i +'"><td>'+data[i].order+'</td><td><img src="http://' + backend_host +'/other/file/'+data[i].image+'?'+token+'"></td><td><a href="#">'+data[i].link+'</a>';
                news += '</td><td><span class="label label-info"><a class="delete" data-id="'+data[i].news_id+'" href="#">删除</a></span></td></tr>'
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
    $('#news').on('click','.delete',function(){
        var dataId = $(this).attr('data-id');
        var deleteThis = $(this).parent().parent().parent();
        $.ajax({
            type:'DELETE',
            url:"http://" + backend_host + '/web/staff/news/caishengu/'+dataId+'?'+token,
            dataType:'json',
            success:function(data){
                console.log(data);
                deleteThis.fadeOut();
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