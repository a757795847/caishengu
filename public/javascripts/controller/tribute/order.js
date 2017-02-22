(function($){
    function indexAjax(textOrder,pageState) {
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/order/goods/virtual/collection?'+token,
            data:textOrder,
            contentType:"application/json; charset=UTF-8",
            dataType:'json',
            success:function(data){
                console.log(data);
                var orders = '';
                for (var i = 0; i < data.list.length; i++) {
                    orders += '<tr><th>'+ data.list[i].order_id+ '</th><th>'+ data.list[i].content + '</th><th>'+ data.list[i].customer + '</th><th>'+ data.list[i].phone + '</th>';
                    orders += '<th>'+ data.list[i].coin+ '财神币/'+ data.list[i].point+ '积分</th><th>'+ data.list[i].time + '</th></tr>';
                }
                $('#order').html(orders);
                if(pageState == 1){
                    $('#page .pagination .pager').remove();
                    $('#page .pagination').pagination({
                        count: data.item_total, //总数
                        size:10, //每页数量
                        index: 1,//当前页
                        lrCount: 3,//当前页左右最多显示的数量
                        lCount: 1,//最开始预留的数量
                        rCount: 1,//最后预留的数量
                        callback: function (options) {
                            var index = options.index -1;

                            var data = {'page_total':true,'page':index};
                            if(textOrder.keyword){
                                data = {'page_total':true,'page':index,'keyword':textOrder.keyword};
                            }else if(textOrder.start_time && textOrder.end_time){
                                data = {'page_total':true,'page':index,'start_time':textOrder.start_time,'end_time':textOrder.end_time};
                            }
                            indexAjax(data);

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
    indexAjax({
        "page_total":true
    },1);



    //搜索
    $('#searchOrder').on('click',function(){
        var textOrder = $('#textOrder').val();
        indexAjax({
            'page_total':true,
            'keyword':textOrder
        },1)
    })
    $('#timeInterval').daterangepicker();
    function ajaxTimeFormat(time) {
        return time.replace(/\/+/g,'-')
    }
    $('#timeInterval').on('apply.daterangepicker',function (e) {
        var time = $('#timeInterval').val().toString().split(' - ');

        indexAjax({
            "page_total":true,
            'start_time':ajaxTimeFormat(time[0]),
            'end_time':ajaxTimeFormat(time[1])
        },1)
    });

    $('#timeInterval').on('cancel.daterangepicker',function (e) {
        console.log(e)
    });
})(jQuery)