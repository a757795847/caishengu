$('#addNews').on('click',function(){
    var address = $('#address').val();
    var trends = $("#trends").val();
    var datas = {
        'title':trends,
        'link':address
    };
    datas = JSON.stringify(datas);
    console.log(datas);
    $.ajax({
        contentType: "application/json",
        type:'POST',
        url:"http://" + backend_host + '/web/staff/caishengu/trend/entity?'+token,
        data:datas,
        dataType:'json',
        success:function(data){
            console.log(data);
            location.href = '/trends';
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })
})
