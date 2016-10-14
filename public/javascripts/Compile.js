var $tbr = $('#TableTwo tbody tr');
console.log($tbr);
var $checkItemTd = $('<td><input type="checkbox" name="checkItem" /></td>');
$tbr.append($checkItemTd);
/* $tbr.click(function(){
 $(this).find('input').click();
 });*/
$("#TableTwo input").css("marginLeft","200px");
$tbr.find('input').click(function(event) {
    /*调整选中行的CSS样式*/
    $(this).parent().parent().toggleClass('warning');

});

$("#notclick").click(function(){
    var input=$("#TableTwo input");
    for (var i=0;i<input.length ;i++ )
    {
        if(input[i].type=="checkbox") {
            input[i].checked = false;
        }

    }

    $tbr.removeClass("warning");

    /* input[i].parent().parent().toggleClass('warning');*/
});
$("#resetting").click(function(){
    $(".ps").val("");



});
