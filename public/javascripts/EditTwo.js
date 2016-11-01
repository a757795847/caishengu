$("#Btnfifa").click(function(){
    if($('#echo').is(':hidden')){
        $('#echo').show();
    }
    else{
        $('#echo').hide();
    }


});
$("#clear").click(function(){
    $("#echo input").val("");



});

$(function () {


    //Date picker
    $('#datepicker').datepicker({
        autoclose: true
    });
    $('#Kobe').datepicker({
        autoclose: true
    });
});
