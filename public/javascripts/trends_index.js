(function ($) {

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/caishengu/trend/collection?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var news = '哈哈哈';
            $.each(data.list, function (i, order) {
                news += '<tr class="'+ i +'"><td>'+order.order+'</td><td>'+order.title+'</td><td><a href="#">'+order.link+'</a>';
                news += '</td><td><span class="label label-info"><a class="delete" data-id="'+order.id+'" href="#">删除</a></span></td></tr>'
            });
            $('#trends').html(news);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    });

    $('#trends').on('click','.delete',function(){
        var trend_id = $(this).attr('data-id');
        var deleteThis = $(this).parent().parent().parent();

        $.ajax({
            type:'DELETE',
            url:"http://" + backend_host + '/web/staff/caishengu/trend/entity?'+token+'&trend_id='+trend_id,
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
