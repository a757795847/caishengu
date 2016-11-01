(function ($) {

    // [
    //     WebStaffOrderMarketGetResItem {
    //     order_id:
    //     string *
    //     订单id
    //     order_description:
    //     string *
    //     订单描述
    //     user_name:
    //     string *
    //     购买人
    //     phone:
    //     string *
    //     联系方式
    // }
    // ]


    // var waits = '';
    // for (var i = 0; i < data.length; i++) {
    //     waits += '<tr><td>'+data[i].order_id+'</td><td>'+data[i].order_description+'</td><td>'+data[i].user_name+'</td><td>'+data[i].phone+'</td><td><span class="label label-info">';
    //     waits += '<a href="/shopping/wait">详情</a></span><span class="label label-info"><a href="#" data-toggle="modal" data-target="#myModal">关闭</a></span></td></tr>';
    // }
    // $('#wait tbody:eq(0)').html(waits);


    function indexAjax(tabID, state) {
        $.ajax({
            type: 'GET',
            url: "http://" + backend_host + '/web/staff/order/market?access_token=10ae0842b11080b0b6c9412773164797',
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
                        shopping += '<span class="label label-info"><a href="#" data-toggle="modal" data-target="#myModal">关闭</a></span>';
                    }
                    shopping += '</td></tr>';
                    if (state == 'closed') {
                        shopping += '<td>张三</td><td>2015-3-3 12：34：35</td>';
                    }
                }
                tabID.html(shopping);
            },
            error: function (jqXHR) {
                if (jqXHR.status == 400) {

                }
            }
        })
    }

    indexAjax($('#wait tbody:eq(0)'), 'paid');
    indexAjax($('#out tbody:eq(0)'), 'deliver');
    indexAjax($('#receive tbody:eq(0)'), 'delivered');
    indexAjax($('#close tbody:eq(0)'), 'closed');

    //关闭接口暂时没写
    $('#closeNews').on('click', function () {
        var reason = $('#myModal textarea').val();
        $.ajax({
            type: 'GET',
            url: "http://" + backend_host + '/web/staff/order/market?access_token=10ae0842b11080b0b6c9412773164797',
            data: {
                'state': state
            },
            dataType: 'json',
        })

    })
})(jQuery)