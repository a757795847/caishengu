(function ($) {

    function indexList(Id,state,huikui) {
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/donate?'+token+'&state='+state,
            dataType:'json',
            success:function(data){
                console.log(data);
                var wait = '',url='';
                for (var i = 0; i < data.list.length; i++) {
                    url = '/love/detail?look&'+data.list[i].id;
                    if(huikui == 1){
                        url = '/love/detail?feedback&'+data.list[i].id;
                    }
                    wait += '<tr><td>'+data.list[i].title+'</td><td>'+data.list[i].money_current+'/'+data.list[i].money_total+'</td>';
                    wait += '<td><span class="label label-info"><a href="'+url+'">详情</a></span>';
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
    indexList('#out tbody','finished',1);

})(jQuery)