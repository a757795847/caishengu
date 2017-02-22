(function ($) {

    function indexAjax(data) {
        $.ajax({
            type: 'GET',
            url: "http://" + backend_host + '/web/staff/gongfeng/qian/collection?'+ token,
            dataType: 'json',
            data:data,
            success: function (data) {
                console.log(data);
                var list = ''
                for(var i=0;i<data.list.length;i++){
                    list += '<tr><th>'+data.list[i].name+' ( '+ data.list[i].qian_number +' )</th><th><span class="label label-info"><a href="/answer/detail?'+data.list[i].id +'" >编辑</a></span>';
                    list += '</th></tr>'
                }
                $('#users').html(list)
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }

        });
    }
    indexAjax()

    

})(jQuery)

