(function ($) {

    //分类
    function classAjax() {
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/quanzi/class?'+token,
            dataType:'json',
            success:function(data){
                console.log(data);
                var manages = '';
                for (var i = 0; i < data.list.length; i++) {
                    if(data.list[i].state == true ){
                        manages += '<tr><td>'+data.list[i].order+'</td><td>'+data.list[i].class_name+'</td></tr>';
                    }
                }
                $('#manage tbody:eq(0)').html(manages);
                // if(pageState == 1){
                //     $('#manage .pagination .pager').remove();
                //     $('#manage .pagination').pagination({
                //         count: data.list.length, //总数
                //         size:10, //每页数量
                //         index: 1,//当前页
                //         lrCount: 3,//当前页左右最多显示的数量
                //         lCount: 1,//最开始预留的数量
                //         rCount: 1,//最后预留的数量
                //         callback: function (options) {
                //             var index = options.index -1;
                //             classAjax(0,{'page_total':true,'page':index})
                //             //options.count = 300;
                //             //return options;
                //         },
                //     });
                // }
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
    classAjax();




    function indexAjax(tabID,datas,pageState){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/quanzi/entity?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(data)
                var rounds = '' ;
                for (var i = 0; i < data.list.length; i++) {
                    rounds += '<tr><td>'+data.list[i].quanzi_name+'</td><td>'+data.list[i].owner+'</td><td>'+data.list[i].contact_phone+'</td>'
                    rounds += '<td><span class="label label-info"><a href="/round/detail?'+data.list[i].state+'&'+data.list[i].quanzi_id+'">查看详情</a></span>';
                    if(datas.state == 'apply'){
                        rounds += '<span class="label label-info"><a data-id="'+data.list[i].quanzi_id+'" class="accept" href="#">通过</a></span><span class="label label-info">';
                        rounds += '<a class="reject" data-id="'+data.list[i].quanzi_id+'" href="#" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>';
                    }
                }
                $('#'+tabID+' tbody:eq(0)').html(rounds);
                if(pageState == 1){
                    $('#'+tabID+' .pagination .pager').remove();
                    $('#'+tabID+' .pagination').pagination({
                        count: data.list.length, //总数
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
    //搜索
    $('#waitSearch').on('click',function(){
        var serchText = $('#waitText').val();
        indexAjax('wait',{'state':'apply','keyword':serchText},1);
    })
    $('#outSearch').on('click',function(){
        var serchText = $('#outText').val();
        indexAjax('out',{'state':'accepted','keyword':serchText},1);
    })
    //拒绝/通过
    $('#wait tbody:eq(0)').on('click','.reject',function(){
        var dataId = $(this).attr('data-id');
        $('#reason').on('click',function(){
            var reasonText = $('#myModal textarea').val();
            stateAjax('reject',dataId,reasonText)
        })
    })
    $('#wait tbody:eq(0)').on('click','.accept',function(){
        var dataId = $(this).attr('data-id');
        stateAjax('accept',dataId);
    })
    function stateAjax(state,dataId,reject_reason){
        var url = "http://" + backend_host + '/web/staff/quanzi/entity/' + dataId +'?'+token+'&state='+state;
        if(reject_reason){
            url += '&reject_reason='+reject_reason;
        }
        $.ajax({
            type:'PUT',
            url:url,
            dataType:'json',
            success:function(data){
                console.log(data);
                $('#myModal textarea').val('')
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }

})(jQuery)