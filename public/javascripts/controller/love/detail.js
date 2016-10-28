(function($){

    // {
    //     images:
    //         [
    //             图片
    //             string
    //         ]
    //     name:
    //         string *
    //         项目名称
    //     money_current:
    //         string *
    //         已募集金额
    //     money_total:
    //         string *
    //         总募集金额
    //     introduction:
    //         string *
    //         简介
    // }

    var data = {
        'images':[
            '/dsfds/fsdf/dsf.jpg',
            '/dsfds/fsdf/dsf.jpg',
            '/dsfds/fsdf/dsf.jpg'
        ],
        'name':'爱心午餐项目',
        'money_current':'3000/4000',
        'money_total':'4000',
        'introduction':'贵州大凉山区的孩子们经常吃不到温暖的午餐，我们发起一个爱心午餐项目，希望给孩子们带去温暖的午餐。'
    };
    var images = '';
    for(var i = 0; i<data.images.length; i++){
        images += '<img src="'+data.images[i]+'">';
    }
    $('#images').append(images);
    $('#name').text(data.name);
    $('#moneyCurrent').text(data.money_current);
    $('#introduction').text(data.introduction);


    // $.ajax({
    //     type:'POST',
    //     url:"http://" + backend_host + '/auth/oauth/access_token',
    //     dataType:'json',
    //     success:function(data){
    //
    //     },
    //     error:function(jqXHR){
    //         if(jqXHR.status == 400){
    //
    //         }
    //     }
    // })
})(jQuery)