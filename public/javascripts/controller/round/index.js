(function ($) {

    // [
    //     WebStaffQuanziGetResItem {
    //     quanzi_id:
    //     string *
    //     圈子id
    //     quanzi_name:
    //     string *
    //     圈子名称
    //     owner:
    //     string *
    //     圈主
    //     contact_phone:
    //     string *
    //     联系方式
    //     state:
    //     string *
    //     可用状态
    // }
    // ]


    var data = [
        {
            'quanzi_id': '123456',
            'quanzi_name': '我是圈子名称',
            'owner': '张三',
            'contact_phone': '12345678933',
            'state': '是',
        },
        {
            'quanzi_id': '123456',
            'quanzi_name': '我是圈子名称',
            'owner': '张三',
            'contact_phone': '12345678933',
            'state': '是',
        },
        {
            'quanzi_id': '123456',
            'quanzi_name': '我是圈子名称',
            'owner': '张三',
            'contact_phone': '12345678933',
            'state': '是',
        },
        {
            'quanzi_id': '123456',
            'quanzi_name': '我是圈子名称',
            'owner': '张三',
            'contact_phone': '12345678933',
            'state': '是',
        }
    ]

    var wait = '';
    for (var i = 0; i < data.length; i++) {
        if(data[i].state == '是'){
            wait += '<tr><td>'+data[i].quanzi_name+'</td><td>'+data[i].owner+'</td><td>'+data[i].contact_phone+'</td><td><span class="label label-info"><a href="/round/wait">查看详情</a></span>';
            wait += '<span class="label label-info"><a href="#">通过</a></span><span class="label label-info">';
            wait += '<a href="#" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>';
        }
    }
    $('#wait tbody:eq(0)').html(wait);




    // [分类
    //     WebStaffQuanziClassGetResItem {
    //     class_id:
    //     string *
    //     圈子类别id
    //     class_name:
    //     string *
    //     圈子类别名称
    //     state:
    //     string
    //     是否可用 (valid/invalid)
    // }
    // ]

    var data2 = [
        {
            'class_id': '1',
            'class_name': '创业板块',
            'state': '是'
        },
        {
            'class_id': '2',
            'class_name': '创业板块',
            'state': '否'
        },
        {
            'class_id': '3',
            'class_name': '创新板块',
            'state': '是'
        },
    ]

    var manages = '';
    for (var i = 0; i < data2.length; i++) {
        if(data2[i].state == '是'){
            manages += '<tr><td>'+data2[i].class_id+'</td><td>'+data2[i].class_name+'</td></tr>';
        }
    }
    $('#manages').html(manages);


})(jQuery)