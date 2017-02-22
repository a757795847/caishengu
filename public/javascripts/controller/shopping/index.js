(function ($) {
    function indexAjax(tabID,datas,pageState) {
        $.ajax({
            type: 'GET',
            url: "http://" + backend_host + '/web/staff/order/goods/market/collection?'+token,
            data: datas,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var shopping = '', urlA = '',goods_status = '';
                for (var i = 0; i < data.list.length; i++) {
                    // goods_status = data.list[i].order_status == '已支付'? '待发货':data.list[i].order_status;
                    urlA = '/shopping/detail?' + data.list[i].order_id + '&' + data.list[i].order_status;

                    shopping += '<tr class="'+ data.list[i].order_id +'"><th>' + data.list[i].order_id + '</th><th>' + data.list[i].content + '</th><th>' + data.list[i].order_time + '</th><th>' + data.list[i].purchaser + '</th>';
                    shopping += '<th>' + data.list[i].phone_number + '</th><th><span class="label label-info"><a href="'+urlA+'">查看详情</a></span></th>';
                    //或者全部
                    if (tabID == 'wait' ||  tabID == 'all') {
                        shopping += '<th><span class="orderStatus">' + data.list[i].order_status + '</span></th>';
                        if(data.list[i].order_status == '已支付'){
                            shopping += '<th><span data-id="'+ data.list[i].order_id +'" class="label closeReason label-info"><a href="#" data-toggle="modal" data-target="#myModal">关闭</a></span></th>'
                        }
                    }
                    if (tabID == 'closes') {
                        shopping += '<th>'+ data.list[i].closed_people_name + '</th><th>'+ data.list[i].closed_time + '</th>';
                    }
                    shopping += '</tr>';
                }
                $('#'+tabID+' tbody:eq(0)').html(shopping);
                $('#'+tabID).attr('data-pagetotal',data.page_total)

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
                            if(datas.keyword){
                                indexAjax(tabID, {'status':datas.status,'page_total':true,'page':index,'keyword':datas.keyword})
                            }else{
                                indexAjax(tabID, {'status':datas.status,'page_total':true,'page':index})
                            }
                            //options.count = 300;
                            //return options;
                        },
                    });
                }


            },
            error: function (jqXHR) {
                if (jqXHR.status == 400) {

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }



    indexAjax('all', {'page_total':true,'page':0,'status':''},1);
    indexAjax('wait', {'status':'paied','page_total':true,'page':0},1);
    indexAjax('out', {'status':'delivering','page_total':true,'page':0},1);
    indexAjax('receive', {'status':'delivered','page_total':true,'page':0},1);
    indexAjax('closes', {'status':'close','page_total':true,'page':0},1);


    //关闭接口暂时没写
    $('#content').on('click','.closeReason',function(e){
        var dataId = $(this).attr('data-id');
        $('#closeNews').attr('data-id',dataId);
    });

    $('#closeNews').on('click', function () {
        var reason = $('#myModal textarea').val();
        var dataId = $(this).attr('data-id');
        $.ajax({
            type: 'PUT',
            url: "http://" + backend_host + '/web/staff/order/goods/market/entity?order_id='+dataId+'&close_reason='+reason+'&'+token,
            dataType: 'json',
            success:function(data){

            },
            error:function(jqXHR){
                if (jqXHR.status == 400) {

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        });
        $('.'+dataId).find('.orderStatus').text('已关闭')
        $('.'+dataId).find('.closeReason').hide()
    })
    //修改时间格式
    function ajaxTimeFormat(time) {
        return time.replace(/\/+/g,'-')
    }
    $('#timeInterval').daterangepicker({
        opens:'right',
        drops:'up'
    });
    $('#timeInterval').on('apply.daterangepicker',function (e) {
        var time = $('#timeInterval').val().toString().split(' - ');
        indexAjax('all', {
            'status':'',
            'start_date':ajaxTimeFormat(time[0]),
            'end_date':ajaxTimeFormat(time[1]),
            'page_total':true
        },1);

    });

    $('#timeInterval').on('cancel.daterangepicker',function (e) {
        console.log(e)
    });

    $('#timeMain').daterangepicker({
        opens:'right',
        drops:'up'
    });
    $('#timeMain').on('apply.daterangepicker',function (e) {
        var time = $('#timeMain').val().toString().split(' - ');
        indexAjax('receive', {
            'status':'delivered',
            'start_date':ajaxTimeFormat(time[0]),
            'end_date':ajaxTimeFormat(time[1]),
            'page_total':true
        },1);
    });
    
    function search(id,status) {
        $('#'+id).find('.search').on('click',function () {
            if($('#'+id).find('input').val() != ''){
                indexAjax(id, {
                    'status':status,
                    'keyword':$('#'+id).find('input').val(),
                    'page_total':true
                },1);
            }
        })
    }
    search('all')
    search('wait','paied')
    search('out','out')
    search('receive','receive')
    search('closes','close')


})(jQuery)