(function($){
    //排序切换
    function sort(){
        var spanOpp = $(this).find('span');
        if(spanOpp.hasClass('glyphicon-sort')){
            if(spanOpp.hasClass('glyphicon-sort-by-attributes-alt')){
                spanOpp.removeClass('glyphicon-sort-by-attributes-alt').addClass('glyphicon-sort-by-attributes');
            }else{
                spanOpp.removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-sort-by-attributes-alt');
            }
        }
    }
    $('#wait').on('click',sort);
    $('#date').on('click',sort);
})(jQuery)