function imagetokens() {
    var result = null;
    $.ajax({
        type: 'POST',
        url: 'http://' + backend_host + '/other/file/apply?' + token,
        dataType: 'json',
        async: false,
        success: function (data) {

            /*imagetoken.push(data.token);
            imagetoken.push(data.file_key);*/
            result = data;
            console.log("imagetokens", data)
        },
        error: function (jqXHR) {
            if (jqXHR.status == 400) {

            }
        }
    });
    return result;
}

function newQiniu(completeCallback, browse_button, container, file_token) {
    return Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: browse_button, //'container',
        container: container,// 'addImgs',
        uptoken: file_token,
        unique_names: false,
        multi_selection: false,
        max_file_size: '3mb',
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
                console.info("FileUploaded", up, file, info);
                var key = JSON.parse(info).key;
                //images = imagetoken[1];
                //var domain = up.getOption('domain');
                //var res = eval('(' + info + ')');

                var src = 'http://' + backend_host + '/other/file/' + key + '?' + token;
                completeCallback(key, src);
            },
            'Error': function (up, err, errTip) {

            }
            ,
            'Key': function (up, file) {
                var key = imagetokens().file_key;
                console.info("Key.function: file_key" + key);
                return key;
            }
        }
    });
}

//   通知图片上传成功
function imgUPload(imgId) {
    $.ajax({
        type: 'PUT',
        url: 'http://' + backend_host + '/other/file/' + imgId + '?' + token,
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log(data);
        },
        error: function (jqXHR) {
            if (jqXHR.status == 400) {

            }
        }
    })
}

