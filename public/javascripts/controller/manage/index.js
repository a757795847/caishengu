(function ($) {

    function indexAjax(tabID,state){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/finance/manage/shop/collection?access_token=10ae0842b11080b0b6c9412773164797',
            data : {
                'state': state
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                var manages = '';
                for (var i = 0; i < data.length; i++) {
                    manages += '<tr><td>'+data[i].shop_id+'</td><td>'+data[i].shop_name+'</td><td>'+data[i].contact_person+'</td>';
                    manages += '<td><span class="label label-info"><a href="">查看</a></span></td></tr>'
                }
                $('#allManages').html(manages);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }
    indexAjax($('#allManages'));
    indexAjax($('#waitOutManages'),'apply');
    indexAjax($('#manages'),'underway');

})(jQuery)