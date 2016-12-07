newUploader(9);
var url = window.location.search.split('?')[1].split('&');
if(url[0] == 'look'){
    detailAJax();
}else if(url[0] == 'feedback'){
    detailAJax();
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
        }
    })
}

