(function($){
    function indexList(textOrder) {
        if(arguments.length == 1){
            var data = {
                    'state':'all',
                    'keyword' : textOrder
                }
        }else{
            var data = {
                'state':'all',
            }
        }

        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/order/virtual/collection?'+token+'&state=all',
            data:data,
            dataType:'json',
            success:function(data){
                console.log(data);
                var orders = '';
                for (var i = 0; i < data.length; i++) {
                    orders += '<tr><td>'+data[i].order_id+'</td><td>'+data[i].order_description+'</td><td>'+data[i].user_name+'</td><td>'+data[i].phone+'</td><td>';
                    orders += '<span class="label label-info"><a href="/tribute/order/detail?'+data[i].order_id+'">查看详情</a></span></td></tr>'
                }
                //$('#order').html(orders);
            },
            error:function(jqXHR){
                console.log(jqXHR);
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }
    indexList()

    //搜索
    $('#searchOrder').on('click',function(){
        var textOrder = $('#textOrder').val();
        indexList(textOrder)
    })
    $('#timeInterval').daterangepicker();
})(jQuery)