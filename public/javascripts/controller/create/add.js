var uploader1 = newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token,1,"jpg,jpeg,gif,png");
//var uploader2 = newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token);
var images = "";
function fileUploadCompleteCallback(key, src) {
    var imageBoxs = '';
    imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
    imageBoxs += '<img src="' + src + '"></div>';
    $('#container').hide();

    $('#container').before(imageBoxs);

    images = key;
    console.info("fileUploadCompleteCallback", key)
}

$('#fsUploadProgress').on('mousemove ', '.imgBox', function () {
    $(this).find('button').css('display', 'block');

})
$('#fsUploadProgress').on('mouseout ', '.imgBox', function () {
    $(this).find('button').css('display', 'none');
})
$('#fsUploadProgress').on('click ', '.imgBox button', function (e) {

    e.stopPropagation();
    var dataName = $(this).attr('data-name');
    images = '';
    $(this).parent().remove();
    $('#container').show();
})

$('#addNews').on('click', function () {
    var address = $('#address').val();
    var introduction = $('#introduction').val();
    imgUPload(images);
    $.ajax({
        type: 'POST',
        url: "http://" + backend_host + '/web/staff/news/innovation?' + token,
        data: {
            'image': images,
            'link': address,
            'introduction': introduction
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            location.href = '/create';
        },
        error: function (jqXHR) {
            if (jqXHR.status == 400) {

            }
            if (jqXHR.status == 401) {
                overdueToken()
            }
        }
    })
})
