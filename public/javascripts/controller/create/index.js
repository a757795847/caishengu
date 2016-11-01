(function ($) {
    // [
    //     WebStaffNewsInnovationGetResItem {
    //     news_id:
    //     string *
    //     新闻id
    //     order:
    //     string *
    //     序号
    //     image:
    //     string *
    //     图片
    //     link:
    //     string *
    //     链接
    // }
    // ]

    var data = [
        {
            'news_id': '123211',
            'order': '10',
            'image': '/dasd/dsad.jpg',
            'link': 'www.taobao.com'
        },
        {
            'news_id': '123211',
            'order': '10',
            'image': '/dasd/dsad.jpg',
            'link': 'www.taobao.com'
        },
        {
            'news_id': '123211',
            'order': '10',
            'image': '/dasd/dsad.jpg',
            'link': 'www.taobao.com'
        },
        {
            'news_id': '123211',
            'order': '10',
            'image': '/dasd/dsad.jpg',
            'link': 'www.taobao.com'
        }
    ]

    var news = '';
    for (var i = 0; i < data.length; i++) {
        news += '<tr><td>'+data[i].order+'</td><td><img src="'+data[i].image+'"></td><td><a href="#">'+data[i].link+'</a>';
        news += '</td><td><span class="label label-info"><a href="#">删除</a></span></td></tr>';
    }
    $('#news').html(news);

    function indexAjax(tabID,state){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/activity?access_token=10ae0842b11080b0b6c9412773164797',
            data : {
                'state': state
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                var news = '';
                for (var i = 0; i < data.length; i++) {
                    news += '<tr><td>'+data[i].order+'</td><td><img src="'+data[i].image+'"></td><td><a href="#">'+data[i].link+'</a>';
                    news += '</td><td><span class="label label-info"><a href="#">删除</a></span></td></tr>';
                }
                $('#news').html(news);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }

})(jQuery)