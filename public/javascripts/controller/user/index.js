(function ($) {
    function indexAjax(pageState,datas) {
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/user?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(data)
                var users = '';
                for (var i = 0; i < data.list.length; i++) {
                    users += '<tr><td>'+data.list[i].user_id+'</td><td>'+data.list[i].user_name+'</td><td>'+data.list[i].user_phone+'</td>';
                    users += '<td><span class="label label-info"><a href="/user/detailed?'+data.list[i].user_id+'">查看</a></span></td></tr>'
                }
                $('#users').html(users);
                $('#textUser').val('');
                if( pageState == 1){
                    $('.pagination').pagination({
                        count: data.item_total, //总数
                        size:10, //每页数量
                        index: 1,//当前页
                        lrCount: 3,//当前页左右最多显示的数量
                        lCount: 1,//最开始预留的数量
                        rCount: 1,//最后预留的数量
                        callback: function (options) {
                            var index = options.index -1;

                            if(datas.keyword){
                                indexAjax(0,{'status':datas.status,'page_total':true,'page':index,'keyword':datas.keyword})

                            }else{
                                indexAjax(0, {'status':datas.status,'page_total':true,'page':index})
                            }

                            //options.count = 300;
                            //return options;
                        },
                    });
                }
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
    indexAjax(1);
    //搜索
    $('#searchUser').on('click',function(){
        var textUser = $('#textUser').val();
        indexAjax(1,{
            'keyword' : textUser
        });
        // $.ajax({
        //     type:'GET',
        //     url:"http://" + backend_host + '/web/staff/user?'+token,
        //     data:{
        //
        //     },
        //     dataType:'json',
        //     success:function(data){
        //         var users = '';
        //         for (var i = 0; i < data.length; i++) {
        //             users += '<tr><td>'+data[i].user_id+'</td><td>'+data[i].user_name+'</td><td>'+data[i].user_phone+'</td>';
        //             users += '<td><span class="label label-info"><a href="/user/detailed?'+data[i].user_id+'">查看</a></span></td></tr>'
        //         }
        //         $('#users').html(users);
        //     },
        //     error:function(jqXHR){
        //         if(jqXHR.status == 400){
        //
        //         }
        //         if(jqXHR.status == 401){
        //             overdueToken()
        //         }
        //     }
        // })
    })

    
    
})(jQuery)