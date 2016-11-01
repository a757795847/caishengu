(function($){
    var params = {
        fileInput: $("#fileImg").get(0),
        //dragDrop: $("#fileDragArea").get(0),
        upButton: $("#fileSubmit").get(0),
        url: $("#uploadForm").attr("action"),
        filter: function(files) {
            var arrFiles = [];
            for (var i = 0, file; file = files[i]; i++) {
                if (file.type.indexOf("image") == 0) {
                    if (file.size >= 512000) {
                        alert('您这张"'+ file.name +'"图片大小过大，应小于500k');
                    } else {
                        arrFiles.push(file);
                    }
                } else {
                    alert('文件"' + file.name + '"不是图片。');
                }
            }
            return arrFiles;
        },
        onSelect: function(files) {
            var html = '', i = 0;
            $("#preview").html('<div class="upload_loading"></div>');
            var funAppendImage = function() {
                file = files[i];
                if (file) {
                    var reader = new FileReader()
                    reader.onload = function(e) {
                        html = html + '<div id="uploadList_'+ i +'" class="upload_append_list"><p>' +
                            '<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" /></p>'+
                            '</div>';
                        i++;
                        funAppendImage();
                    }
                    reader.readAsDataURL(file);
                } else {
                    $("#preview").html(html);
                }
            };
            funAppendImage();
        },
        onDelete: function(file) {
            $("#uploadList_" + file.index).fadeOut();
        },
        onDragOver: function() {
            $(this).addClass("upload_drag_hover");
        },
        onDragLeave: function() {
            $(this).removeClass("upload_drag_hover");
        },
        onProgress: function(file, loaded, total) {
            var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
            eleProgress.show().html(percent);
        },
        onSuccess: function(file, response) {
            $("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
        },
        onFailure: function(file) {
            $("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");
            $("#uploadImage_" + file.index).css("opacity", 0.2);
        },
        onComplete: function() {
            //提交按钮隐藏
            $("#fileSubmit").hide();
            //file控件value置空
            $("#fileImage").val("");
            $("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
        }
    };
    ZXXFILE = $.extend(ZXXFILE, params);
    ZXXFILE.init();

    var detailUrl = window.location.search.split('?')[1];
    if(detailUrl == 'frame' || detailUrl == 'ticket' ){
        detailUrl = detailUrl.split('&');
        if(detailUrl[0] == 'frame'){
            $('#nav').text('商品详情');
            $('#exchange').text('财神币');
            $('#priceCoin').attr('placeholder','金额');
            $('#uploadForm').on('click',function(e){
                if($('#preview div').length >= 9){
                    e.preventDefault();
                    $('#uploadForm').html('<p style="font-size: 10px">最多只能提交9张</p>')
                };
            })
            detailUrl[0] = 'market';
            console.log(detailUrl);
            if(detailUrl[1] != undefined){
                detailAjax();
            }
        }else{
            $('#nav').text('门票详情');
            $('#exchange').text('积分');
            $('#priceCoin').attr('placeholder','积分');
            $('#uploadForm').on('click',function(e){
                if($('#preview div').length >= 2){
                    e.preventDefault();
                    $('#uploadForm').html('<p style="font-size: 10px">最多只能提交2张</p>');
                };
            })
            if(detailUrl[1] != undefined){
                detailAjax();
            }
        }
    }else{
        $('#addGoods').on('click',function(){
            var title = $('#title').val();
            var priceMoney = $('#priceMoney').val();
            var priceCoin = $('#priceCoin').val();
            var introduction = $('#introduction').val();
            
            $.ajax({
                type:'GET',
                url:'http://' + backend_host + '/web/staff/goods/'+detailUrl[0]+'/'+ detailUrl[1] +'?access_token=10ae0842b11080b0b6c9412773164797',
                data:{
                   'class_id': detailUrl,
                    'images':[],
                    'title':title,
                    'price_money':priceMoney,
                    'price_coin':priceCoin,
                    'introduction':introduction
                },
                dataType:'json',
                success:function(data){
                    console.log(data);
                    var imgs = '';
                    if(Array.isArray(data.images)){
                        for(var i=0;i<data.images.length;i++){
                            imgs += '<div><img src="'+data.images[i]+'" alt=""></div>';
                        }
                    }else{
                        imgs = '<div><img src="'+data.images[i]+'" alt=""></div>';
                    }
                    $('#preview').append(imgs);
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
        })

    }





        // var data = {
        //     'id':'12333',
        //     'images':[
        //         '/sdfas/dfas.jpg',
        //         '/sdfas/df12as.jpg',
        //         '/sdfas/df123as.jpg',
        //     ],
        //     'title':'我是标题',
        //     'price_money':'123',
        //     'price_coin':'2223',
        //     'introduction':'我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简'
        // }
        //
        // var imgs = '';
        // for(var i=0;i<data.images.length;i++){
        //     imgs += '<div><img src="'+data.images[i]+'" alt=""></div>';
        // }
        // $('#preview').append(imgs);
        // $('#title').val(data.title);
        // $('#priceMoney').val(data.price_money);
        // $('#priceCoin').val(data.price_coin);
        // $('#introduction').val(data.introduction);

        function detailAjax(){
            $.ajax({
                type:'GET',
                url:'http://' + backend_host + '/web/staff/goods/'+detailUrl[0]+'/'+ detailUrl[1] +'?access_token=10ae0842b11080b0b6c9412773164797',
                dataType:'json',
                success:function(data){
                    console.log(data);
                    var imgs = '';
                    if(Array.isArray(data.images)){
                        for(var i=0;i<data.images.length;i++){
                            imgs += '<div><img src="'+data.images[i]+'" alt=""></div>';
                        }
                    }else{
                        imgs = '<div><img src="'+data.images[i]+'" alt=""></div>';
                    }
                    $('#preview').append(imgs);
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


        // var data2 = {
        //     'id':'12333',
        //     'images':'/sdfas/dfas.jpg',
        //     'title':'我是标题',
        //     'price_money':'123',
        //     'price_coin':'2223',
        //     'introduction':'我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简'
        // }


})(jQuery)

