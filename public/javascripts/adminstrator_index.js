
$(document).ready(function () {
    $.get("http://" + backend_host + '/web/admin/manage/staff?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":0 ,
            "limit": 5,
        },
        function (data) {
            var tbody = "";
            $.each(data, function (i, order) {
               tbody ='<tr> <td><a href="../pages/examples/invoice.html" id="user_id">'+order.id+'</a></td>';
                tbody +='<td><span class="label label-success" id="user_name">'+order.name+'</span></td>';
                tbody +='<td><span class="label label-info" ><a href="/administrator/details?'+order.id+'">编辑</a></span></td></tr>';


                $('#Table').find('tbody').append(tbody);

            });



            var tab = '<li id="Left"><a href="#">&laquo;</a></li>';
            for(var i=0;i<5;i++){
                tab +='<li><a href="#">'+[i+1]+'</a></li>'
            }
            tab += '<li id="Right"><a href="#">&raquo;</a></li>';
                $('.pagination').append(tab);


        })
});

$('.pagination:eq(0)').on('click','li',function() {
    var index = $(this).index() - 1;
    if (index == 0) {
        $("#Left").addClass("disabled");
    } else {
        $("#Left").removeClass('disabled');

    }
    var index_right = $(this).index() + 1;
    if (index_right == 6) {
        $("#Right").addClass("disabled");

    } else {
        $("#Right").removeClass('disabled');
    }
    $(this).addClass('active').siblings().removeClass('active');

    $.get("http://" + backend_host + '/web/admin/manage/staff?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":index,
            "limit":5
        },
        function (data) {
            console.log(data);
            var tbody = "";
            $.each(data, function (i,order) {
                tbody ='<tr> <td><a href="../pages/examples/invoice.html" id="user_id">'+order.id+'</a></td>';
                tbody +='<td><span class="label label-success" id="user_name">'+order.name+'</span></td>';
                tbody +='<td><span class="label label-info" ><a href="/administrator/details">编辑</a></span></td></tr>';




            });
            $('#Table').find('tbody').html(tbody);


        }
    )
});

$('[type="submit"]').click(function(){
    var keyword=$('[name="table_search"]').val();
    console.log(keyword);

    $.get("http://" + backend_host + '/web/admin/manage/shop?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "keyword":keyword
        },
        function (data) {
            var tbody = "";
            $.each(data, function (i,order) {
                tbody ='<tr> <td><a href="../pages/examples/invoice.html" id="user_id">'+order.id+'</a></td>';
                tbody +='<td><span class="label label-success" id="user_name">'+order.name+'</span></td>';
                tbody +='<td><span class="label label-info" ><a href="/administrator/details">编辑</a></span></td></tr>';




            });
            $('#Table').find('tbody').html(tbody);

        }

    )



});