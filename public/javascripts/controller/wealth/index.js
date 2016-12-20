(function ($) {
    var images = [], imagetoken =[];
    var shengxiaos = {
        //老鼠
        mouse:{
            name:'',
            token:''
        },
        //牛
        cattle:{
            name:'',
            token:''
        },
        //虎
        tiger:{
            name:'',
            token:''
        },
        //兔
        rabbit:{
            name:'',
            token:''
        },
        //龙
        dragon:{
            name:'',
            token:''
        },
        //蛇
        snake:{
            name:'',
            token:''
        },
        //马
        horse:{
            name:'',
            token:''
        },
        //羊
        sheep:{
            name:'',
            token:''
        },
        //猴
        monkey:{
            name:'',
            token:''
        },
        //鸡
        chicken:{
            name:'',
            token:''
        },
        //狗
        dog:{
            name:'',
            token:''
        },
        //猪
        pig:{
            name:'',
            token:''
        }
    }
    var music = '', musictoken = '';

    var shengxiao = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
    var shengxiaoId = ['mouse','cattle','tiger','rabbit','dragon','snake','horse','sheep','monkey','chicken','dog','pig']
    var chinese = '';
    for (var i=0;i<shengxiao.length;i++){
        var data = shengxiaoId[i]
        chinese += '<div class="add"><div id="'+shengxiaoId[i]+'" role="tabpanel" class="tab-pane fade in active pull-left mRight" aria-labelledby="demo-tab"><div>';
        chinese += '<div class="addImg" id="'+shengxiaoId[i]+'s"><a href="#" ><span>'+shengxiao[i]+'</span></a></div></div></div></div>'
        imagetokens(data)
    }
    $('#chinese').html(chinese);


    function imagetokens(shengxiao){
        $.ajax({
            type:'POST',
            url:'http://' + backend_host + '/other/file/apply?'+token,
            dataType:'json',
            async:false,
            success:function(data){
                if(shengxiao){
                    shengxiaos[shengxiao].name= data.file_key;
                    shengxiaos[shengxiao].token = data.token;

                }else {
                    imagetoken.push(data.token);
                    imagetoken.push(data.file_key);
                }
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
    imagetokens();
    newUploaders(3);
    $('#pickfiles').on('click',function(){
        imagetoken = [];
        imagetokens();
    })
    function newUploaders(imgNumber){
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
                    imageBoxs += '<div class="imgBox"><button type="button" data-name="'+ imagetoken[1] +'" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                    imageBoxs += '<img src="'+ Src +'"></div>'
                    $('#container').before(imageBoxs);
                    if(images.length >= imgNumber){
                        $('#pickfiles span').text('最多添加'+imgNumber+'张');
                        $('#container').hide();
                        return false;
                    }
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
    // newUploader('mouse','mouses',shengxiaos.mouse.token,shengxiaos.mouse.name,'鼠')
    // newUploader('cattle','cattles',shengxiaos.cattle.token,shengxiaos.cattle.name,'牛')
    // newUploader('tiger','tigers',shengxiaos.tiger.token,shengxiaos.tiger.name,'虎')
    // newUploader('rabbit','rabbits',shengxiaos.rabbit.token,shengxiaos.rabbit.name,'兔')
    // newUploader('dragon','dragons',shengxiaos.dragon.token,shengxiaos.dragon.name,'龙')
    // newUploader('snake','snakes',shengxiaos.snake.token,shengxiaos.snake.name,'蛇')
    // newUploader('horse','horses',shengxiaos.horse.token,shengxiaos.horse.name,'马')
    // newUploader('sheep','sheeps',shengxiaos.sheep.token,shengxiaos.sheep.name,'羊')
    // newUploader('monkey','monkeys',shengxiaos.monkey.token,shengxiaos.monkey.name,'猴')
    // newUploader('chicken','chickens',shengxiaos.chicken.token,shengxiaos.chicken.name,'鸡')
    // newUploader('dog','dogs',shengxiaos.dog.token,shengxiaos.dog.name,'狗')
    // newUploader('pig','pigs',shengxiaos.pig.token,shengxiaos.pig.name,'猪')
    function newUploader(father,child,tokens,names,shengxiao){
        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: child,
            container: father,
            uptoken: tokens,
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
                    if(imagetoken[1] != undefined){
                        images.push(imagetoken[1]);
                    }
                    var domain = up.getOption('domain');
                    var res = eval('(' + info + ')');
                    var Src = 'http://' + backend_host + '/other/file/' + res.key + '?' + token;
                    var image;
                    image = '<div class="imgBox"><button data-name="'+shengxiao+'" type="button" data-id="'+ father +'" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                    image += '<img src="'+ Src +'"></div>';
                    $('#'+child).hide()
                    $('#'+father).append(image)
                    
                    console.log(images);
                },
                'Error': function (up, err, errTip) {

                }
                ,
                'Key': function (up, file) {
                    var key = names;
                    return key
                }
            }
        });
    }
    //music
    $.ajax({
        type:'POST',
        url:'http://' + backend_host + '/other/file/apply?'+token,
        dataType:'json',
        async:false,
        success:function(data){
            musictoken = data.token;
            music = data.file_key;
            newUploader('music',musictoken,music)
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    });

    $('#chinese').on('click','.close',function () {
        var Id = $(this).attr('data-id');
        var shengxiaoname = $(this).attr('data-name');
        var chinese = '';
        var parents = $(this).parent().parent();
        //chinese += '<div><div class="addImg" id="'+Id+'"><a href="#" ><span>'+shengxiaoname+'</span></a></div></div>';
        $(this).parent().remove();
        $('#'+Id+'s').show()
        //imagetokens(Id)
        //newUploader(Id,Id+'s',shengxiaos[Id].token,shengxiaos[Id].name,shengxiaoname)
    })
    $('#fsUploadProgress').on('click','.close',function () {
        var imageName = $(this).attr('data-name');
        $(this).parent().remove();
        if(images.length == 3){
            $('#container').show();
        }
        images.splice(images.indexOf(imageName),1)

    })

})(jQuery)