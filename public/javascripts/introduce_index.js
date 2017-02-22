(function ($) {

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/caishengu/introduction/collection?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var news = "";
           $.each(data.list, function (i, order) {
                news += '<tr class="'+ i +'"><td>'+order.order+'</td><td>'+order.title+'</td><td><img src="http://' + backend_host +'/other/file/'+order.image+'?'+token+'"></td><td><a href="#">'+order.link+'</a>';
                news += '<td><span class="label label-info"><a class="delete" data-id="'+order.id+'" href="#">删除</a></span></td></tr>'
            });
            $('#introduce').html(news);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })
    $('#introduce').on('click','.delete',function(){
        var introduction_id = $(this).attr('data-id');
        var deleteThis = $(this).parent().parent().parent();
        $.ajax({
            type:'DELETE',
            url:"http://" + backend_host + '/web/staff/caishengu/introduction/entity?'+token+'&introduction_id='+introduction_id,
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