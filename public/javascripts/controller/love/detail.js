(function($){

    // {
    //     images:
    //         [
    //             图片
    //             string
    //         ]
    //     name:
    //         string *
    //         项目名称
    //     money_current:
    //         string *
    //         已募集金额
    //     money_total:
    //         string *
    //         总募集金额
    //     introduction:
    //         string *
    //         简介
    // }

    var data = {
        'images':[
            '/dsfds/fsdf/dsf.jpg',
            '/dsfds/fsdf/dsf.jpg',
            '/dsfds/fsdf/dsf.jpg'
        ],
        'name':'爱心午餐项目',
        'money_current':'3000/4000',
        'money_total':'4000',
        'introduction':'贵州大凉山区的孩子们经常吃不到温暖的午餐，我们发起一个爱心午餐项目，希望给孩子们带去温暖的午餐。'
    };
    var images = '';
    for(var i = 0; i<data.images.length; i++){
        images += '<img src="'+data.images[i]+'">';
    }
    $('#images').append(images);
    $('#name').text(data.name);
    $('#moneyCurrent').text(data.money_current);
    $('#introduction').text(data.introduction);


    // $.ajax({
    //     type:'POST',
    //     url:"http://" + backend_host + '/auth/oauth/access_token',
    //     dataType:'json',
    //     success:function(data){
    //
    //     },
    //     error:function(jqXHR){
    //         if(jqXHR.status == 400){
    //
    //         }
    //     }
    // })
})(jQuery)

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
//创建上传七牛
function newUploader(imgNumber){
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
                var imageBoxs ='';
                imageBoxs += '<div class="imgBox"><button type="button" data-index="'+ imagetoken[1] +'" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<img src="'+ Src +'"></div>'
                $('#container').before(imageBoxs);
                if(images.length >= imgNumber){
                    imgNumber = imgNumber ;
                    $('#pickfiles span').text('最多添加'+imgNumber+'张');
                    uploader.destroy();
                    return false;
                }
                imagetoken = [];
                console.log(images);
            },
            'Error': function (up, err, errTip) {

            },
            'Key': function (up, file) {
                var key = imagetoken[1];
                return key
            }
        }
    });
}
newUploader(9);
$('#fsUploadProgress').on('mousemove ','.imgBox',function(){
    $(this).find('button').css('display','block');
})
$('#fsUploadProgress').on('mouseout ','.imgBox',function(){
    $(this).find('button').css('display','none');
})
function cancelImages(nub){
    $('#fsUploadProgress').on('click ','.imgBox button',function(e){
        e.stopPropagation();
        var dataIndex = $(this).attr('data-index');
        images.splice($.isArray(dataIndex,images),1);
        $(this).parent().remove();
        $('#pickfiles span').text('选择文件');
        newUploader(nub);
    })
}
cancelImages(9);
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
