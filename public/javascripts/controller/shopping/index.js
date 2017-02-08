(function ($) {
    function indexAjax(tabID,data,urlState) {
        $.ajax({
            type: 'GET',
            url: "http://" + backend_host + '/web/staff/order/goods/market/collection?'+token,
            data: data,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var shopping = '', urlA = '';
                for (var i = 0; i < data.length; i++) {
                    // if (state == 'paid') {
                    //     urlA = '/shopping/detail?' + data[i].order_id + '&wait';
                    // } else if (state == 'deliver') {
                    //     urlA = '/shopping/detail?' + data[i].order_id + '&out';
                    // } else if (state == 'delivered') {
                    //     urlA = '/shopping/detail?' + data[i].order_id + '&receive';
                    // } else {
                    //     urlA = '/shopping/detail?' + data[i].order_id + '&close';
                    // }
                    urlA = '/shopping/detail?' + data[i].order_id + '&' + urlState;
                    shopping += '<tr><td>' + data[i].order_id + '</td><td>' + data[i].order_description + '</td><td>2016.09.03-12:09:21</td>';
                    shopping += '<td>' + data[i].user_name + '</td><td>' + data[i].phone + '</td>';
                    shopping += '<td><span class="label label-info"><a href="' + urlA + '">查看详情</a></span>';
                    if (state == 'paid') {
                        shopping += '<span class="label label-info"><a data-id="'+data[i].order_id+'" class="close" href="#" data-toggle="modal" data-target="#myModal">关闭</a></span>';
                    }
                    shopping += '</td></tr>';
                    if (state == 'closed') {
                        shopping += '<td>'+ data[i].close_operator_name + '</td><td>'+ data[i].close_datetime + '</td>';
                    }
                }
                tabID.html(shopping);
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

    indexAjax($('#all tbody:eq(0)'), {'status':'paid'},'wait');
    indexAjax($('#wait tbody:eq(0)'), {'status':'paid'},'wait');
    indexAjax($('#out tbody:eq(0)'), {'status':'deliver'},'out');
    indexAjax($('#receive tbody:eq(0)'), {'status':'delivered'},'receive');
    indexAjax($('#close tbody:eq(0)'), {'status':'closed'},'close');


    //关闭接口暂时没写
    $('.close').on('click',function(){
        var dataId = $(this).attr('data-id');
        $('#closeNews').attr('data-id',dataId);
    })
    $('#closeNews').on('click', function () {
        var reason = $('#myModal textarea').val();
        var dataId = $(this).attr('data-id');
        $.ajax({
            type: 'PUT',
            url: "http://" + backend_host + '/web/staff/order/market?'+dataId+'&'+token,
            data: {
                'operation_type':'close',
                'close_reason': reason,
                'deliver_company':'',
                'deliver_order_no': ''
            },
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
        })

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
        indexAjax($('#all tbody:eq(0)'), {
            'status':'delivered',
            'start_date':ajaxTimeFormat(time[0]),
            'end_date':ajaxTimeFormat(time[1])
        },'receive');
        console.log({
            'status':'delivered',
            'start_date':ajaxTimeFormat(time[0]),
            'end_date':ajaxTimeFormat(time[1])
        })
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
        indexAjax($('#all tbody:eq(0)'), {
            'status':'delivered',
            'start_date':ajaxTimeFormat(time[0]),
            'end_date':ajaxTimeFormat(time[1])
        },'receive');
    });
    
    function search(id,status) {
        $('#'+id).find('.search').on('click',function () {
            indexAjax($('#all tbody:eq(0)'), {
                'status':status,
                'keyword':$('#'+id).find('input').val()
            },'wait');
        })
    }
    search('all','paid')
    search('deliver','out')
    search('delivered','receive')
    search('closed','close')
    
})(jQuery)