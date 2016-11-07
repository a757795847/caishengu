(function ($) {
    function indexAjax(tabID,state,keyword){
        var datas = {};
        if(arguments.length == 3){
            datas = {
                'state': state,
                'keyword':keyword
            }
        }else{
            datas = {
                'state': state
            }
        }
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/activity?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(data);
                var wait = '', out = '';
                for (var i = 0; i < data.length; i++) {
                    wait += '<tr><td>'+data[i].project_name+'</td><td>'+data[i].contact_person+'</td><td>'+data[i].contact_phone+'</td>';
                    wait += '<td><span class="label label-info"><a href="/item/wait?'+data[i].project_id+'">查看详情</a></span>';
                    wait += '<span class="label label-info"><a href="#">通过</a></span><span class="label label-info">';
                    wait += '<a href="#" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>';
                    if(data[i].state == '是'){
                        wait +='<td>张三</td><td>2014-04-04 12:32:32</td>'
                    }
                }
                tabID.html(wait);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }

    indexAjax($('#wait tbody:eq(0)'),'apply');
    indexAjax($('#out tbody:eq(0)'),'accepted');

    $('#waitSearch').on('click',function(){
        var waitText = $('#waitText').val();
        indexAjax($('#wait tbody:eq(0)'),'apply',waitText)
    })

    $('#outSearch').on('click',function(){
        var outText = $('#outText').val();
        indexAjax($('#out tbody:eq(0)'),'apply',outText)
    })

})(jQuery)