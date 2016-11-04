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
                var wait = '';
                for (var i = 0; i < data.length; i++) {
                    wait += '<tr><td>'+data[i].activity_name+'</td><td>'+data[i].contact_person+'</td><td>'+data[i].contact_phone+'</td><td><span class="label label-info">';
                    if(data[i].apply_state == '否'){
                        wait += '<a href="/event/detail?'+ data[i].apply_state+'&'+data[i].activity_id+'">查看详情</a></span><span class="label label-info"><a href="#">通过</a></span>';
                        wait += '<span class="label label-info"><a href="#" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>';
                    }else{
                        wait += '<a href="/event/detail?'+ data[i].apply_state+'&'+data[i].activity_id+'">查看详情</a></span>';
                        wait += '</td><td>张三</td><td>2014-04-04 12:32:32</td></tr>'
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
        var searchText = $('#waitText').val();
        console.log(searchText);
        indexAjax($('#wait tbody:eq(0)'),'apply',searchText)
    })
    $('#outSeatch').on('click',function(){
        var searchText = $('#outText').val();
        console.log(searchText);
        indexAjax($('#out tbody:eq(0)'),'accepted',searchText);
    })

})(jQuery)