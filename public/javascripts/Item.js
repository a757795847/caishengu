$("#Away").click(function(){
   $("[name='yoursuggest']").val("");


});

$("#reject").click(function(){
    var sub=$(".rejectFrame").css("display","block");
console.log(sub);


});

$("img").each(function(){
        $(this).click(function(){
            var falg = true;
           if(falg){
               falg = false;
               $(this).height("250px");
               $(this).width("200px");


           }else{
               $(this).height("50px");
               $(this).width("40px");



           }

        });


});
