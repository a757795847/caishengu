$(document).ready(function () {
$.getJSON("http://" + backend_host + '/web/staff/postage/collection?' + token,
    function (data) {
        console.log(data.list);
        var tbody = "";

        $.each(data.list, function (i, order) {
            tbody +='<tr><td>'+order.name+'</td><td>';
            tbody +='<span class="label label-info"><a href="/shopping/mail/detail?'+order.id+'">编辑</a></span>';
            tbody +='<span class="label label-info"><a href="#">删除</a></span></td></tr>';
           

        });

        $('#users').append(tbody);

    })
});