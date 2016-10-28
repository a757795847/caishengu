(function ($) {
    // [
    //     WebStaffNewsFinancingGetResItem {
    //     news_id:
    //     string *
    //     新闻id
    //     order:
    //     string *
    //     序号
    //     name:
    //     string *
    //     名称
    //     stage:
    //     string *
    //     轮次
    // }
    // ]

    var data = [
        {
            'news_id': '123211',
            'order': '10',
            'name': '360',
            'stage': 'B轮'
        },
        {
            'news_id': '123211',
            'order': '10',
            'name': '360',
            'stage': 'B轮'
        },
        {
            'news_id': '123211',
            'order': '10',
            'name': '360',
            'stage': 'B轮'
        },
        {
            'news_id': '123211',
            'order': '10',
            'name': '360',
            'stage': 'B轮'
        }
    ]

    var news = '';
    for (var i = 0; i < data.length; i++) {
        news += '<tr><td>'+data[i].order+'</td><td>'+data[i].name +'</td><td>'+data[i].stage+'</td>';
        news += '<td><span class="label label-info"><a href="#">删除</a></span></td></tr>';
    }
    $('#news').html(news);


})(jQuery)