(function ($) {

    $('#addNews').on('click',function(){
        var address = $('#address').val();
        var introduction = $('#introduction').val();
        $.ajax({
            type:'POST',
            url:"http://" + backend_host + '/web/staff/news/innovation?'+token,
            data:{
                'image':'xiesi.png',
                'link':address,
                'introduction':introduction
            },
            dataType:'json',
            success:function(data){
                console.log(data);

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    })


})(jQuery)