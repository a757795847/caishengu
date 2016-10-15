//切换tab
$('.newsTop button').on('click',function(){
    $('.newsTop button').addClass('btn-default').removeClass('btn-info');
    $(this).addClass('btn-info').removeClass('btn-default');
    var i = $(this).index();
    $('.showDiv').addClass('hideDiv');
    var showDiv = $('.showDiv').get(i);
    $(showDiv).removeClass('hideDiv');
})