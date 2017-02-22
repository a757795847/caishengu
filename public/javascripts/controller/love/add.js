newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token,1,"jpg,jpeg,gif,png");
var images = [];
function fileUploadCompleteCallback(key, src) {

    var imageBoxs = '';
    imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
    imageBoxs += '<img src="' + src + '"></div>';
    $('#container').hide();
    $('#container').before(imageBoxs);
    images.push(key);
    console.log(images);

}
$('#fsUploadProgress').on('mousemove ', '.imgBox', function () {
    $(this).find('button').css('display', 'block');

})
$('#fsUploadProgress').on('mouseout ', '.imgBox', function () {
    $(this).find('button').css('display', 'none');
})
$('#fsUploadProgress').on('click ', '.imgBox button', function (e) {
    e.stopPropagation();
    images = [];
    $(this).parent().remove();
    $('#container').show();
})
$('#loveAdd').on('click',function(){
    var loveName = $('#name').val();
    var loveMoney = $('#loveMoney').val();
    var introduction = $('#introduction').val();
    var datas =  {
        'images':images,
        'name':loveName,
        'money_total':loveMoney,
        'introduction':introduction
    };
    datas = JSON.stringify(datas);
    console.log(datas);
    $.ajax({
        type:'POST',
        contentType:"application/json",
        url:'http://'+backend_host+'/web/staff/donate?'+token,
        data:datas,
        dataType:'json',
        success:function(data){
            console.log(data);
            for(var i=0;i<images.length;i++){
                imgUPload(images[i]);
            }
            location.href = '/love';
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