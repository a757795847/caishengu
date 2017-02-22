(function ($) {
    function indexAjax(tabID,datas,pageState){
        $.ajax({
            type:'GET',
            url:'http://' + backend_host + '/web/staff/shareholder?'+token,
            data : datas,
            dataType:'json',
            success:function(data){
                console.log( tabID ,data);
                // if(datas.state == 'success' || datas.state == 'apply'){
                    var shareholders = '';
                    for (var i = 0; i < data.list.length; i++) {
                        shareholders += '<tr><td>'+data.list[i].user_name+'</td>';
                        if(datas.apply_state == 'apply'){
                            shareholders += '<td><span class="label label-info"><a class="lookImg" data-src="'+data.list[i].image+'" data-toggle="modal" data-target=".bs-example-modal-look"  href="#">查看</a></span></td>';
                        }
                        shareholders += '<td>'+data.list[i].phone+'</td><td><span class="label label-info"><a href="#">查看详情</a></span>';
                        if(datas.apply_state == 'apply'){
                            shareholders += '<span class="label label-info"><a class="success" href="'+data.list[i].user_id+'">通过</a></span>';
                            shareholders += '<span class="label label-info"><a class="reject" href="'+data.list[i].user_id+'" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>';
                        }
                    }
                    $('#'+tabID+' tbody:eq(0)').html(shareholders);
                    $('#wait a[data-target=".bs-example-modal-look"]').on('click',function(){
                        var src = $(this).attr('data-src');
                        $('#lookImg').attr('src',src);
                    })
                    if(pageState == 1){
                        $('#'+tabID+' .pagination .pager').remove();
                        $('#'+tabID+' .pagination').pagination({
                            count: data.item_total, //总数
                            size:10, //每页数量
                            index: 1,//当前页
                            lrCount: 3,//当前页左右最多显示的数量
                            lCount: 1,//最开始预留的数量
                            rCount: 1,//最后预留的数量
                            callback: function (options) {
                                var index = options.index -1;
                                indexAjax(tabID, {'status':datas.apply_state,'page_total':true,'page':index})
                                //options.count = 300;
                                //return options;
                            },
                        });
                    }
                // }else{
                //     var list = '';
                //     for (var i = 0; i < data.list.length; i++) {
                //         list += '<tr><td>'+data.list[i].user_name+'</td><td>'+data.list[i].phone+'</td><td>';
                //         list += '<span class="label label-info"><a href="#">查看详情</a></span></td></tr>';
                //     }
                //     tabID.html(list);
                // }
                $('.textShareholder').val('');
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){
                    errorMessage('数据读取失败');
                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }
    indexAjax('wait',{'apply_state':'apply'},1);
    indexAjax('list',{'apply_state':'success'},1);

    //操作 ajax
    function operationAjax(obj,operation){
        var href = obj.attr('href');
        console.log(href);
        $.ajax({
            type:'PUT',
            url:'http://' + backend_host + '/web/staff/finance/approve/'+href+'?'+token+'&operation='+operation,
            dataType:'json',
            success:function(data){
                console.log(data);
            },
            error:function(jqXHR,textStatus, errorThrown){
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                if(jqXHR.status == 400){
                    errorMessage('操作失败,请刷新页面重试')
                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }

    $('#wait tbody:eq(0)').on('click','.success',function(e){
        e.preventDefault();
        operationAjax($(this),'success')
    })

    $('#wait tbody:eq(0)').on('click','.reject',function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        var dataId = $(this);
        $('#noBtn').attr('data-id',href);
        $('#noBtn').on('click',function(){
            if(dataId.attr('href') == $(this).attr('data-id')){
                operationAjax(dataId,'reject');
            }
        })

    })

    $('.searchShareholder').on('click',function(){
        var index = $(this).attr('data-eq');
        var textShareholder = $('.textShareholder').eq(index).val();
        if(textShareholder == ''){
            return;
        }
        if(index == 0){
            indexAjax('wait',{'apply_state':'apply','keyword':textShareholder},1);
        }else{
            indexAjax('list',{'apply_state':'success','keyword':textShareholder},1);
        }
    })


    newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token,3,"pdf");

    var png = "";
    function fileUploadCompleteCallback(key, src) {
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        
        $('#container').hide();

        $('#container').before(imageBoxs);

        png = key;
    }
    $('#fsUploadProgress').on('mousemove ', '.imgBox', function () {
        $(this).find('button').css('display', 'block');

    })
    $('#fsUploadProgress').on('mouseout ', '.imgBox', function () {
        $(this).find('button').css('display', 'none');
    })
    $('#fsUploadProgress').on('click ', '.imgBox button', function (e) {
        e.stopPropagation();
        var dataName = $(this).attr('data-name');
        png = '';
        $(this).parent().remove();
        $('#container').show();
    })

    //文件
    $('#upload').on('click','.deleteFile',function(){
        var fileId = $(this).attr('data-id')
        console.log(fileId);
        errorMessage('删除文件失败')
    })



})(jQuery)