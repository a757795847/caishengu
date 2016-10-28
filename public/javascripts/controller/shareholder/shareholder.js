(function ($) {
    function indexAjax(tabID,state){
        $.ajax({
            type:'GET',
            url:'http://' + backend_host + '/web/staff/shareholder?access_token=10ae0842b11080b0b6c9412773164797',
            data : {
                'apply_state': state
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if(state == 'success'){
                    var shareholders = '';
                    for (var i = 0; i < data.length; i++) {
                        shareholders += '<tr><td>'+data[i].user_name+'</td><td><span class="label label-info">'
                        shareholders += '<a data-src="'+data[i].image+'" data-toggle="modal" data-target=".bs-example-modal-look"  href="#">查看</a></span></td>';
                        shareholders += '<td>'+data[i].phone+'</td><td><span class="label label-info"><a href="#">查看详情</a></span>';
                        shareholders += '<span class="label label-info"><a class="accept" href="'+data[i].user_id+'">通过</a></span>';
                        shareholders += '<span class="label label-info"><a class="reject" href="'+data[i].user_id+'" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>';
                    }
                    tabID.html(shareholders);
                    $('#wait a[data-target=".bs-example-modal-look"]').on('click',function(){
                        var src = $(this).attr('data-src');
                        $('#lookImg').attr('src',src);
                    })
                }else{
                    var list = '';
                    for (var i = 0; i < data.length; i++) {
                        list += '<tr><td>'+data[i].user_name+'</td><td>'+data[i].phone+'</td><td>';
                        list += '<span class="label label-info"><a href="#">查看详情</a></span></td></tr>';
                    }
                    tabID.html(list);
                }

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }
    indexAjax($('#wait tbody:eq(0)'),'apply');
    indexAjax($('#list tbody:eq(0)'),'success');

    //操作 ajax
    function operationAjax(obj,operation){
        var href = obj.attr('href');
        console.log(href);
        $.ajax({
            type:'PUT',
            url:'http://' + backend_host + '/web/staff/finance/approve/'+href+'?access_token=10ae0842b11080b0b6c9412773164797&operation='+operation,
            dataType:'json',
            success:function(data){
                console.log(data);
            },
            error:function(jqXHR,textStatus, errorThrown){
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                if(jqXHR.status == 400){

                }
            }
        })
    }

    $('.accept').on('click',function(e){
        e.preventDefault();
        operationAjax($(this),'accept')
    })

    $('.reject').on('click',function(e){
        e.preventDefault();
        operationAjax($(this),'reject')
    })

    $('#searchShareholder').on('click',function(){
        var textShareholder = $('#textShareholder').val();
        console.log(searchText);
        $.ajax({
            type:'GET',
            url:'http://' + backend_host + '/web/staff/shareholder?access_token=10ae0842b11080b0b6c9412773164797',
            data:{
                'keyword' : textShareholder
            },
            dataType:'json',
            success:function(data){
                var users = '';
                for (var i = 0; i < data.length; i++) {
                    users += '<tr><td>'+data[i].user_id+'</td><td>'+data[i].user_name+'</td><td>'+data[i].user_phone+'</td>';
                    users += '<td><span class="label label-info"><a href="#">查看</a></span></td></tr>'
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
    })

})(jQuery)