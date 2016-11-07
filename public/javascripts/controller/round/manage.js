(function ($) {
   
    $('#addClass').on('click',function(){
        var newClassName = $('#roundClass').val();
        $.ajax({
            type:'POST',
            url:"http://" + backend_host + '/web/staff/quanzi/class?'+token,
            data:{
                'class_name':newClassName
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