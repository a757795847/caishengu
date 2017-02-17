$("#addtr").click(function () {
    window.location.href = "/shopping/frame/detail";


});
$("#addgr").click(function () {
    window.location.href = "/shopping/frame/details?0";


});

$(document).ready(function () {

    $(function () {


    });

    $.getJSON("http://" + backend_host + '/web/staff/goods/market/class/collection?' + token + "&with_label=true",
        function (data) {
            console.log(data)
            var tbody = "";
            $.each(data.list, function (i, order) {
                var imageSrc = "http://" + backend_host + order.image + "?" + token
                tbody += '<tr> <td><img src= ' + imageSrc + ' alt="">' + order.name + '</td>';
                tbody += '<td><a href="/shopping/frame/detail?id=' + order.id + '" id="shopping_frame_edit">编辑</a></td>';
                tbody += '<td><span><a href="#" data-toggle="modal" data-target="#myModal">删除</a></span></td>';
                tbody += '<td><span>上</span><span class="bottom">下</span></td></tr>';

            });
            $('#shopping_frame_type_table').find('tbody').append(tbody);
            // console.info("tbody", tbody)

            var dataAddId = data.list.map(function (item) {
                    item.children.map(function (i) {
                        i.id = i.label_id;
                        i.name = i.label_name;
                    });

                    return item
                }
            );

            console.info("dataAddId", dataAddId);

            $('#province, #city').citylist({
                data: dataAddId,
                id: 'id',
                children: 'children',
                name: 'name',
                metaTag: 'name'
            });

            var list_tbody = "";
            list_tbody += '<option value="qb_dl">全部</option>';
            $.each(data.list, function (i, order) {
                list_tbody += '<option value=' + i + '>' + order.name + '</option>';

            });
            console.info("list_tbody", list_tbody);
            console.info("$('#shopping_frame_broad_heading')", $('#shopping_frame_broad_heading'));
            $('select.shopping_frame_broad_heading').append(list_tbody);
        });

    $.getJSON("http://" + backend_host + '/web/staff/goods/market/collection?' + token,
        function (data) {
            console.log(data)
            var tbody = "";

            $.each(data.list, function (i, order) {
                var recommend = order.is_recommend;
                if (recommend == true) {
                    recommend = '推荐'
                } else {
                    recommend = '不推荐'
                }

                tbody += '<tr> <td>' + order.given_id + '</td>';
                tbody += '<td> ' + order.name + '</td>';
                tbody += '<td> ' + order.price_point + '财神币/ ' + order.price_coin + '积分 </td>';
                tbody += '<td>  <a href="/shopping/frame/details?id=' + order.id + '">编辑</a></td>';
                tbody += '<td>  <span> ' + recommend + '</span></td>';
                tbody += '<td>  <span> 上架 </span></td></tr>';

            });

            $('#shopping_frame_goods_table').find('tbody').append(tbody);
            // console.info("tbody", tbody)
        })
});