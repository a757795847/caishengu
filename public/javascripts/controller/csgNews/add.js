(function ($) {

        $('#addNews').on('click',function(){
            var address = $('#address').val();
            $.ajax({
                type:'POST',
                url:"http://" + backend_host + '/web/staff/news/caishengu?'+token,
                data:{
                    'image':'xiesi.png',
                    'link':address,
                    'introduction':'这页面没有这个简介表单,随便写的'
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