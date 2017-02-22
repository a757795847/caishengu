(function ($) {
    
    function indexAjax(tabID,datas,pageState){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/activity?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(datas.state,data);
                var wait = '';
                for (var i = 0; i < data.list.length; i++) {
                    wait += '<tr><td>'+data.list[i].activity_name+'</td><td>'+data.list[i].contact_person+'</td><td>'+data.list[i].contact_phone+'</td><td><span class="label label-info">';
                    if(datas.state == 'apply'){
                        wait += '<a href="/event/detail?'+ data.list[i].apply_state+'&'+data.list[i].activity_id+'">查看详情</a></span>';
                        wait += '<span class="label label-info"><a data-id="'+data.list[i].activity_id+'" class="accept" href="#">通过</a></span><span class="label label-info">';
                        wait += '<a data-id="'+data.list[i].activity_id+'" class="reject" href="#" data-toggle="modal" data-target="#myModalWait">拒绝</a></span></td></tr>';
                    }else{
                        wait += '<a href="/event/detail?'+ data.list[i].apply_state+'&'+data.list[i].activity_id+'">查看详情</a></span>';
                        wait += '</td><td>张三</td><td>2014-04-04 12:32:32</td></tr>'
                    }
                }
                $('#'+tabID+' tbody:eq(0)').html(wait);
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
    indexAjax('wait',{'state':'apply','page_total':true},1);
    indexAjax('out',{'state':'accepted','page_total':true},1);
    $('#waitSearch').on('click',function(){
        var searchText = $('#waitText').val();
        console.log(searchText);
        indexAjax('wait',{'state':'apply','keyword':searchText})
    });
    $('#outSeatch').on('click',function(){
        var searchText = $('#outText').val();
        console.log(searchText);
        indexAjax('out',{'state':'accepted','keyword':searchText});
    });

    $('#wait tbody:eq(0)').on('click','.accept',function(){
        var dataId = $(this).attr('data-id');
        stateAjax(dataId,'accept')
    });
    
    $('#wait tbody:eq(0)').on('click','.reject',function(){
        var dataId = $(this).attr('data-id');
        $('#refuse').on('click',function(){
            var reason = $('#myModalWait textarea').val();
            stateAjax(dataId,'reject',reason);
        })
    });
    function stateAjax(dataId,state,reject_reason){
        var dataUrl = 'http://' + backend_host + '/web/staff/activity/'+dataId+'?'+token+'&state='+state;
        if(arguments.length == 3){
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