(function($){
    var detailUrl = window.location.search.split('?')[1].split('&');
    if(detailUrl[0] == 'edit' ){
        var imgaes = []
        $.ajax({
            type:'GET',
            url:"http://" + backend_host +'/web/staff/goods/virtual/entity/'+detailUrl[1]+'?'+token,
            dataType:'json',
            success:function(data){
                console.log(data);
                var detailImg = '';
                for(var i=0; i <data.images.length;i++){
                    detailImg += '<img src="http://' + backend_host +data.images[i]+'?'+token+'">';
                    imgaes.push(data.images[i]);
                }
                $('#detailImg').html(detailImg);
                $('#title').val(data.title);
                $('#priceCoin').val(data.price_coin);
                $('#pricePoint').val(data.price_point);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
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
                    'images': ['dfasdfa'],
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
        var srImg = imgaes[0].split('/').pop();
        var title = $('#title').val();
        var priceCoin = $('#priceCoin').val();
        var pricePoint = $('#pricePoint').val();
        $.ajax({
            type:'PUT',
            url:url,
            data:{
                'images': [srImg],
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

})(jQuery)