
$(document).ready(function () {
    $.getJSON("http://" + backend_host + '/web/admin/manage/staff?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":0 ,
            "limit": 5,
        },
        function (data) {
        // console.info("进入页面data", data);
            var tbody = "";

            $.each(data.list, function (i, order) {
               tbody +='<tr> <td><a href="../pages/examples/invoice.html" id="user_id">'+order.id+'</a></td>';
                tbody +='<td><span class="label label-success" id="user_name">'+order.name+'</span></td>';
                tbody +='<td><span class="label label-info" ><a href="/administrator/details?'+order.id+'">编辑</a></span></td></tr>';
            });
            $('#Table').find('tbody').append(tbody);
        })
});


function indexAjxa(index,size){
    $.getJSON("http://" + backend_host + '/web/admin/manage/staff?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "page":index,
            "limit":size
        },
        function (data) {
            console.log("翻页data", data);
            var tbody = "";
            $.each(data.list, function (i, order) {
                tbody +='<tr> <td><a href="../pages/examples/invoice.html" id="user_id">'+order.id+'</a></td>';
                tbody +='<td><span class="label label-success" id="user_name">'+order.name+'</span></td>';
                tbody +='<td><span class="label label-info" ><a href="/administrator/details?'+order.id+'">编辑</a></span></td></tr>';

               // $('#Table').find('tbody').append(tbody);
               //  console.log(tbody);
            });
            $('#Table').find('tbody').html(tbody);


        }
    )
}

$('[type="submit"]').click(function(){
    var keyword=$('[name="table_search"]').val();
    console.log(keyword);

    $.getJSON("http://" + backend_host + '/web/admin/manage/staff?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        {
            "keyword":keyword
        },
        function (data) {
        // console.info("搜索data", data);
            var tbody = "";
            $.each(data.list, function (i,order) {
                tbody +='<tr> <td><a href="../pages/examples/invoice.html" id="user_id">'+order.id+'</a></td>';
                tbody +='<td><span class="label label-success" id="user_name">'+order.name+'</span></td>';
                tbody +='<td><span class="label label-info" ><a href="/administrator/details">编辑</a></span></td></tr>';
            });
            $('#Table').find('tbody').html(tbody);
           // $('#Table').find('tbody').html(tbody);

        }

    )



});

$("#news").click(function(){
    window.location.href="/administrator/details";
});

$(".sss").pagination({
    count: 20, //总数
    size:5, //每页数量
    index: 1,//当前页
    lrCount: 3,//当前页左右最多显示的数量
    lCount: 1,//最开始预留的数量
    rCount: 1,//最后预留的数量
    callback: function (options) {
        var index = options.index -1;
        var size = options.size;
        indexAjxa(index,size);
        //options.count = 300;
        //return options;
    },
});
