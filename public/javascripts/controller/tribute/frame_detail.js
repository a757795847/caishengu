var detailUrl = window.location.search.slice(1, 2);
console.info("detailUrl", detailUrl);
if(detailUrl == 1 ){
    console.info("进入编辑1");

    var goods_id = window.location.search.slice(6);
    console.info("goods_id", goods_id);

    $("#closeGoods").css("display", "inline-block");
    $.ajax({
        type:'GET',
        url:"http://" + backend_host +'/web/staff/goods/virtual/entity?'+token + "&goods_id=" + goods_id,
        dataType:'json',
        success:function(data){
            console.log(data);
            var imageBoxs = '';
            imageBoxs += '<div class="imgBox"><button type="button" data-name="" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
            imageBoxs += '<img src="http://'+backend_host+''+data.gz_image+'?'+token+'"></div>';
            $('#container').hide();
            console.log(imageBoxs);
            $('#container').before(imageBoxs);


            var imageBoxs_shelves = '';
            imageBoxs_shelves += '<div class="imgBox"><button type="button" data-name="" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
            imageBoxs_shelves += '<img src="http://'+backend_host+''+data.hj_image+'?'+token+'"></div>';
            $('#container_shelves').hide();

            $('#container_shelves').before(imageBoxs_shelves);


            $('#title_project').val(data.name);
            $("#title_time").val(data.expire_day);
            $("#priceCoin").val(data.coin);
            $("#pricePoint").val(data.point);
            $("#shelves_number").val(data.image_grid);
            $("#introduction").val(data.remarks);
            if (data.remarks == 'none') {
                $("#introduction").val()
            } else {
                $("#introduction").val(data.remarks)
            }
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    });

    $('#saveGoods').on('click',function(){
        var title_project = $('#title_project').val();
        var title_time = $("#title_time").val();
        var priceCoin = $('#priceCoin').val();
        var pricePoint = $('#pricePoint').val();
        var textarea = $("#introduction").val();
        var shelves_number = $("#shelves_number").val();
        // changeDetailAjax('http://' + backend_host + '/web/staff/goods/virtual/entity?'+token,true);
        var data = null;
        if (image == "" && image_shelves !== "") {
            data = {
                'id': goods_id,
                'name': title_project,
                'coin': parseFloat(priceCoin),
                'point': parseFloat(pricePoint),
                'expire_day': parseFloat(title_time),
                'images': {
                    'hj_image': image_shelves
                },
                'remarks': textarea,
                'image_grid': parseFloat(shelves_number)
            }
        } else if (image !== "" && image_shelves == "") {
            data = {
                'id': goods_id,
                'name': title_project,
                'coin': parseFloat(priceCoin),
                'point': parseFloat(pricePoint),
                'expire_day': parseFloat(title_time),
                'images': {
                    'gz_image': image,
                },
                'goods_description': textarea,
                'image_grid': parseFloat(shelves_number)
            }
        } else if(image == "" && image_shelves == "") {
            data = {
                'id': goods_id,
                'name': title_project,
                'coin': parseFloat(priceCoin),
                'point': parseFloat(pricePoint),
                'expire_day': parseFloat(title_time),
                'goods_description': textarea,
                'image_grid': parseFloat(shelves_number)
            }
        } else {
            data = {
                'id': goods_id,
                'name': title_project,
                'coin': parseFloat(priceCoin),
                'point': parseFloat(pricePoint),
                'expire_day': parseFloat(title_time),
                'goods_description': textarea,'images': {
                    'gz_image': image,
                    'hj_image': image_shelves
                },
                'image_grid': parseFloat(shelves_number)
            }
        }
        console.info("修改后的数据", data);
        $.ajax({
            type:'PUT',
            url:'http://' + backend_host + '/web/staff/goods/virtual/entity?'+token,
            data:JSON.stringify(data),
            dataType:'json',
            contentType:'application/json',
            success:function(data){
                // console.log(data);
                location.href = '/tribute/frame';
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    });

    $(".tribute-frame-detail-remove").click(function () {
        $("#comfirm").click(function () {
            $.ajax({
                type:'DELETE',
                contentType:'application/json',
                url:'http://'+ backend_host + '/web/staff/goods/virtual/entity?' + token + "&goods_id=" + goods_id,
                data:{},
                dataType:'json',
                success:function(data){
                    // console.log(data);
                    location.href = "/tribute/frame"
                },
                error:function(jqXHR){
                    console.log(jqXHR.status);
                    if(jqXHR.status == 406){

                    }
                }

            })
        })
    })
}else {
    console.info("进入新增");

    var class_id = window.location.search.slice(6);
    console.info("class_id", class_id);
    $('#saveGoods').on('click',function(){
        var title_project = $('#title_project').val();
        var title_time = $("#title_time").val();
        var priceCoin = $('#priceCoin').val();
        var pricePoint = $('#pricePoint').val();
        var textarea = $("#introduction").val();
        var shelves_number = $("#shelves_number").val();

        if (image == "" || image_shelves == "" || title_project == "" || !/^[0-9]*[1-9][0-9]*$/.test(title_time) || title_time == "" ||
            !/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(priceCoin) || priceCoin == "" || !/^[0-9]*[1-9][0-9]*$/.test(pricePoint) || pricePoint == "" ||
            !/^[0-9]*[1-9][0-9]*$/.test(shelves_number) || shelves_number == "" || textarea == "") {
            if (image == "") {
                $("#tribute_frame_detail_gz_img").css("display", "inline-block");
            } else {
                $("#tribute_frame_detail_gz_img").css("display", "none");
            }

            if (image_shelves == "") {
                $("#tribute_frame_detail_hj_img").css("display", "inline-block");
            } else {
                $("#tribute_frame_detail_hj_img").css("display", "none");
            }

            if (title_project == "") {
                $("#tribute_frame_detail_name").css("display", "inline-block");
            } else {
                $("#tribute_frame_detail_name").css("display", "none");
            }

            if (!/^[0-9]*[1-9][0-9]*$/.test(title_time) || title_time == "") {
                $("#tribute_frame_detail_hint").css("display", "inline-block");
            } else {
                $("#tribute_frame_detail_hint").css("display", "none");
            }

            if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(priceCoin) || priceCoin == "") {
                $("#tribute_frame_detail_coin").css("display", "inline-block");
            } else {
                $("#tribute_frame_detail_coin").css("display", "none");
            }

            if (!/^[0-9]*[1-9][0-9]*$/.test(pricePoint) || pricePoint == "") {
                $("#tribute_frame_detail_point").css("display", "inline-block");
            } else {
                $("#tribute_frame_detail_point").css("display", "none");
            }

            if (!/^[0-9]*[1-9][0-9]*$/.test(shelves_number) || shelves_number == "") {
                $("#tribute_frame_detail_shelves_number").css("display", "inline-block");
            } else {
                $("#tribute_frame_detail_shelves_number").css("display", "none");
            }

            if (textarea == "") {
                $("#tribute_frame_detail_textarea").css("display", "inline-block");
            } else {
                $("#tribute_frame_detail_textarea").css("display", "none");
            }
        } else {
            $("#tribute_frame_detail_gz_img").css("display", "none");
            $("#tribute_frame_detail_hj_img").css("display", "none");
            $("#tribute_frame_detail_name").css("display", "none");
            $("#tribute_frame_detail_hint").css("display", "none");
            $("#tribute_frame_detail_coin").css("display", "none");
            $("#tribute_frame_detail_point").css("display", "none");
            $("#tribute_frame_detail_shelves_number").css("display", "none");
            $("#tribute_frame_detail_textarea").css("display", "none");
            $.ajax({
                type: 'POST',
                url: 'http://' + backend_host + '/web/staff/goods/virtual/entity?' + token,
                data: JSON.stringify({
                    'class_id': class_id,
                    'name': title_project,
                    'coin': parseFloat(priceCoin),
                    'point': parseFloat(pricePoint),
                    'expire_day': parseFloat(title_time),
                    'gz_image': image,
                    'hj_image': image_shelves,
                    'goods_description': textarea,
                    'image_grid': parseFloat(shelves_number)
                }),
                dataType: 'json',
                contentType:'application/json',
                success: function (data) {
                    console.log(data);
                    location.href = '/tribute/frame';
                },
                error: function (jqXHR) {
                    if (jqXHR.status == 400) {

                    }
                    if (jqXHR.status == 401) {
                        overdueToken()
                    }
                }
            });

            imgUPload(image);
            imgUPload(image_shelves);
        }
    })


}


newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token,1,"jpg,jpeg,gif,png");

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


newQiniu(fileUploadCompleteCallback_shelves, 'container_shelves', 'addImgs_shelves', imagetokens().token,1,"jpg,jpeg,gif,png");

var image_shelves = "";
function fileUploadCompleteCallback_shelves(key, src) {
    var imageBoxs = '';
    imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
    imageBoxs += '<img src="' + src + '"></div>';
    $('#container_shelves').hide();

    $('#container_shelves').before(imageBoxs);

    image_shelves = key;
}
$('#fsUploadProgress_shelves').on('mousemove ', '.imgBox', function () {
    $(this).find('button').css('display', 'block');

})
$('#fsUploadProgress_shelves').on('mouseout ', '.imgBox', function () {
    $(this).find('button').css('display', 'none');
})
$('#fsUploadProgress_shelves').on('click ', '.imgBox button', function (e) {
    e.stopPropagation();
    var dataName = $(this).attr('data-name');
    images_shelves = '';
    $(this).parent().remove();
    $('#container_shelves').show();
})