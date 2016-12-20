newUploader(9);
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
            //location.href = '/love';
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