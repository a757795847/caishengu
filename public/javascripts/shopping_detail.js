


$(document).ready(function () {


})

$(function () {
    var type = window.location.search;
    console.info("type", type);

    if (type == "") {
        $("#keep").on("click", function () {
            var genera_name = $("#title").val()
            console.info("genera_name", genera_name)
            $.ajax({
                type:'POST',
                contentType:'application/json',
                url:'http://'+ backend_host + '/web/staff/goods/market/class/entity?' + token,
                data: JSON.stringify({
                    "name": genera_name,

                    //todo 图片url
                    "image": ""
                }),
                dataType:'json',
                success:function(data){
                    console.log(data);
                    location.href = "/shopping/frame"
                },
                error:function(jqXHR){
                    console.log(jqXHR.status);
                    if(jqXHR.status == 406){

                    }
                }

            })
        })
    } else {
        var id = window.location.search.slice(4);
        console.info("id", id);
        $.getJSON("http://" + backend_host + '/web/staff/goods/market/class/entity?' + token + "&id=" + id,
            function (data) {
                console.log("data.name", data.name);
                $("#title").val(data.name);

                var imageBoxs = '';
                imageBoxs += '<div class="imgBox"><button type="button" data-name="" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<img src="http://'+backend_host+''+data.image+'?'+token+'"></div>';
                $('#container').hide();
                // console.log(imageBoxs);
                $('#container').before(imageBoxs);

                $("#keep").on("click", function () {
                    var genera_name = $("#title").val();
                    // console.info("genera_name", genera_name);
                    var put_data = null;
                    if (image == "") {
                        put_data = {
                            "id": id,
                            "name": genera_name,
                        }
                    } else {
                        put_data = {
                            "id": id,
                            "name": genera_name,
                            "image": image
                        }
                    }
                    $.ajax({
                        type: 'PUT',
                        contentType: 'application/json',
                        url: 'http://' + backend_host + '/web/staff/goods/market/class/entity?' + token,
                        data: JSON.stringify(put_data),
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            location.href = "/shopping/frame"
                        },
                        error: function (jqXHR) {
                            console.log(jqXHR.status);
                            if (jqXHR.status == 406) {

                            }
                        }

                    })
                });

                var addData = '';
                for (var i = 0; i < data.label_list.length; i++) {
                    addData += '<div class="input-group">';
                    addData += '<div class="input-group-btn">';
                    addData += '<button type="button" class="btn btn-default"><i class="fa fa-chain"></i></button>';
                    addData += '</div>';
                    addData += '<input type="text" class="form-control address" placeholder="二级分类名" value= '+data.label_list[i].label_name+'>';
                    addData += '<span><a href="#" data-toggle="modal" data-target="#myModal" class="shopping-frame-detail-remove">删除</a></span>';
                    addData += '<span>上</span>';
                    addData += '<span id= '+ data.label_list[i].label_id +'>下</span>';
                    addData += '<span class="shopping-detail-label-revise">修改</span>';
                    addData += '</div>';

                }
                $('.father').append(addData);


                $(".shopping-frame-detail-remove").on("click", function () {
                    var out = this;
                    $("#comfirm").on("click", function () {
                        // console.info("out", out.parentNode.parentNode);
                        $(out.parentNode.parentNode).html("")
                    })
                });

                $(".shopping-detail-label-revise").on("click", function () {
                    var label_name = $(this).prev().prev().prev().prev().val();
                    console.info("label_name", label_name);
                    var label_id = $(this).prev().attr("id");
                    console.info("label_id", label_id);
                    $.ajax({
                        type:'PUT',
                        contentType:'application/json',
                        url:'http://'+ backend_host + '/web/staff/goods/market/label/entity?' + token,
                        data: JSON.stringify({
                            "label_id": label_id,
                            "label_name": label_name,
                            "exchange_label_id": ""
                        }),
                        dataType:'json',
                        success:function(data){
                            console.log(data);
                            // location.href = "/shopping/frame"
                        },
                        error:function(jqXHR){
                            console.log(jqXHR.status);
                            if(jqXHR.status == 406){

                            }
                        }

                    })
                })
            });

        $("#addgr").css("display", "inline-block");

        $("#addgr").on("click", function () {
            var addData = '';
            addData += '<div class="input-group">';
            addData += '<div class="input-group-btn">';
            addData += '<button type="button" class="btn btn-default"><i class="fa fa-chain"></i></button>';
            addData += '</div>';
            addData += '<input type="text" class="form-control address" placeholder="二级分类名">';
            addData += '<span><a href="#" data-toggle="modal" data-target="#myModal" class="shopping-frame-detail-remove">删除</a></span>';
            addData += '<span>上</span>';
            addData += '<span>下</span>';
            addData += '<span class="shopping-detail-label-save">保存</span>';
            addData += '</div>';

            $('.father').append(addData);

            $(".shopping-frame-detail-remove").on("click", function () {
                var out = this;
                $("#comfirm").on("click", function () {
                    // console.info("out", out.parentNode.parentNode);
                    $(out.parentNode.parentNode).html("")
                })
            });

            $(".shopping-detail-label-save").on("click", function () {
                var label_name = $(this).prev().prev().prev().prev().val();
                console.info("label_name", label_name);
                $.ajax({
                    type:'POST',
                    contentType:'application/json',
                    url:'http://'+ backend_host + '/web/staff/goods/market/label/entity?' + token,
                    data: JSON.stringify({
                        "class_id": id,
                        "label_name": label_name
                    }),
                    dataType:'json',
                    success:function(data){
                        console.log(data);
                        location.href = "/shopping/frame"
                    },
                    error:function(jqXHR){
                        console.log(jqXHR.status);
                        if(jqXHR.status == 406){

                        }
                    }

                })
            })

        });
    }
});





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