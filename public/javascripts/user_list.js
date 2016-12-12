var lost = JSON.parse(localStorage.getItem('user_list'));

var liLength = $('.sidebar .sidebar-menu .treeview').length;


// for(var i=0;i<lost.length;i++){
//     for(var j =0;j<liLength;j++){
//         if($('.sidebar .sidebar-menu .treeview').eq(j).attr('data-token') == lost[i].name){
//             $('.sidebar .sidebar-menu .treeview').eq(j).removeClass('user-list-hide');
//         }
//     }
// }

function errorMessage(text) {
    $('#error').text(text);
    $('#error').css('top','0');
    setTimeout(function () {
        $('#error').css('top','-54px');
    },1000)
}
$('#close').on('click',function () {
    overdueToken();
})

function overdueToken() {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_list');
    location.href = '/';
}