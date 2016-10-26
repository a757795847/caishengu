(function($){
    $('#addClassName').on('click',function(){
        var addclass = $('#addName').val();
        $('#allClass').append('<li><button type="button" class="close">×</button><a href="#">'+addclass+'</a></li>');
        $('#addName').val('');
    });
    $('#allClass').on('click','li',function(){
        $('#allClass').find('li').removeClass('active');
        $(this).addClass('active');
    });
    $('#allClass').on('click','button',function(){
        var text = $(this).next().text();
        if(confirm('是否删除'+text+'这个分类')){
            $(this).parent().remove();
        }
    })
})(jQuery)