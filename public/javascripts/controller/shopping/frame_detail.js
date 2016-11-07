var detailUrl = window.location.search.split('?')[1].split('&');
console.log(detailUrl);
if(detailUrl.length > 1 ){
    console.log('编辑');
    if(detailUrl[0] == 'frame'){
        $('#nav').text('商品详情');
        $('#exchange').text('财神币');
        $('#priceCoin').attr('placeholder','金额');
        detailUrl[0] = 'market';
        console.log(detailUrl);
        if(detailUrl[1] != undefined){
            $('#container').show();
            detailAjax(detailUrl[1],9);
            cancelImages(9);
            $('#saveGoods').on('click',function(){
                for(var i=0;i<images.length;i++){
                    imgUPload(images[i]);
                }
                changeDetailAjax(true);
            })
            $('#closeGoods').on('click',function(){
                changeDetailAjax(false);
            })
        }
    }else{
        $('#nav').text('门票详情');
        detailAjax(detailUrl[1],2);
        cancelImages(2);
        $('#exchange').text('积分');
        $('#priceCoin').attr('placeholder','积分');
        if(detailUrl[1] != undefined){
            $('#container').hide();
            detailAjax(detailUrl[1]);
            $('#saveGoods').on('click',function(){
                changeDetailAjax(true);
            })
        }
    }
}else{
    console.log('新建');
    detailUrl = detailUrl[0];
    $('#saveGoods').on('click',function(){
        var title = $('#title').val();
        var priceMoney = $('#priceMoney').val();
        var priceCoin = $('#priceCoin').val();
        var introduction = $('#introduction').val();
        $.ajax({
            type:'POST',
            url:'http://' + backend_host + '/web/staff/goods/market?'+token,
            data:{
                'class_id': detailUrl,
                'images':['dfasdfas/dfasdf'],
                'title':title,
                'price_money':priceMoney,
                'price_coin':priceCoin,
                'introduction':introduction
            },
            dataType:'json',
            success:function(data){
                console.log(data);


            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    })

}

function detailAjax(goodsId,maxImage){
    $.ajax({
        type:'GET',
        url:'http://' + backend_host + '/web/staff/goods/market/entity/'+goodsId+'?'+token,
        dataType:'json',
        success:function(data){
            var imageBoxs = '',mageChange = '';
            for(var i=0;i<data.images.length;i++){
                imageChange = data.images[i].split('/')[3];
                imageBoxs += '<div class="imgBox"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<img src="http://' + backend_host +data.images[i]+'?'+token+'"></div>';
                images.push(imageChange);
            }
            if(data.images.length < maxImage){
                newUploader(maxImage);
            }else{
                $('#pickfiles span').text('最多添加'+ maxImage +'张');
            }
            $('#container').before(imageBoxs);

            $('#title').val(data.title);
            $('#priceMoney').val(data.price_money);
            $('#priceCoin').val(data.price_coin);
            $('#introduction').val(data.introduction);


        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })
}

function changeDetailAjax(frame){
    var title = $('#title').val();
    var priceMoney = $('#priceMoney').val();
    var priceCoin = $('#priceCoin').val();
    var introduction = $('#introduction').val();
    $.ajax({
        type:'PUT',
        url:'http://' + backend_host + '/web/staff/goods/market/entity/'+detailUrl[1]+'?'+token,
        data:{
            'images':images,
            'title':title,
            'price_money': priceMoney,
            'introduction': introduction,
            'valid':frame
        },
        dataType:'json',
        success:function(data){
            console.log(data);
            location.href = '/shopping/frame';
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })
}

//    上传图片







