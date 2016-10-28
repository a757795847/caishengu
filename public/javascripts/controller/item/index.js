(function ($) {

    // [
    //     WebStaffProjectGetResItem {
    //     project_id:
    //     string *
    //     项目id
    //     project_name:
    //     string *
    //     项目名称
    //     contact_person:
    //     string *
    //     联系人
    //     contact_phone:
    //     string *
    //     联系方式
    //     state:
    //     string *
    //     申请状态
    // }
    // ]


    var data = [
        {
            'project_id': '123456',
            'project_name': '我是项目名称',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'state': '是',
        },
        {
            'project_id': '123456',
            'project_name': '我是项目名称',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'state': '否',
        },
        {
            'project_id': '123456',
            'project_name': '我是项目名称',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'state': '否',
        },
        {
            'project_id': '123456',
            'project_name': '我是项目名称',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'state': '否',
        },
    ]

    var wait = '', out = '';
    for (var i = 0; i < data.length; i++) {
        if(data[i].state == '否'){
            wait += '<tr><td>我是项目名称</td><td>张三</td><td>12345678933</td><td><span class="label label-info"><a href="/item/wait">查看详情</a></span>';
            wait += '<span class="label label-info"><a href="#">通过</a></span><span class="label label-info">';
            wait += '<a href="#" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>';
        }else if(data[i].state == '是'){

        }

    }
    $('#wait tbody:eq(0)').html(wait);



})(jQuery)