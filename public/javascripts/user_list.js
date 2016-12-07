
// var lost = localStorage.getItem('user_list').split(',');
// var liLength = $('.sidebar .sidebar-menu li').length;
// lost = ['statistic'];
// console.log(lost);
// for(var i=0;i<lost.length;i++){
//     for(var j =0;j<liLength;j++){
//         if($('.sidebar .sidebar-menu li').eq(j).attr('data-token') == lost[i]){
//             $('.sidebar .sidebar-menu li').eq(j).removeClass('user-list-hide');
//         }
//     }
// }


// var lostUrl = location.pathname.split('/')[1];
// for(var i=0;i<lost.length;i++){
//     if(lostUrl != lost[i]){
//         history.go(-1);
//     }
// }
function userList(permissions) {
    var lost = localStorage.getItem('user_list').split(',');
    if(lost.indexOf(permissions) == -1){
        history.go(-1)
    }
}


function errorMessage(text) {
    $('#error').text(text);
    $('#error').css('top','0');
    setTimeout(function () {
        $('#error').css('top','-54px');
    },1000)
}
