
if( location.href != "http://localhost:9000/" ){
    if(localStorage.getItem('caishengu-access_token') == null){
        location.href = '/';
    }
}

$('#btn').on('click', function (e) {
    var  username = $('#username').val();
    var password = $('#password').val();
    $.post("http://" + backend_host + '/auth/oauth/access_token',
        {
            "username": username,
            "password": password,
            "grant_type": "password"
        }, function (data) {
            location.href= '/admin';
            localStorage.setItem('caishengu-access_token', data.access_token);
        })
})