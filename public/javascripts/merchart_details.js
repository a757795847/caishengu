/*if( location.href != "http://localhost:9000/" ){
    if(localStorage.getItem('caishengu-access_token') == null){
        location.href = '/';
    }
}*/

  /*  var data= [{
            id:"dsdsa",
            name: "assd",
            contact: "ass",
            state: "open",
        },
        {
            id:"5154",
            name: "mnbv",
            contact: "zas",
            state: "open",
        },
        {
            id:"yutu",
            name: "lijdf",
            contact: "zxcc",
            state: "open",
        }

    ]
*/


 $(document).ready(function () {
     $.get("http://" + backend_host + '/web/admin/manage/shop?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
         {
             "page":0 ,
             "limit": 5,
         },
         function (data) {
                 var tbody = "";
                 $.each(data, function (i, order) {
                     tbody = '<tr><td><a href="../pages/examples/invoice.html">' + order.id + '</a></td>'
                     tbody += '<td>' + order.name + '</td>'
                     tbody += '<td><span class="label label-success">' + order.contact + '</span></td>'
                     tbody += '<td><div class="sparkbar" data-color="#00a65a" data-height="20">' + order.state + '</div></td>'
                     tbody += '<td><span class="label label-info"><a href="/merchart/details">编辑</a></span></td></tr>'


                     $('#Table').find('tbody').append(tbody);

                 });



             $('.pagination').append(' <li class="active"><a href="#Table">1<span class="sr-only">(current)</span></a></li>');
             $('.pagination').append('<li><a href="#">2</a></li>');
             $('.pagination').append('<li><a href="#">3</a></li>');
             $('.pagination').append('<li><a href="#">4</a></li>');
             $('.pagination').append('<li class="disabled"><a href="#">&raquo;</a></li>');



         })
     });

$('.pagination:eq(0)').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active');
    console.log($(this).index());
        var index = $(this).index() - 1;
    $.get("http://" + backend_host + '/web/admin/manage/shop?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":index,
            "limit":5
        },
        function (data) {
console.log(data);
            var tbody = "";
            $.each(data, function (i, order) {
                tbody = '<tr><td><a href="../pages/examples/invoice.html">' + order.id + '</a></td>'
                tbody += '<td>' + order.name + '</td>'
                tbody += '<td><span class="label label-success">' + order.contact + '</span></td>'
                tbody += '<td><div class="sparkbar" data-color="#00a65a" data-height="20">' + order.state + '</div></td>'
                tbody += '<td><span class="label label-info"><a href="/merchart/details">编辑</a></span></td></tr>'




            });
            $('#Table').find('tbody').html(tbody);

        })


})



