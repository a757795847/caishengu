newUploader(9);
newUpbrowse(9);
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
$("#boxInfo").on("click",'.out',function(){
    $(this).parent().parent().remove();

});
    var sub="";
$(".btn.btn-default.add").on("click",function(){
     sub= '<tr></tr><td> <i class="glyphicon glyphicon-plus"></i></td>';
     sub += '<td> <input type="text" class="form-control" value="红色"></td>';
     sub += '<td><input type="text" class="form-control" ></td>';
     sub += ' <td> <input type="text" class="form-control" value="大"></td>';
     sub += ' <td> <input type="text" class="form-control" value="1"></td>';
     sub += ' <td> <input type="text" class="form-control" value="10"></td>';
     sub += ' <td> <input type="text" class="form-control" value="10"></td>';
     sub += ' <td> <button class="btn btn-default out">删除</button></td></tr>';

    console.log(sub);
$(".table.no-margin").find('tbody').append(sub);
    
});
