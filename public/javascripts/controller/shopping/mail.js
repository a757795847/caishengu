$(document).ready(function () {
$.getJSON("http://" + backend_host + '/web/staff/postage/collection?' + token,
    function (data) {
        console.log(data.list);
        var tbody = "";

        $.each(data.list, function (i, order) {
            tbody +='<tr id="'+order.id+'"><td>'+order.name+'</td><td>';
            tbody +='<span class="label label-info"><a href="/shopping/mail/detail?'+order.id+'">编辑</a></span>';
            tbody +='<span data-id="'+order.id+'" class="label deleteModel label-info"><a href="#">删除</a></span></td></tr>';
           

        });

        $('#users').append(tbody);

    })
    function deleteAjax(templateId) {
        $.ajax({
            type:'DELETE',
            url:"http://" + backend_host + '/web/staff/postage/entity?'+ token+'&template_id='+templateId,
            dataType:'json',
            success:function(data){
                console.log(data);

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }
    $('#users').on('click','.deleteModel',function () {
        var id = $(this).data('id');
        deleteAjax(id);
        $('#'+id).remove();
    })
});