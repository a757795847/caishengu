(function($){

    var detailUrl = window.location.search.split('?')[1].split('&');
    console.log(detailUrl);
    if(detailUrl.length > 1 ){
        console.log('编辑');
        if(detailUrl[0] == 'frame'){
            $('#nav').text('商品详情');
            $('#exchange').text('财神币');
            $('#priceCoin').attr('placeholder','金额');
            detailUrl[0] = 'market';
            console.log(detailUrl);
            if(detailUrl[1] != undefined){
                $('#container').show();
                detailAjax(detailUrl[1]);
                $('#saveGoods').on('click',function(){
                    for(var i=0;i<images.length;i++){
                        imgUPload(images[i]);
                    }
                    changeDetailAjax(true);
                })
                $('#closeGoods').on('click',function(){
                    changeDetailAjax(false);
                })
            }
        }else{
            $('#nav').text('门票详情');
            $('#exchange').text('积分');
            $('#priceCoin').attr('placeholder','积分');
            if(detailUrl[1] != undefined){
                $('#container').hide();
                detailAjax(detailUrl[1]);
                $('#saveGoods').on('click',function(){
                    changeDetailAjax(true);
                })
            }
        }
    }else{
        console.log('新建');
        detailUrl = detailUrl[0];
        $('#saveGoods').on('click',function(){
            var title = $('#title').val();
            var priceMoney = $('#priceMoney').val();
            var priceCoin = $('#priceCoin').val();
            var introduction = $('#introduction').val();
            console.log(detailUrl);
            console.log(title);
            console.log(priceMoney);
            console.log(priceCoin);
            console.log(introduction);
            $.ajax({
                type:'POST',
                url:'http://' + backend_host + '/web/staff/goods/market?'+token,
                data:{
                    'class_id': detailUrl,
                    'images':['dfasdfas/dfasdf'],
                    'title':title,
                    'price_money':priceMoney,
                    'price_coin':priceCoin,
                    'introduction':introduction
                },
                dataType:'json',
                success:function(data){
                    console.log(data);


                },
                error:function(jqXHR){
                    if(jqXHR.status == 400){

                    }
                }
            })
        })

    }

    function detailAjax(goodsId){
        $.ajax({
            type:'GET',
            url:'http://' + backend_host + '/web/staff/goods/market/entity/'+goodsId+'?'+token,
            dataType:'json',
            success:function(data){
                console.log(data);
                var imageBoxs = '';
                for(var i=0;i<data.images.length;i++){
                    imageBoxs += '<div class="imgBox"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                    imageBoxs += '<img src="http://' + backend_host +data.images[i]+'?'+token+'"></div>';
                    images.push(data.images[i]);
                }
                $('#container').before(imageBoxs);

                $('#title').val(data.title);
                $('#priceMoney').val(data.price_money);
                $('#priceCoin').val(data.price_coin);
                $('#introduction').val(data.introduction);


            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }

    function changeDetailAjax(frame){
        var title = $('#title').val();
        var priceMoney = $('#priceMoney').val();
        var priceCoin = $('#priceCoin').val();
        var introduction = $('#introduction').val();
        console.log(title);
        console.log(priceMoney);
        console.log(priceCoin);
        console.log(introduction);
        console.log(images);
        $.ajax({
            type:'PUT',
            url:'http://' + backend_host + '/web/staff/goods/market/entity/'+detailUrl[1]+'?'+token,
            data:{
                'images':images,
                'title':title,
                'price_money': priceMoney,
                'introduction': introduction,
                'valid':frame
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                location.href = '/shopping/frame';
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }

//    上传图片

    var images = [], imagetoken =[];
    $('#pickfiles').on('click',function(){
        imagetokens();
    })
    function imagetokens(){
        $.ajax({
            type:'POST',
            url:'http://' + backend_host + '/other/file/apply?'+token,
            dataType:'json',
            async:false,
            success:function(data){
                console.log(data);
                imagetoken.push(data.token);
                imagetoken.push(data.file_key);

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        });
    }
    imagetokens();
    newUploader();
    function newUploader(){
        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: 'container',
            container: 'addImgs',
            uptoken: imagetoken[0],
            unique_names: false,
            multi_selection: false,
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
                    if(imagetoken[1] != undefined){
                        images.push(imagetoken[1]);
                    }
                    var domain = up.getOption('domain');
                    var res = eval('(' + info + ')');
                    var Src = 'http://' + backend_host + '/other/file/' + res.key + '?' + token;
                    var imageBoxs = '';
                    imageBoxs += '<div class="imgBox"><button type="button" data-index="'+ imagetoken[1] +'" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                    imageBoxs += '<img src="'+ Src +'"></div>'
                    $('#container').before(imageBoxs);
                    if(images.length > 3){
                        $('#pickfiles span').text('最多添加2张');
                        uploader.destroy();
                        return false;
                    }
                    imagetoken = [];
                    console.log(images);
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
    $('#fsUploadProgress').on('mousemove ','.imgBox',function(){
        $(this).find('button').css('display','block');
    })
    $('#fsUploadProgress').on('mouseout ','.imgBox',function(){
        $(this).find('button').css('display','none');
    })
    $('#fsUploadProgress').on('click ','.imgBox button',function(e){
        e.stopPropagation();
        var dataIndex = $(this).attr('data-index');
        images.splice($.isArray(dataIndex,images),1);
        $(this).parent().remove();
        console.log(images);
        newUploader();
    })
//   通知图片上传成功
    function imgUPload(imgId){
        $.ajax({
            type:'POST',
            url:'http://' + backend_host + '/other/file/'+imgId+'?'+token,
            dataType:'json',
            async:false,
            success:function(data){
                console.log(data);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }

})(jQuery)

