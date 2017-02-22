(function ($) {

    function indexAjax(tabID,datas,pageState) {
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/investor?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(tabID , data)
                var investors = '';
                for (var i = 0; i < data.list.length; i++) {
                    investors += '<tr><td>'+data.list[i].investor_name+'</td><td>'+data.list[i].company+'</td><td>'+data.list[i].position+'</td><td>'+data.list[i].phone+'</td>';
                    investors += '<td><span class="label label-info"><a href="/investors/detail?'+data.list[i].user_id+'">查看</a></span><span class="label label-info"><a class="through" data-id="'+data.list[i].user_id+'" href="#">通过</a></span>';
                    investors += '<span class="label label-info"><a href="#" data-id="'+data.list[i].user_id+'" class="refused" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>'
                }
                $('#'+tabID+' tbody:eq(0)').html(investors);
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
                            indexAjax(tabID, {'status':datas.state,'page_total':true,'page':index})

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
    indexAjax('all',{'page_total':true},1);
    indexAjax('top',{'state':'top','page_total':true},1);

    function search(id,state) {
        $('#'+id+' .searchBtn').on('click',function () {
            var val = $(this).parent().prev().val();
            indexAjax(id,{'state':state,'keyword':val},1)
        })
    }
    search('wait','apply')
    search('all')
    search('top','top')

    function operationAJax(id,operation,refuse_reason) {
        var url = "http://" + backend_host + '/web/staff/investor/'+id+'?'+token+'&operation='+operation;
        if(refuse_reason){
            url += '&refuse_reason='+refuse_reason;
        }
        $.ajax({
            type:'PUT',
            url:url,
            dataType:'json',
            success:function(data){
                console.log( data)
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

    $('#wait').on('click','.through',function () {
        var id = $(this).data('id');
        operationAJax(id,'accept');
    });

    $('#wait').on('click','.refused',function () {
        var id = $(this).data('id');
        $('#refusedBtn').attr('data-id',id);
    });
    
    $('#refusedBtn').on('click',function () {
        var id = $(this).data('id');
        var val = $('#reason').val();
        operationAJax(id,'reject',val);
    })

})(jQuery)