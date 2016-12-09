(function ($) {
    var url = window.location.search.split('?')[1].split('&');
    //上传获取key和token
    function imagetokens(){
        $.ajax({
            type:'POST',
            url:'http://' + backend_host + '/other/file/apply?'+token,
            dataType:'json',
            async:false,
            success:function(data){
                imagetoken.push(data.token);
                imagetoken.push(data.file_key);
                console.log(imagetoken);
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
    if(url[0] == 'add'){
        var imagetoken = [], imageLogo = '', images =[];
        imagetokens();
        newUploader('addLogo','container1');
        newUploader('addImgs','container2');
        cancelImages($('#fsUploadProgress1'),'addLogo','container1','上传Logo');
        cancelImages($('#fsUploadProgress2'),'addImgs','container2','上传图片');
        $('#addBorrow').on('click',function(){
            var location = $('#location').val();
            var class_level1_id = $('#classLevel1Id').val();
            var class_level2_id = $('#classLevel2Id').val();
            var stage_id = $('#stageId').val();
            var financing_date = $('#reservation').val();
            var stage_id2 = $('#stageId2').val();
            var money = $('#money').val();
            imgUPload(imageLogo);
            for(var i=0;i<images.length;i++){
                imgUPload(images[i]);
            }
            $.ajax({
                type:'POST',
                url:"http://" + backend_host + '/web/staff/news/financing?'+token,
                dataType:'json',
                data:{//没有简介
                    'logo':imageLogo,
                    'location':location,
                    'class_level1_id':class_level1_id,
                    'class_level2_id':class_level2_id,
                    'stage_id':stage_id,
                    'financing_date':'2015-12-22',
                    'financing_organization':'红杉资本',
                    'images':images,
                    'history':{
                        'financing_date':financing_date,
                        'stage_id':stage_id2,
                        'money':money
                    }
                },
                success:function(data){
                    console.log(data);

                },
                error:function(jqXHR){
                    if(jqXHR.status == 400){

                    }
                }
            })
        })
    }else if(url[0] == 'change'){
        var imagetoken = [], imageLogo = '', images =[];
        imagetokens();
        $('#addBorrow').on('click',function(){
            var location = $('#location').val();
            var class_level1_id = $('#classLevel1Id').val();
            var class_level2_id = $('#classLevel2Id').val();
            var stage_id = $('#stageId').val();
            var financing_date = $('#reservation').val();
            var stage_id2 = $('#stageId2').val();
            var money = $('#money').val();

            console.log(location);
            console.log(class_level1_id);
            console.log(class_level2_id);
            console.log(stage_id);
            console.log(financing_date);
            console.log(stage_id2);
            console.log(money);

        })

        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/news/financing/'+url[1]+'?'+token,
            dataType:'json',
            success:function(data){
                console.log(data);
                var news = '';
                for (var i = 0; i < data.length; i++) {
                    news += '<tr><td>'+data[i].order+'</td><td>'+data[i].name +'</td><td>'+data[i].stage+'</td>';
                    news += '<td><span class="label label-info"><a href="/borrow/detail?change&'+data[i].news_id+'">编辑</a></span>'
                    news += '<span class="label label-info"><a class="delete" data-id="'+data[i].news_id+'" href="#">删除</a></td></tr>';
                }
                $('#news').html(news);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }
    //下拉列表
    financingAjax($('#stageId2'));
    financingAjax($('#stageId'));
    function financingAjax(financingId){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/other/definition/financing?'+token,
            dataType:'json',
            success:function(data){
                var stageList = '';
                for(var i = 0; i<data.length;i++){
                    stageList += '<option>'+data[i].name+'</option>';
                    //if()选中状态
                }
                financingId.html(stageList);
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
    industryAjax($('#classLevel1Id'));
    industryAjax($('#classLevel2Id'));
    function industryAjax(industry){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/other/definition/industry?'+token,
            dataType:'json',
            success:function(data){
                var stageList = '';
                for(var i = 0; i<data.length;i++){
                    stageList += '<option>'+data[i].name+'</option>';
                    //if()选中状态
                }
                industry.html(stageList);
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

    //七牛
    function newUploader(father,child){
        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: child,
            container: father,
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
                    {title: "Image files", extensions: "jpg,jpeg,gif,png"}
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
                    var imageBoxs = '';
                    imageBoxs += '<div class="imgBox"><button type="button" data-index="'+ imagetoken[1] +'" class="close">×</button>';
                    imageBoxs += '<img src="'+ Src +'"></div>';
                    if(father == 'addLogo'){
                        imageLogo = imagetoken[1];
                        $('#'+child).hide();
                    }else{
                        images.push(imagetoken[1]);
                       if(images.length >= 3){
                           uploader.destroy();
                           $('#pickfiles span').text('最多上传3张');
                       }
                    }

                    $('#'+child).before(imageBoxs);
                    imagetoken = [];
                    imagetokens();
                },
                'Error': function (up, err, errTip) {

                }
                ,
                'Key': function (up, file) {
                    var key = imagetoken[1];
                    return key
                }
            }
        });
    }
    function cancelImages(area,father,child,text){
        area.on('click ','.imgBox button',function(e){
            e.stopPropagation();
            var dataIndex = $(this).attr('data-index');
            $(this).parent().remove();
            imagetokens();
            $('#pickfiles span').text(text);
            if(father == 'addLogo'){
                imageLogo = '';
                $('#'+child).show();
            }else{
                images.splice($.isArray(dataIndex,images),1);
                newUploader(father,child);
            }

        })
    }
    //   通知图片上传成功
    function imgUPload(imgId){
        $.ajax({
            type:'PUT',
            url:'http://' + backend_host + '/other/file/'+imgId+'?'+token,
            dataType:'json',
            async:false,
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
})(jQuery)