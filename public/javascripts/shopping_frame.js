$("#addtr").click(function(){
   window.location.href="/shopping/frame/detail";



});
$("#addgr").click(function(){
   window.location.href="/shopping/frame/details";



});


$(document).ready(function () {
   $.get("http://" + backend_host + '/web/staff/goods/market/class/collection?' + token,
       function (data) {
          console.log(data)
          var tbody = "";

          $.each(data.list, function (i, order) {
             tbody +='<tr> <td><img src="" alt="">'+order.name+'</td>';
             tbody +='<td><a href="/shopping/frame/detail">编辑</a></td>';
             tbody +='<td><span><a href="#" data-toggle="modal" data-target="#myModal">删除</a></span></td>';
             tbody +='<td><span>上</span><span class="bottom">下</span></td></tr>';

          });

          $('#shopping_frame_table').find('tbody').append(tbody);
          console.info("tbody", tbody)
       })
});