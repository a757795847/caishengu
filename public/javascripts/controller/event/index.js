(function ($) {

    // [
    //     WebStaffActivityGetResItem {
    //     activity_id:
    //     string *
    //     活动id
    //     activity_name:
    //     string *
    //     活动名称
    //     contact_person:
    //     string *
    //     联系人
    //     contact_phone:
    //     string *
    //     联系方式
    //     apply_state:
    //     string *
    //     申请状态
    // }
    // ]


    var data = [
        {
            'activity_id': '123456',
            'activity_name': '我是活动动动11',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'apply_state': '是',
        },
        {
            'activity_id': '123456',
            'activity_name': '我是活动动动22',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'apply_state': '是',
        },
        {
            'activity_id': '123456',
            'activity_name': '我是活动动动33',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'apply_state': '是',
        },
        {
            'activity_id': '123456',
            'activity_name': '我是活动动动44',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'apply_state': '是',
        },
        {
            'activity_id': '123456',
            'activity_name': '我是活动动动1',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'apply_state': '否',
        },
        {
            'activity_id': '123456',
            'activity_name': '我是活动动动2',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'apply_state': '否',
        },
        {
            'activity_id': '123456',
            'activity_name': '我是活动动动3',
            'contact_person': '张三',
            'contact_phone': '12345678933',
            'apply_state': '否',
        }
    ]

    var wait = '', out = '';
    for (var i = 0; i < data.length; i++) {
        if(data[i].apply_state == '否'){
            wait += '<tr><td>'+data[i].activity_name+'</td><td>'+data[i].contact_person+'</td><td>'+data[i].contact_phone+'</td><td><span class="label label-info"><a href="/event/wait">查看详情</a></span>';
            wait += '<span class="label label-info"><a href="#">通过</a></span>';
            wait += '<span class="label label-info"><a href="#" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>';
        }else{
            out += '<tr><td>'+data[i].activity_name+'</td><td>'+data[i].contact_person+'</td><td>'+data[i].contact_phone+'</td><td><span class="label label-info"><a href="/event/out">查看详情</a></span>';
            out += '</td><td>张三</td><td>2014-04-04 12:32:32</td></tr>'
        }
    }
    $('#wait tbody:eq(0)').html(wait);
    $('#out tbody:eq(0)').html(out);

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
                var wait = '';
                for (var i = 0; i < data.length; i++) {
                    wait += '<tr><td>'+data[i].activity_name+'</td><td>'+data[i].contact_person+'</td><td>'+data[i].contact_phone+'</td><td><span class="label label-info">';
                    if(data[i].apply_state == '否'){
                        wait += '<a href="/event/wait">查看详情</a></span><span class="label label-info"><a href="#">通过</a></span>';
                        wait += '<span class="label label-info"><a href="#" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>';
                    }else{
                        wait += '<a href="/event/out">查看详情</a></span>';
                        wait += '</td><td>张三</td><td>2014-04-04 12:32:32</td></tr>'
                    }
                }
                tabID.html(wait);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }
    indexAjax($('#wait tbody:eq(0)'),'apply');
    indexAjax($('#out tbody:eq(0)'),'accepted');

})(jQuery)