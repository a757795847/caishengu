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
            //location.href = '/introduce';
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
