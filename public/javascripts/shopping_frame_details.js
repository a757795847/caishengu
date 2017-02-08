
newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token);

var image = "";
function fileUploadCompleteCallback(key, src) {
    var imageBoxs = '';
    imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
    imageBoxs += '<img src="' + src + '"></div>';
    $('#container').hide();

    $('#container').before(imageBoxs);

    image = key;
}
$('#fsUploadProgress').on('mousemove ', '.imgBox', function () {
    $(this).find('button').css('display', 'block');

})
$('#fsUploadProgress').on('mouseout ', '.imgBox', function () {
    $(this).find('button').css('display', 'none');
})
$('#fsUploadProgress').on('click ', '.imgBox button', function (e) {
    e.stopPropagation();
    var dataName = $(this).attr('data-name');
    images = '';
    $(this).parent().remove();
    $('#container').show();
})
newQiniu(fileUploadCompleteCallbacks, 'pushadd', 'imagebox', imagetokens().token);
var images = [];
function fileUploadCompleteCallbacks(key, src) {
    var imageBoxs = '';
    imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
    imageBoxs += '<img src="' + src + '"></div>';
    
    $('#pushadd').before(imageBoxs);
    images.push(key)
    console.log(images)
}
$('#imagebox').on('mousemove ', '.imgBox', function () {
    $(this).find('button').css('display', 'block');

})
$('#imagebox').on('mouseout ', '.imgBox', function () {
    $(this).find('button').css('display', 'none');
})
$('#imagebox').on('click ', '.imgBox button', function (e) {
    e.stopPropagation();
    var dataName = $(this).attr('data-name');
    $(this).parent().remove();
    $('#container').show();
    images.splice(images.indexOf(dataName),1)
    console.log(images)
})


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
