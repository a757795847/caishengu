(function ($) {
    // [
    //      {
    //     user_id:
    //     string *
    //     投资人用户id
    //     investor_name:
    //     string *
    //     投资人姓名
    //     position:
    //     string *
    //     职位
    //     phone:
    //     string *
    //     联系方式
    //      }
    // ]

    var data = [
        {
            'user_id': '123456',
            'investor_name': '张三',
            'position': '投资经理',
            'phone': '12345678933'
        },
        {
            'user_id': '123456',
            'investor_name': '张三',
            'position': '投资经理',
            'phone': '12345678933'
        },
        {
            'user_id': '123456',
            'investor_name': '张三',
            'position': '投资经理',
            'phone': '12345678933'
        }
    ]

    var investors = '';
    for (var i = 0; i < data.length; i++) {
        investors += '<tr><td>'+data[i].investor_name+'</td><td>红杉资本</td><td>'+data[i].position+'</td><td>'+data[i].phone+'</td>';
        investors += '<td><span class="label label-info"><a href="/investors/detail">查看</a></span><span class="label label-info"><a href="#">通过</a></span>';
        investors += '<span class="label label-info"><a href="#" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>'
    }
    $('#wait tbody:eq(0)').html(investors);


})(jQuery)