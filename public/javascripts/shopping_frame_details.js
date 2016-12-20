
$(".father").on('click','span',function(){
        var Edit=$(this).html();
    console.log(Edit);
        if(Edit=="展开") {
            console.log("1");
            $(this).parent().next().css({
                "height": "90px",
                'opacity': 1,
            });
            $(this).html("收起");

        }else{
            $(this).parent().next().css({
                "height": "0",
                'opacity': 0,
            });
            $(this).html("展开");


        }





});
