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
$("#newpage").click(function(){
    window.location.href="/merchart/details";
});


 $(document).ready(function (){
     $.getJSON("http://" + backend_host + '/web/admin/manage/shop?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
         {
             "page":0,
             "limit":5,
         },
         function (data) {
         console.info("data", data);
                 var tbody = "";
                 $.each(data.list, function (i, order) {
                     var state = order.state="open"?"营业中":"停业";
                     tbody = '<tr><td><a href="../pages/examples/invoice.html">' + order.id + '</a></td>'
                     tbody += '<td>' + order.name + '</td>'
                     tbody += '<td><span class="label label-success">' + order.contact + '</span></td>'
                     tbody += '<td><div class="sparkbar" data-color="#00a65a" data-height="20">' + state + '</div></td>'
                     tbody += '<td><span class="label label-info"><a href="/merchart/details?'+ order.id +'">编辑</a></span></td></tr>'

                     $('#Table').find('tbody').append(tbody);

                 });

         })
     });

function indexAjxa(index,size){
    $.getJSON("http://" + backend_host + '/web/admin/manage/shop?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":index,
            "limit":size
        },
        function (data) {
        console.log("分页data", data);
            var tbody = "";
            $.each(data.list, function (i,order) {
                tbody += '<tr><td><a href="../pages/examples/invoice.html">' + order.id + '</a></td>'
                tbody += '<td>' + order.name + '</td>'
                tbody += '<td><span class="label label-success">' + order.contact + '</span></td>'
                tbody += '<td><div class="sparkbar" data-color="#00a65a" data-height="20">' + order.state + '</div></td>'
                tbody += '<td><span class="label label-info"><a href="/merchart/details">编辑</a></span></td></tr>'




            });
            $('#Table').find('tbody').html(tbody);


            }
    )
}


$("#jqueryPage").pagination({
    count: 10, //总数
    size:5, //每页数量
    index: 1,//当前页
    lrCount: 5,//当前页左右最多显示的数量
    lCount: 1,//最开始预留的数量
    rCount: 1,//最后预留的数量
    callback: function (options) {
        console.log(options);
        var index = options.index -1;
        var size = options.size;
        indexAjxa(index,size);
        //options.count = 300;
        //return options;
    },
});








//
$('[type="submit"]').click(function(){
        var keyword=$('[name="table_search"]').val();
    console.log(keyword);
    if (keyword !== "") {
        $.getJSON("http://" + backend_host + '/web/admin/manage/shop?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
            {
                "keyword": keyword
            },
            function (data) {
                console.info("搜索data", data);
                var tbody = "";
                if (data.list.length == 0) {
                    tbody += '<tr><td>暂无数据</td></td></tr>'
                } else {
                    $.each(data.list, function (i, order) {
                        tbody = '<tr><td><a href="../pages/examples/invoice.html">' + order.id + '</a></td>'
                        tbody += '<td>' + order.name + '</td>'
                        tbody += '<td><span class="label label-success">' + order.contact + '</span></td>'
                        tbody += '<td><div class="sparkbar" data-color="#00a65a" data-height="20">' + order.state + '</div></td>'
                        tbody += '<td><span class="label label-info"><a href="/merchart/details">编辑</a></span></td></tr>'
                    });
                }
                $('#Table').find('tbody').html(tbody);
            }
        )
    }


});



