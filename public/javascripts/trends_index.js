(function ($) {

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/caishengu/trend/collection?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var news = '哈哈哈';
            $.each(data, function (i, order) {
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
    })
    $('#trends').on('click','.delete',function(){
        var trend_id = $(this).attr('data-id');
        var deleteThis = $(this).parent().parent().parent();
        console.log(trend_id);
        $.ajax({
            type:'DELETE',
            url:"http://" + backend_host + '/web/staff/caishengu/trend/entity?trend_id='+trend_id+'&access_token=10ae0842b11080b0b6c9412773164797',
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
