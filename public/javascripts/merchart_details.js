/*if( location.href != "http://localhost:9000/" ){
    if(localStorage.getItem('caishengu-access_token') == null){
        location.href = '/';
    }
}*/
$("#newpage").click(function(){
    $.get("http://" + backend_host + '/web/admin/manage/shop?access_token=11a75c2681eb7ee5f0d0873ac2dfa6f1',
        function (data) {
            console.log(data);
            // location.href= '/admin';
            // localStorage.setItem('caishengu-access_token', data.access_token);
        })
});
