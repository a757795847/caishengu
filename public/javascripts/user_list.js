var lost = localStorage.getItem('user_list').split(',');

var liLength = $('.sidebar .sidebar-menu .treeview').length;


for(var i=0;i<lost.length;i++){
    for(var j =0;j<liLength;j++){
        if($('.sidebar .sidebar-menu .treeview').eq(j).attr('data-token') == lost[i]){
            $('.sidebar .sidebar-menu .treeview').eq(j).removeClass('user-list-hide');
        }
    }
}



function errorMessage(text) {
    $('#error').text(text);
    $('#error').css('top','0');
    setTimeout(function () {
        $('#error').css('top','-54px');
    },1000)
}
$('#close').on('click',function () {
    localStorage.removeItem('user_list');
    location.href = '/';
})