(function ($) {

    function indexList(Id,state,huikui) {
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/donate?'+token+'&state='+state,
            dataType:'json',
            success:function(data){
                console.log(data);
                var wait = '';
                for (var i = 0; i < data.length; i++) {
                    wait += '<tr><td>'+data[i].title+'</td><td>'+data[i].money_current+'/'+data[i].money_total+'</td>';
                    wait += '<td><span class="label label-info"><a href="/love/detail?look&'+data[i].id+'">详情</a></span>';
                    if(huikui){
                        wait +='<span class="label label-info"><a href="/love/feedback?feedback&'+data[i].id+'">回馈</a></span>'
                    }
                    wait += '</td></tr>';
                }
                $(Id).html(wait);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }
    indexList('#wait tbody','raising');
    indexList('#end tbody','raise_success');
    indexList('#out tbody','finished');

})(jQuery)