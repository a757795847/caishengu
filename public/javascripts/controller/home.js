var data=[
    {"shop_id":"110000",
     "shop_name":"杭州绿城",
    "contact_person":"宋卫平"
    },
    {"shop_id":"120000",
        "shop_name":"上海申花",
        "contact_person":"马俊"}
    {
        "shop_id":"130000",
        "shop_name":"北京国安",
        "contact_person":"央企"
    }
    {
        "shop_id":"140000",
        "shop_name":"广州恒大",
        "contact_person":"许家印"
    }
    {
        "shop_id":"150000",
        "shop_name":"江苏苏宁",
        "contact_person":"张近东"
    }
    {
        "shop_id":"120000",
        "shop_name":"山东鲁能",
        "contact_person":"国企"
    }


];

$(document).ready(function () {


                var tbody = "";
            $.each(data, function (i, order) {
                tbody = '<tr><td>100001</td><td>水果店</td><td>张三</td><td><span class="label label-info"><a href="#">查看</a></span></td></tr>'


            }
                $('#Table').find('tbody').append(tbody);



            $('.pagination').append('<li id="Left"><a href="#">&laquo;</a></li>');
            $('.pagination').append(' <li class="active"><a href="#Table">1<span class="sr-only">(current)</span></a></li>');
            $('.pagination').append('<li><a href="#">2</a></li>');
            $('.pagination').append('<li><a href="#">3</a></li>');
            $('.pagination').append('<li><a href="#">4</a></li>');
            $('.pagination').append('<li id="Right"><a href="#">&raquo;</a></li>');


});
