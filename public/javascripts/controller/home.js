$(document).ready(function(){
    //切换tab
    $('.newsTop button').on('click',function(){
        $('.newsTop button').addClass('btn-default').removeClass('btn-info');
        $(this).addClass('btn-info').removeClass('btn-default');
        var i = $(this).index();
        $('.showDiv').addClass('hideDiv');
        var showDiv = $('.showDiv').get(i);
        $(showDiv).removeClass('hideDiv');
    })

// 切换大图
    var thisImg ;
    $('.smallImg').on('click',function(){
        $('.smallImg').css({height:"30px",width:"30px"});
        if($(this).index() != thisImg ){
            $(this).animate({height:"300px",width:"300px"});
        }
        thisImg = $(this).index();
    })

})
