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
    }
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
    $('#addcaishenBtn').on('click',function () {
        var key = $('#addcaishen').find('.closeBtn').attr('data-key');
        var src = $('#addcaishen').find('img').attr('src');
        var val = $('#addcaishen .ticketName').val();

        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="'+val+'" data-key="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '" ><p>'+val+'</p></div>';
        $('#caishen .caishen').append(imageBoxs);

        statueList.push({
            "name":val,
            "image_select":key,
            "image_background":key,
            "statue_type":"A"
        })

        $('#ticketName').val('');
        $('#addcaishen').find('.imgBox').remove();
        $('#container').show();
        console.log(statueList)
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
                imageBoxs += '<div class="imgBox" ><img src="http://' + backend_host +'/other/file/' + data.statue_caisheng_list[i].image_background +'?'+token+ '" ><p><span>'+data.statue_caisheng_list[i].name+'</span>';
                imageBoxs += '<button type="button" class="btn btn-default pushTopBtn"><a href="#"  data-toggle="modal" data-target="#editorcaishen">编辑</a></button></p></div>';
                statueList.push({
                    "name":data.statue_caisheng_list[i].name,
                    "image_select":data.statue_caisheng_list[i].image_background,
                    "image_background":data.statue_caisheng_list[i].image_background,
                    "statue_type":"A"
                })
            }
            $('#caishen .caishen').html(imageBoxs);
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




})(jQuery)