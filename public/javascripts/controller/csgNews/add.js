(function ($) {

    $('#addNews').on('click',function(){
        var address = $('#address').val();

        $.ajax({
            type:'POST',
            url:"http://" + backend_host + '/web/staff/news/caishengu?'+token,
            data:{
                'image':image,
                'link':address,
                'introduction':'这页面没有这个简介表单,随便写的'
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                imgUPload(image);

                location.href = '/csg';
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

    var image = "";
    function fileUploadCompleteCallback(key, src) {
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#container').hide();

        $('#container').before(imageBoxs);

        image = key;
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

})(jQuery)


