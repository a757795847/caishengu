
var url = window.location.search.split('?')[1].split('&');
detailAJax();
if(url[0] == 'feedback'){
    newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token);

    var images = [];
    function fileUploadCompleteCallback(key, src) {

        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        if(images.length > 7){
            $('#container').hide();
        }
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
        var key = $(this).data('key');
        if(images.indexOf(key) == 1){
            images.splice(images.indexOf(key),1);
        }
        $(this).parent().remove();
        $('#container').show();
    })
    $('.add').css('display','block');
    $('#fileSubmit').css('display','block');
    $('#fileSubmit').on('click',function(){
        for(var i=0; i<images.length;i++){
            imgUPload(images[i]);
        }
        location.href = '/love';
    })
}
function detailAJax(){
    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/donate/'+url[1]+'?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);

            var images = '';
            if(data.images.length < 1){
                images = '<p>没有图片</p>'
            }else{
                for(var i = 0; i<data.images.length; i++){
                    images += '<img src="http://' + backend_host+data.images[i]+'?'+token+'">';
                }
            }
            $('#images').append(images);
            $('#name').text(data.name);
            $('#moneyCurrent').text(data.money_current);
            $('#introduction').text(data.introduction);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })
}

