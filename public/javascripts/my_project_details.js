
var images = [], imagetoken =[];
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
            console.log(imagetoken);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    });
}
imagetokens();
function newUploader(imgNumber) {
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'container',
        container:'addImgs',
        uptoken: imagetoken[0],
        unique_names:false,
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
                if (imagetoken[1] != undefined) {
                    images.push(imagetoken[1]);
                }
                var domain = up.getOption('domain');
                var res = eval('(' + info + ')');
                console.log(res);
                console.log(domain);
                var Src = 'http://' + backend_host + '/other/file/' + res.key + '?' + token;
                var imageBoxs = '';
                imageBoxs += '<div class="imgBox"><button type="button" data-index="' + imagetoken[1] + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<img src="' + Src + '"></div>'
                $('#container').before(imageBoxs);
                if (images.length >= imgNumber) {
                  //  imgNumber = imgNumber;
                    $('#pickfiles span').text('最多添加' + imgNumber + '张');
                    uploader.destroy();
                    return false;
                }

               // console.log(images);
            },
            'Error': function (up, err, errTip){

            }
            ,
            'Key': function (up, file) {
                var key = imagetoken[1];
                return key
            }
        }
    });
}
newUploader(4);
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
        newUploader(4);
    })
}
cancelImages(9);
