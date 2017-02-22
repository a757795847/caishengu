$('#addNews').on('click',function(){
    var address = $('#address').val();
    var title = $("#title").val();
    imgUPload(images);
    var datas = {
        'image':images,
        'title':title,
        'link':address
    };
    datas = JSON.stringify(datas);
    console.log(datas);
    $.ajax({
        contentType: "application/json",
        type:'POST',
        url:"http://" + backend_host + '/web/staff/caishengu/introduction/entity?'+token,
        data:datas,
        dataType:'json',
        success:function(data){
            console.log(data);
            imgUPload(images);
            location.href = '/introduce';
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })
})
newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token,1,"jpg,jpeg,gif,png");
var images = '';
function fileUploadCompleteCallback(key, src) {

    var imageBoxs = '';
    imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
    imageBoxs += '<img src="' + src + '"></div>';
    $('#container').hide();
    $('#container').before(imageBoxs);
    images = key;

}
$('#fsUploadProgress').on('mousemove ', '.imgBox', function () {
    $(this).find('button').css('display', 'block');

})
$('#fsUploadProgress').on('mouseout ', '.imgBox', function () {
    $(this).find('button').css('display', 'none');
})
$('#fsUploadProgress').on('click ', '.imgBox button', function (e) {
    e.stopPropagation();
    images = '';
    $(this).parent().remove();
    $('#container').show();
})
