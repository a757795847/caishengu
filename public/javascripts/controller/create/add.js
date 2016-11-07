newUploader(1);
cancelImages(1);
$('#addNews').on('click',function(){
    var address = $('#address').val();
    var introduction = $('#introduction').val();
    imgUPload(images[0]);
    $.ajax({
        type:'POST',
        url:"http://" + backend_host + '/web/staff/news/innovation?'+token,
        data:{
            'image':images[0],
            'link':address,
            'introduction':introduction
        },
        dataType:'json',
        success:function(data){
            console.log(data);
            location.href = '/create';
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })
})
