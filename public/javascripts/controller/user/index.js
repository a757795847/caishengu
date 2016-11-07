(function ($) {
    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/user?'+token,
        dataType:'json',
        success:function(data){
            var users = '';
            for (var i = 0; i < data.length; i++) {
                users += '<tr><td>'+data[i].user_id+'</td><td>'+data[i].user_name+'</td><td>'+data[i].user_phone+'</td>';
                users += '<td><span class="label label-info"><a href="/user/detailed?'+data[i].user_id+'">查看</a></span></td></tr>'
            }
            $('#users').html(users);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })
    //搜索
    $('#searchUser').on('click',function(){
        var textUser = $('#textUser').val();
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/user?'+token,
            data:{
                'keyword' : textUser
            },
            dataType:'json',
            success:function(data){
                var users = '';
                for (var i = 0; i < data.length; i++) {
                    users += '<tr><td>'+data[i].user_id+'</td><td>'+data[i].user_name+'</td><td>'+data[i].user_phone+'</td>';
                    users += '<td><span class="label label-info"><a href="/user/detailed?'+data[i].user_id+'">查看</a></span></td></tr>'
                }
                $('#users').html(users);
            },
            error:function(jqXHR){
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                if(jqXHR.status == 400){

                }
            }
        })
        $('#textUser').val('');
    })
    
})(jQuery)