(function ($) {
    function indexAjax(tabID, state) {
        $.ajax({
            type: 'GET',
            url: "http://" + backend_host + '/web/staff/order/market?'+token,
            data: {
                'state': state
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var shopping = '', urlA = '';
                for (var i = 0; i < data.length; i++) {
                    if (state == 'paid') {
                        urlA = '/shopping/detail?' + data[i].order_id + '&wait';
                    } else if (state == 'deliver') {
                        urlA = '/shopping/detail?' + data[i].order_id + '&out';
                    } else if (state == 'delivered') {
                        urlA = '/shopping/detail?' + data[i].order_id + '&receive';
                    } else {
                        urlA = '/shopping/detail?' + data[i].order_id + '&close';
                    }
                    shopping += '<tr><td>' + data[i].order_id + '</td><td>' + data[i].order_description + '</td><td>' + data[i].user_name + '</td>';
                    shopping += '<td>' + data[i].phone + '</td>';
                    shopping += '<td><span class="label label-info"><a href="' + urlA + '">查看</a></span>';
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

    indexAjax($('#wait tbody:eq(0)'), 'paid');
    indexAjax($('#out tbody:eq(0)'), 'deliver');
    indexAjax($('#receive tbody:eq(0)'), 'delivered');
    indexAjax($('#close tbody:eq(0)'), 'closed');

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

    $('#reservation').datepicker({
        autoclose: true
    });
})(jQuery)