var detailUrl = window.location.search.split('?')[1].split('&');
if(detailUrl[0] == 'edit' ){
    $.ajax({
        type:'GET',
        url:"http://" + backend_host +'/web/staff/goods/virtual/entity/'+detailUrl[1]+'?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var imageBoxs = '',mageChange = '';
            for(var i=0;i<data.images.length;i++){
                imageChange = data.images[i].split('/')[3];
                imageBoxs += '<div class="imgBox"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<img src="http://' + backend_host +data.images[i]+'?'+token+'"></div>';
                images.push(imageChange);
            }
            if(data.images.length < 2){
                newUploader(1);
            }else{
                $('#pickfiles span').text('最多添加'+2+'张');
            }
            $('#container').before(imageBoxs);
            $('#title').val(data.title);
            $('#priceCoin').val(data.price_coin);
            $('#pricePoint').val(data.price_point);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })
    cancelImages(1);
    $('#saveGoods').on('click',function(){
        changeDetailAjax('http://' + backend_host + '/web/staff/goods/virtual/entity/'+detailUrl[1]+'?'+token,true);
    })
    $('#closeGoods').on('click',function(){
        changeDetailAjax('http://' + backend_host + '/web/staff/goods/virtual/entity/'+detailUrl[1]+'?'+token,false);
    })
}else if(detailUrl[0] == 'add'){

    $('#saveGoods').on('click',function(){
        var title = $('#title').val();
        var priceCoin = $('#priceCoin').val();
        var pricePoint = $('#pricePoint').val();
        $.ajax({
            type:'POST',
            url:'http://' + backend_host + '/web/staff/goods/virtual?'+token,
            data:{
                'class_id':detailUrl[1],
                'images': images,
                'title':title,
                'price_point': pricePoint,
                'price_coin': priceCoin,
                'introduction': 'sdd大厦sadas'
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                //location.href = '/tribute/frame';
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    })

}

function changeDetailAjax(url,frame){
    var title = $('#title').val();
    var priceCoin = $('#priceCoin').val();
    var pricePoint = $('#pricePoint').val();
    $.ajax({
        type:'PUT',
        url:url,
        data:{
            'images': images,
            'title':title,
            'price_point': pricePoint,
            'price_coin': priceCoin,
            'introduction': 'sddsadas',
            'valid':frame
        },
        dataType:'json',
        success:function(data){
            console.log(data);
            location.href = '/tribute/frame';
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })
}
