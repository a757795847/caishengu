
if( location.href != "http://localhost:9000/" ){
    if(localStorage.getItem('caishengu-access_token') == null){
        location.href = '/';
    }
}

$('#btn').on('click', function () {
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
        type:'POST',
        url:"http://" + backend_host + '/auth/oauth/access_token',
        data: {
            "username": username,
            "password": password,
            "grant_type": "password"
        },
        dataType:'json',
        success:function(data){
            console.log(data);
        },
        error:function(jqXHR){
            console.log(jqXHR.status);
            if(jqXHR.status == 400){

            }
        }
    })
})