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
                var wait = '', url = '';
                url = state == 'apply'?'apply':'underway';
                for (var i = 0; i < data.length; i++) {
                    wait += '<tr><td>'+data[i].activity_name+'</td><td>'+data[i].contact_person+'</td><td>'+data[i].contact_phone+'</td>';
                    wait += '<td><span class="label label-info"><a href="/item/detail?'+url+'&'+data[i].activity_id+'">查看详情</a></span>';
                    wait += '<span class="label label-info"><a data-id="'+data[i].activity_id+'" class="accept" href="#">通过</a></span><span class="label label-info">';
                    wait += '<a class="reject" data-id="'+data[i].activity_id+'" href="#" data-toggle="modal" data-target="#myModalWait">拒绝</a></span></td>';
                    if(state == 'accepted'){
                        wait +='<td>张三</td><td>2014-04-04 12:32:32</td>';
                    }
                    wait += '</tr>';
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
        indexAjax($('#out tbody:eq(0)'),'accepted',outText)
    })

    $('#wait tbody:eq(0)').on('click','.accept',function(){
        var dataId = $(this).attr('data-id');
        stateAjax(dataId,'accept')
    })
    $('#wait tbody:eq(0)').on('click','.reject',function(){
        var dataId = $(this).attr('data-id');
        $('#refuse').on('click',function(){
            var reason = $('#myModalWait textarea').val();
            stateAjax(dataId,'reject',reason);
        })
    })
    function stateAjax(dataId,state,reject_reason){
        var datas = {};
        if(arguments.length == 2){
            datas = {
                'state':state
            }
        }else{
            datas = {
                'state':state,
                'reject_reason':reject_reason
            }
        }
        console.log(dataId)
        console.log(state)
        console.log(reject_reason)
        // $.ajax({
        //     type:'PUT',
        //     url:"http://" + backend_host + 'PUT /web/staff/activity/'+dataId+'?'+token,
        //     data:datas,
        //     dataType:'json',
        //     success:function(data){
        //         console.log(data);
        //         $('#myModalWait textarea').val('');
        //     },
        //     error:function(jqXHR){
        //         if(jqXHR.status == 400){
        //
        //         }
        //     }
        // })
    }

})(jQuery)