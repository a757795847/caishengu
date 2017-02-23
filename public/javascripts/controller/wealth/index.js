(function ($) {

    window.shengxiaos = {
        //老鼠
        mouse:'',
        //牛
        cattle:'',
        //虎
        tiger:'',
        //兔
        rabbit:'',
        //龙
        dragon:'',
        //蛇
        snake:'',
        //马
        horse:'',
        //羊
        sheep:'',
        //猴
        monkey:'',
        //鸡
        chicken:'',
        //狗
        dog:'',
        //猪
        pig:''
    };
    var music = '', musictoken = '';

    var shengxiao = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
    var shengxiaoId = ['mouse','cattle','tiger','rabbit','dragon','snake','horse','sheep','monkey','chicken','dog','pig']
    // var chinese = '';
    // for (var i=0;i<shengxiao.length;i++){
    //     var data = shengxiaoId[i];
    //     chinese += '<div class="add"><div id="'+shengxiaoId[i]+'" role="tabpanel" class="tab-pane fade in active pull-left mRight" aria-labelledby="demo-tab"><div>';
    //     chinese += '<div class="addImg" id="'+shengxiaoId[i]+'s"><a href="#" ><span>'+shengxiao[i]+'</span></a></div></div></div></div>'
    //
    // }
    // $('#chinese').html(chinese);
    for (var i=0;i<shengxiao.length;i++){
        newQiniu(mouse, shengxiaoId[i]+'s', shengxiaoId[i], imagetokens().token,1,"jpg,jpeg,gif,png");
    }

    function mouse(key, src,id) {
        imageHtml(id,key,src)
        shengxiaos[id] = key;
        shengxiaofn(id,shengxiaos);
    }

    function imageHtml(id,key,src) {
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox mRight"><button type="button" data-key="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#'+id).hide();
        $('#'+id).before(imageBoxs);
    }

    function shengxiaofn(id,datas) {
        var parent = $('#'+id).parent();
        parent.on('mousemove ', '.imgBox', function () {
            $(this).find('button').css('display', 'block');
        });

        parent.on('mouseout ', '.imgBox', function () {
            $(this).find('button').css('display', 'none');
        });

        parent.on('click ', '.imgBox button', function (e) {
            e.stopPropagation();
            datas[id] = '';
            console.log(datas);
            $(this).parent().remove();
            $('#'+id).show();
        });
    }


    newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token,1,"jpg,jpeg,gif,png");


    var statueList = [];
    function fileUploadCompleteCallback(key, src) {
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-key="' + key + '" class="close closeBtn" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#container').hide();

        $('#container').before(imageBoxs);
    }
    function caishenCloseBtn(id) {
        $('#'+id).on('mousemove ', '.imgBox', function () {
            $(this).find('button').css('display', 'block');
        });
        $('#'+id).on('mouseout ', '.imgBox', function () {
            $(this).find('button').css('display', 'none');
        });
    }
    caishenCloseBtn('addcaishen');

    $('#addcaishen').on('click ', '.imgBox button', function (e) {
        e.stopPropagation();
        $(this).parent().remove();
        $('#container').show();
    });
    $('#caishen').on('click ', '.imgBox button', function (e) {
        // e.stopPropagation();
        // var key = $(this).data('key');
        // var val = $(this).data('name');
        //
        // for (var i = 0 ; i < statueList.length ; i++ ){
        //     if(statueList[i].image_select == key && statueList[i].name == val){
        //         statueList.splice(i,1);
        //     }
        // }
        // console.log(statueList);
        //
        // $(this).parent().remove();
        // $('#container').show();
    });

    //财神像新增
    $('#addcaishenBtn').on('click',function () {
        var key = $('#addcaishen').find('.closeBtn').attr('data-key');
        console.info("key", key);
        var src = $('#addcaishen').find('img').attr('src');
        console.info("src", src);
        var val = $('#addcaishen .ticketName').val();
        console.info("val", val);

        if (key == undefined || val == "") {
            $("#wealth_index_message").css("display", "inline-block");
        } else {
            $("#wealth_index_message").css("display", "none");
            $("#addcaishenBtn").attr("data-dismiss", "modal");

            var imageBoxs = '';
            imageBoxs += '<div class="imgBox"><button type="button" data-name="'+val+'" data-key="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
            imageBoxs += '<img src="' + src + '" ><p>'+val+'</p></div>';
            $('#caishen .caishen').append(imageBoxs);

            statueList.push({
                "name":val,
                "image_select":key,
                "image_background":key,
                "statue_type":"A"
            });

            $('#ticketName').val('');
            $('#addcaishen').find('.imgBox').remove();
            $('#container').show();
            console.log(statueList);

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: 'http://' + backend_host + '/web/staff/gongfeng/statue/entity?'+token,
                data: JSON.stringify({
                    "name": val,
                    "image_select": key,
                    "image_background": key,
                    "statue_type": "A"
                }),
                dataType: 'json',
                success: function (data) {
                    console.info("data", data);
                    console.info("success");
                    success_back()
                },
                error: function (jqXHR) {
                    console.log(jqXHR);
                    console.log(jqXHR.status);
                }
            })
        }
    });


    //生肖像新增

    newQiniu(fileUploadCompleteCallback_shengxiao_add, 'container_shengxiao_add', 'addImgs_shengxiao_add', imagetokens().token,1,"jpg,jpeg,gif,png");

    var statueList_shengxiao = [];
    function fileUploadCompleteCallback_shengxiao_add(key, src) {
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-key="' + key + '" class="close closeBtn" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#container_shengxiao_add').hide();

        $('#container_shengxiao_add').before(imageBoxs);
    }
    function caishenCloseBtn_shengxiao_add(id) {
        $('#'+id).on('mousemove ', '.imgBox', function () {
            $(this).find('button').css('display', 'block');
        });
        $('#'+id).on('mouseout ', '.imgBox', function () {
            $(this).find('button').css('display', 'none');
        });
    }
    caishenCloseBtn_shengxiao_add('addshengxiao');

    $('#addshengxiao').on('click ', '.imgBox button', function (e) {
        e.stopPropagation();
        $(this).parent().remove();
        $('#container_shengxiao_add').show();
    });

    $('#addshengxiaoBtn').on('click',function () {
        var key = $('#addshengxiao').find('.closeBtn').attr('data-key');
        console.info("key", key);
        var src = $('#addshengxiao').find('img').attr('src');
        console.info("src", src);
        var val = $('#addshengxiao .ticketName').val();
        console.info("val", val);

        if (key == undefined || val == "") {
            $("#wealth_index_message_sheng_xiao").css("display", "inline-block");
        } else {
            $("#wealth_index_message_sheng_xiao").css("display", "none");
            $("#addshengxiaoBtn").attr("data-dismiss", "modal");

            var imageBoxs = '';
            imageBoxs += '<div class="imgBox"><button type="button" data-name="'+val+'" data-key="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
            imageBoxs += '<img src="' + src + '" ><p>'+val+'</p></div>';
            $('#chinese_sheng_xiao .sheng-xiao-xiang').append(imageBoxs);

            statueList_shengxiao.push({
                "name":val,
                "image_select":key,
                "image_background":key,
                "statue_type":"B"
            });

            $('#ticketName_shengxiao').val('');
            $('#addshengxiao').find('.imgBox').remove();
            $('#container_shengxiao_add').show();
            console.log(statueList);

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: 'http://' + backend_host + '/web/staff/gongfeng/statue/entity?'+token,
                data: JSON.stringify({
                    "name": val,
                    "image_select": key,
                    "image_background": key,
                    "statue_type": "B"
                }),
                dataType: 'json',
                success: function (data) {
                    console.info("data", data);
                    console.info("success");
                    //todo
                    // success_back()
                },
                error: function (jqXHR) {
                    console.log(jqXHR);
                    console.log(jqXHR.status);
                }
            })
        }
    });


    //music
    var musicKey = '';
    newQiniu(audioFileUploadCompleteCallback, 'musics', 'music', imagetokens().token,7,'mp3');

    function audioFileUploadCompleteCallback(key, src){
        var musicBoxs = '';
        musicBoxs += '<div class="imgBox"><button type="button" data-key="' + key + '" class="close musicBtn" data-dismiss="alert" aria-hidden="true">删除</button>';
        musicBoxs += '<audio  controls="controls" src="' + src + '"></audio>';
        musicKey = key ;
        $('#music').hide();
        $('#music').before(musicBoxs);
    }

    $('#backgroundMusic').on('click ', '.imgBox button', function (e) {
        e.stopPropagation();
        var key = $(this).attr('data-key');
        musicKey = '';
        $(this).parent().remove();
        $('#music').show();
    })


    newQiniu(FileUploadCompleteCallback_caishenxiang, 'container_edit', 'addImgs_edit', imagetokens().token,1,"jpg,jpeg,gif,png");

    function FileUploadCompleteCallback_caishenxiang(key, src){
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-key="' + key + '" class="close closeBtn" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#container_edit').hide();

        $('#container_edit').before(imageBoxs);
    }


    $.ajax({
        type:'GET',
        url:'http://' + backend_host + '/web/staff/gongfeng/statue/collection?'+token,
        dataType:'json',
        contentType:'application/json',
        success:function(data){
            console.log(data);
            var imageBoxs = '';
            var imageBoxs_shengxiao = '';
            for(var i =0;i<data.statue_caisheng_list.length;i++){
                // imageBoxs += '<div class="imgBox" ><button type="button" data-name="'+data.statue_caisheng_list[i].name+'" data-key="' + data.statue_caisheng_list[i].image_background + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<div class="imgBox" ><img src="http://' + backend_host +'/other/file/' + data.statue_caisheng_list[i].image_background +'?'+token+ '" ><p><span id="'+data.statue_caisheng_list[i].id+'">'+data.statue_caisheng_list[i].name+'</span>';
                imageBoxs += '<button type="button" class="btn btn-default pushTopBtn edit-caishenxiang" id='+data.statue_caisheng_list[i].image_background+'><a data-toggle="modal" data-target="#editorcaishen">编辑</a></button></p></div>';
                statueList.push({
                    "name":data.statue_caisheng_list[i].name,
                    "image_select":data.statue_caisheng_list[i].image_background,
                    "image_background":data.statue_caisheng_list[i].image_background,
                    "statue_type":"A"
                })
            }
            for(var a =0;a<data.statue_animal_list.length;a++){
                // imageBoxs += '<div class="imgBox" ><button type="button" data-name="'+data.statue_caisheng_list[i].name+'" data-key="' + data.statue_caisheng_list[i].image_background + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs_shengxiao += '<div class="imgBox" ><img src="http://' + backend_host +'/other/file/' + data.statue_animal_list[a].image_background +'?'+token+ '" ><p><span id="'+data.statue_animal_list[a].id+'">'+data.statue_animal_list[a].name+'</span>';
                imageBoxs_shengxiao += '<button type="button" class="btn btn-default pushTopBtn edit-shengxiaoxiang" id='+data.statue_animal_list[a].image_background+'><a data-toggle="modal" data-target="#editorcaishen">编辑</a></button></p></div>';
                statueList_shengxiao.push({
                    "name":data.statue_animal_list[a].name,
                    "image_select":data.statue_animal_list[a].image_background,
                    "image_background":data.statue_animal_list[a].image_background,
                    "statue_type":"B"
                })
            }
            $('#caishen .caishen').html(imageBoxs);
            $('#chinese_sheng_xiao .sheng-xiao-xiang').html(imageBoxs_shengxiao);

            $(".edit-caishenxiang").click(function () {
                console.info("财神像编辑");
                var caishenxiang_name = $(this).prev().text();
                var image_background = $(this).attr("id");
                var id = $(this).prev().attr("id");
                console.info("iddds", id);
                $("#editcaishenBtn").attr("data-id", id);
                $("#wealth_index_caishenxiang_input").val(caishenxiang_name);
                var imageBoxs = '';
                imageBoxs += '<div class="imgBox"><button type="button" data-key="'+image_background+'" class="close closeBtn" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<img src="http://' + backend_host +'/other/file/'+ image_background + '?' + token + '"></div>';
                $('#container_edit').hide();

                $('#container_edit').prev().remove();
                $('#container_edit').before(imageBoxs);

                $("#fsUploadProgress_edit").on('mousemove ', '.imgBox', function () {
                    $(this).find('button').css('display', 'block');
                });

                $("#fsUploadProgress_edit").on('mouseout ', '.imgBox', function () {
                    $(this).find('button').css('display', 'none');
                });

                $("#fsUploadProgress_edit").on('click ', '.imgBox button', function (e) {
                    e.stopPropagation();
                    $(this).parent().remove();
                    $("#container_edit").show();
                });
            });

            if(data.bgm){
                var src = 'http://' + backend_host  + data.bgm + '?' + token;
                audioFileUploadCompleteCallback('bgm' , src);
                musicKey = data.bgm;
            }
            for(var i =0;i<data.statue_animal_list.length;i++){
                imageBoxs += '<div class="imgBox" ><button type="button" data-name="'+data.statue_animal_list[i].name+'" data-key="' + data.statue_animal_list[i].image_background + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<img src="http://' + backend_host +'/other/file/' + data.statue_animal_list[i].image_background +'?'+token+ '" ><p>'+data.statue_animal_list[i].name+'</p></div>';
            }
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    });

    $("#editcaishenBtn").click(function () {
        console.info("baocun");
        var name = $(this).parent().prev().find("#wealth_index_caishenxiang_input").val();
        console.info("name", name);
        var id = $(this).attr("data-id");
        console.info("id", id);
        var key =  $(this).parent().prev().find(".imgBox button").attr("data-key");
        console.info("key", key);
        var put_data = {
            "statue_list": [
                {
                    "id": id,
                    "name":name,
                    "image_select": key,
                    "image_background": key,
                    "valid": true
                }
            ]
        };
        console.info("put_data", put_data);
        if (name == "" || key == undefined) {
            errorMessage("财神像名字或图片不能为空");
        } else {
            $("#editcaishenBtn").attr("data-dismiss", "modal");
            $.ajax({
                type: 'PUT',
                contentType: 'application/json',
                url: 'http://' + backend_host + '/web/staff/gongfeng/statue/entity?' + token,
                data: JSON.stringify(put_data),
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    errorMessage("保存成功");
                    success_back();
                },
                error: function (jqXHR) {
                    console.log(jqXHR.status);
                    errorMessage("保存失败");
                    if (jqXHR.status == 406) {

                    }
                }

            })
        }
    });

    function success_back() {
        $.ajax({
            type:'GET',
            url:'http://' + backend_host + '/web/staff/gongfeng/statue/collection?'+token,
            dataType:'json',
            contentType:'application/json',
            success:function(data){
                console.log(data);
                var imageBoxs = '';
                for(var i =0;i<data.statue_caisheng_list.length;i++){
                    // imageBoxs += '<div class="imgBox" ><button type="button" data-name="'+data.statue_caisheng_list[i].name+'" data-key="' + data.statue_caisheng_list[i].image_background + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                    imageBoxs += '<div class="imgBox" ><img src="http://' + backend_host +'/other/file/' + data.statue_caisheng_list[i].image_background +'?'+token+ '" ><p><span id="'+data.statue_caisheng_list[i].id+'">'+data.statue_caisheng_list[i].name+'</span>';
                    imageBoxs += '<button type="button" class="btn btn-default pushTopBtn edit-caishenxiang" id='+data.statue_caisheng_list[i].image_background+'><a data-toggle="modal" data-target="#editorcaishen">编辑</a></button></p></div>';
                    statueList.push({
                        "name":data.statue_caisheng_list[i].name,
                        "image_select":data.statue_caisheng_list[i].image_background,
                        "image_background":data.statue_caisheng_list[i].image_background,
                        "statue_type":"A"
                    })
                }
                $('#caishen .caishen').html(imageBoxs);

                $(".edit-caishenxiang").click(function () {
                    console.info("财神像编辑");
                    var caishenxiang_name = $(this).prev().text();
                    var image_background = $(this).attr("id");
                    console.info("image_background", image_background);
                    var id = $(this).prev().attr("id");
                    console.info("iddds", id);
                    $("#editcaishenBtn").attr("data-id", id);
                    $("#wealth_index_caishenxiang_input").val(caishenxiang_name);
                    var imageBoxs = '';
                    imageBoxs += '<div class="imgBox"><button type="button" data-key="'+image_background+'" class="close closeBtn" data-dismiss="alert" aria-hidden="true">×</button>';
                    imageBoxs += '<img src="http://' + backend_host +'/other/file/'+ image_background + '?' + token + '"></div>';
                    $('#container_edit').hide();

                    $('#container_edit').prev().remove();
                    $('#container_edit').before(imageBoxs);

                    $("#fsUploadProgress_edit").on('mousemove ', '.imgBox', function () {
                        $(this).find('button').css('display', 'block');
                    });

                    $("#fsUploadProgress_edit").on('mouseout ', '.imgBox', function () {
                        $(this).find('button').css('display', 'none');
                    });

                    $("#fsUploadProgress_edit").on('click ', '.imgBox button', function (e) {
                        e.stopPropagation();
                        $(this).parent().remove();
                        $("#container_edit").show();
                    });
                });
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        });
    }




})(jQuery)