var data=[
    {"shop_id":"110000",
     "shop_name":"杭州绿城",
    "contact_person":"宋卫平"
    },
    {"shop_id":"120000",
        "shop_name":"上海申花",
        "contact_person":"马俊"},
    {
        "shop_id":"130000",
        "shop_name":"北京国安",
        "contact_person":"央企"
    },
    {
        "shop_id":"140000",
        "shop_name":"广州恒大",
        "contact_person":"许家印"
    },
    {
        "shop_id":"150000",
        "shop_name":"江苏苏宁",
        "contact_person":"张近东"
    },
    {
        "shop_id":"120000",
        "shop_name":"山东鲁能",
        "contact_person":"国企"
    }


];

$(document).ready(function () {
    $.get("http://" + backend_host + '/web/staff/finance/manage/shop/collection?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":0 ,
            "limit": 5,
        }, function (data) {
            console.log(data);

        }
             /*   var tbody = "";
            $.each(data, function (i, order) {
                tbody = '<tr><td>'+order.shop_id+'</td><td>'+order.shop_name+'</td><td><span class="label label-success">'+order.contact_person+'</span></td><td><span class="label label-info"><a href="#">查看</a></span></td></tr>'

                $('#Table').find('tbody').append(tbody);
            });*/


    )


    var tab = '<li id="Left"><a href="javascript:;">&laquo;</a></li>';
    for(var i=0;i<5;i++){
        tab +='<li><a href="javascript:;">'+[i+1]+'</a></li>'
    }
    tab += '<li id="Right"><a href="javascript:;">&raquo;</a></li>';
    $('.pagination').append(tab);


});

$('.pagination:eq(0)').on('click','li',function() {
    var index = $(this).index() - 1;
    if(index==0){
        $("#Left").addClass("disabled");
    }else{
        $("#Left").removeClass('disabled');

    }
    var index_right=$(this).index()+1;
    if(index_right==5){
        $("#Right").addClass("disabled");

    }else{
        $("#Right").removeClass('disabled');
    }
    $(this).addClass('active').siblings().removeClass('active');




    $.get("http://" + backend_host + '/web/staff/finance/manage/shop/collection?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":index,
            "limit":5
        },
        function (data) {
            console.log(data);
            var body = "";
            $.each(data, function (i, order) {
                tbody = '<tr><td>'+order.shop_id+'</td><td>'+order.shop_name+'</td><td><span class="label label-success">'+order.contact_person+'</span></td><td><span class="label label-info"><a href="#">查看</a></span></td></tr>'
            });
            $('#Table').html(body);
        }
    )


});

