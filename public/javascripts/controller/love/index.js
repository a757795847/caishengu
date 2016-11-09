(function ($) {
    function listAjax(contentId,state){
        $.ajax({
            type:'GET',
            url:'http://'+backend_host+'/web/staff/donate?state='+ state+'&'+token,
            dataType:'json',
            success:function(data){
                console.log(data);
                var list = '',url = '';
                for (var i = 0; i < data.length; i++) {
                    if(state == 'finished'){
                        url = '/love/detail?feedback&'+data[i].id;
                    }else{
                        url = '/love/detail?look&'+data[i].id;
                    }
                    list += '<tr><td>'+data[i].title+'</td><td>'+data[i].money_current+'/'+data[i].money_total+'</td>';
                    list += '<td><span class="label label-info"><a href="'+url+'">详情</a></span>';
                    list += '</td></tr>'
                }
                contentId.html(list);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }
    listAjax($('#wait tbody:eq(0)'),'raising');
    listAjax($('#end tbody:eq(0)'),'raise_success');
    listAjax($('#out tbody:eq(0)'),'finished');

})(jQuery)