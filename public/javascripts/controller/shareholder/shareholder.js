(function ($) {
    function indexAjax(tabID,state,val){
        if(arguments.length == 2){
            var data = {
                'apply_state': state
            }
        }else{
            var data = {
                'apply_state': state,
                'keyword':val
            }
        }
        $.ajax({
            type:'GET',
            url:'http://' + backend_host + '/web/staff/shareholder?'+token,
            data : data,
            dataType:'json',
            success:function(data){
                console.log(data);
                if(state == 'success'){
                    var shareholders = '';
                    for (var i = 0; i < data.length; i++) {
                        shareholders += '<tr><td>'+data[i].user_name+'</td><td><span class="label label-info">'
                        shareholders += '<a class="lookImg" data-src="'+data[i].image+'" data-toggle="modal" data-target=".bs-example-modal-look"  href="#">查看</a></span></td>';
                        shareholders += '<td>'+data[i].phone+'</td><td><span class="label label-info"><a href="#">查看详情</a></span>';
                        shareholders += '<span class="label label-info"><a class="success" href="'+data[i].user_id+'">通过</a></span>';
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
                $('.textShareholder').val('');
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){
                    errorMessage('数据读取失败');
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
        var index = $(this).attr('data-eq')
        var textShareholder = $('.textShareholder').eq(index).val();
        if(textShareholder == ''){
            return;
        }
        if(index == 0){
            indexAjax($('#wait tbody:eq(0)'),'apply',textShareholder);
        }else{
            indexAjax($('#list tbody:eq(0)'),'success',textShareholder);
        }
    })


    //上传文件
    var imagetoken =[];
    $('#pickfiles').on('click',function(){
        imagetoken = [];
        imagetokens();
    })
    function imagetokens(){
        $.ajax({
            type:'POST',
            url:'http://' + backend_host + '/other/file/apply?'+token,
            dataType:'json',
            async:false,
            success:function(data){
                imagetoken.push(data.token);
                imagetoken.push(data.file_key);

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){
                    errorMessage('获取图片名称失败')
                }
            }
        });
    }
    imagetokens();
//创建上传七牛

    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'container',
        container: 'addImgs',
        uptoken: imagetoken[0],
        unique_names: false,
        multi_selection: false,
        max_file_size:'3mb',
        save_key: false,
        domain: 'http://qiniu-plupload.qiniudn.com/',
        get_new_uptoken: true,
        auto_start: true,
        log_level: 5,
        filters: {
            mime_types: [
                {title : "pdf files", extensions : "pdf"}
            ]
        },
        init: {
            'FilesAdded': function (up, files) {

            },
            'BeforeUpload': function (up, file) {

            },
            'UploadProgress': function (up, file) {

            },
            'UploadComplete': function () {

            },
            'FileUploaded': function (up, file, info) {
                var domain = up.getOption('domain');
                var res = eval('(' + info + ')');
                var Src = 'http://' + backend_host + '/other/file/' + res.key + '?' + token;
                pdfUPload(imagetoken[1]);
                
                console.log(pdfName);
            },
            'Error': function (up, err, errTip) {

            }
            ,
            'Key': function (up, file) {
                var key = imagetoken[1];
                return key;
            }
        }
    });

//   通知文件上传成功
    function pdfUPload(pdfName){
        $.ajax({
            type:'PUT',
            url:'http://' + backend_host + '/other/file/'+pdfName+'?'+token,
            dataType:'json',
            async:false,
            success:function(data){
                console.log(data);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){
                    errorMessage('文件上传失败')
                }
            }
        })
    }

    //文件
    $('#upload').on('click','.deleteFile',function(){
        var fileId = $(this).attr('data-id')
        console.log(fileId);
        errorMessage('删除文件失败')
    })



})(jQuery)