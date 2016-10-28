(function ($) {
    // [
    //     WebStaffNewsCaishenguGetResItem {
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
            'link': 'www.taobao2.com'
        },
        {
            'news_id': '123211',
            'order': '10',
            'image': '/dasd/dsad.jpg',
            'link': 'www.taobao3.com'
        },
        {
            'news_id': '123211',
            'order': '10',
            'image': '/dasd/dsad.jpg',
            'link': 'www.taobao4.com'
        },
    ]

    var news = '';
    for (var i = 0; i < data.length; i++) {
        news += '<tr><td>'+data[i].order+'</td><td><img src="'+data[i].image+'"></td><td><a href="#">'+data[i].link+'</a>';
        news += '</td><td><span class="label label-info"><a href="#">删除</a></span></td></tr>'
    }
    $('#news').html(news);


})(jQuery)