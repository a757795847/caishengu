(function ($) {
    function indexAjax(tabID,datas,pageState){

        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/project?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(tabID,data);
                var wait = '';
                url = datas.state == 'apply'?'apply':'underway';
                for (var i = 0; i < data.list.length; i++) {
                    wait += '<tr><td>'+data.list[i].project_name+'</td><td>'+data.list[i].contact_person+'</td><td>'+data.list[i].contact_phone+'</td>';
                    wait += '<td><span class="label label-info"><a href="/item/detail?'+url+'&'+data.list[i].activity_id+'">查看详情</a></span>';
                    if(datas.state == 'apply'){
                        wait += '<span class="label label-info"><a data-id="'+data.list[i].project_id+'" class="accept" href="#">通过</a></span><span class="label label-info">';
                        wait += '<a class="reject" data-id="'+data.list[i].project_id+'" href="#" data-toggle="modal" data-target="#myModalWait">拒绝</a></span></td>';
                    }
                    if(datas.state == 'accepted'){
                        wait +='<td>'+data.list[i].operator+'</td><td>'+data.list[i].operate_time+'</td>';
                    }
                    wait += '</tr>';
                }
                $('#'+ tabID +' tbody:eq(0)').html(wait);
                if(pageState == 1){
                    $('#'+tabID+' .pagination .pager').remove();
                    $('#'+tabID+' .pagination').pagination({
                        count: data.item_total, //总数
                        size:10, //每页数量
                        index: 1,//当前页
                        lrCount: 3,//当前页左右最多显示的数量
                        lCount: 1,//最开始预留的数量
                        rCount: 1,//最后预留的数量
                        callback: function (options) {
                            var index = options.index -1;
                            indexAjax(tabID, {'status':datas.status,'page_total':true,'page':index})
                            //options.count = 300;
                            //return options;
                        },
                    });
                }
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

    indexAjax('wait',{'state': 'apply','page_total':true},1);
    indexAjax('out',{'state': 'accepted','page_total':true},1);

    $('#waitSearch').on('click',function(){
        var waitText = $('#waitText').val();
        indexAjax('wait',{'state': 'apply','keyword':waitText},1)
    })

    $('#outSearch').on('click',function(){
        var outText = $('#outText').val();
        indexAjax('out',{'state': 'accepted','keyword':outText},1)
    })

    $('#wait tbody:eq(0)').on('click','.accept',function(){
        var dataId = $(this).attr('data-id');
        stateAjax(dataId,'accept');
    })
    $('#wait tbody:eq(0)').on('click','.reject',function(){
        var dataId = $(this).attr('data-id');
        $('#refuse').on('click',function(){
            var reason = $('#myModalWait textarea').val();
            stateAjax(dataId,'reject',reason);
        })
    })
    function stateAjax(dataId,state,reject_reason){
        var dataUrl = 'http://' + backend_host + '/web/staff/project/'+dataId+'?'+token+'&state='+state;
        if(reject_reason){
            dataUrl += '&reject_reason='+reject_reason;
        }
        console.log(dataUrl);
        $.ajax({
            type:'PUT',
            url:dataUrl,
            dataType:'json',
            success:function(data){
                console.log(data);
                $('#myModalWait textarea').val('');
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

})(jQuery)