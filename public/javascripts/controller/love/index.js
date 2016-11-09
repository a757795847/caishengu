(function ($) {
    // [
    //     WebStaffDonateGetResItem {
    //     id:
    //     string *
    //     项目id
    //     title:
    //     string *
    //     标题
    //     money_current:
    //     string *
    //     已募集金额
    //     money_total:
    //     string *
    //     总募集金额
    // }
    // ]

    var data = [
        {
            'id': '123456',
            'title': '爱心午餐项目',
            'money':'3000/4000'
        },
        {
            'id': '123456',
            'title': '爱心午餐项目',
            'money':'3000/4000'
        },
        {
            'id': '123456',
            'title': '爱心午餐项目',
            'money':'3000/4000'
        },
        {
            'id': '123456',
            'title': '爱心午餐项目',
            'money':'3000/4000'
        }
    ]

    var wait = '';
    for (var i = 0; i < data.length; i++) {
        wait += '<tr><td>'+data[i].title+'</td><td>'+data[i].money+'</td>';
        wait += '<td><span class="label label-info"><a href="/love/detail">详情</a></span></td></tr>'
    }
    $('#wait tbody:eq(0)').html(wait);


})(jQuery)