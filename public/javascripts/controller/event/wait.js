(function($){

    // {
    //     activity_id:
    //         string *
    //         活动id
    //     poster:
    //         string *
    //         活动海报
    //     start_datetime:
    //         string *
    //         开始时间
    //     end_datetime:
    //         string *
    //         结束时间
    //     host_address:
    //         string *
    //         举办地点
    //     host:
    //         string *
    //         举办方
    //     limit_datetime:
    //         string *
    //         报名截止时间
    //     limit_person:
    //         string *
    //         报名人数上限
    //     introduction:
    //         string *
    //         简介
    //     contact_person:
    //         string *
    //         联系人
    //     contact_phone:
    //         string *
    //         联系电话
    //     state:
    //         string *
    //         申请状态
    // }

    var data = {
        'activity_id' : '123456',
        'poster':'/dsfds/fsdf/dsf.jpg',
        'start_datetime':'2016.04.04 周六 14:00',
        'end_datetime':'2016.05.04 周六 14:00',
        'host_address':'杭州市文二路华星大厦12楼',
        'host':'杭州丽云集团',
        'limit_datetime':'2016.04.10 周六 14:00',
        'limit_person':'100人',
        'introduction':'我是简介',
        'contact_person':'张经理',
        'contact_phone':'2345678',
        'state':'是'
    }
    $('#poster').attr('src',data.poster);
    $('#startDateTime').text(data.start_datetime);
    $('#endDateTime').text(data.end_datetime);
    $('#hostaddress').text(data.host_address);
    $('#host').text(data.host);
    $('#limitDateTime').text(data.limit_datetime);
    $('#limitperson').text(data.limit_person);
    $('#introduction').text(data.introduction);
    $('#contactPerson').text(data.contact_person);
    $('#contactPhone').text(data.contact_phone);
    $('#state').text(data.state);

    var btnYes = '<button type="button" class="btn btn-default btn-lg pull-right" data-toggle="modal" data-target="#myModal">拒绝</button><button type="button" class="btn btn-default btn-lg pull-right">通过</button>'

    var btnNo = '<button type="button" class="btn btn-primary btn-lg pull-right">删除</button>'

    if(data.state == '是'){
        $('.box-body:eq(0)').append(btnYes);
    }else{
        $('.box-body:eq(0)').append(btnNo);
    }


    //var url = window.location.url;
    //url = url.split('?')[1];
    $.ajax({
        type:'POST',
       // url:"http://" + backend_host + '/web/staff/activity/'+url+'?access_token=10ae0842b11080b0b6c9412773164797',
        dataType:'json',
        success:function(data){
            console.log(data);
            $('#poster').attr('src',data.poster);
            $('#startDateTime').text(data.start_datetime);
            $('#endDateTime').text(data.end_datetime);
            $('#hostaddress').text(data.host_address);
            $('#host').text(data.host);
            $('#limitDateTime').text(data.limit_datetime);
            $('#limitperson').text(data.limit_person);
            $('#introduction').text(data.introduction);
            $('#contactPerson').text(data.contact_person);
            $('#contactPhone').text(data.contact_phone);
            $('#state').text(data.state);

            var btnYes = '<button type="button" class="btn btn-default btn-lg pull-right" data-toggle="modal" data-target="#myModal">拒绝</button><button id="Yes" type="button" class="btn btn-default btn-lg pull-right">通过</button>'

            var btnNo = '<button type="button" class="btn btn-primary btn-lg pull-right">删除</button>'

            if(data.state == '是'){
                $('.box-body:eq(0)').append(btnYes);
            }else{
                $('.box-body:eq(0)').append(btnNo);
            }
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })

    $('#noBtn').on('click',function(){
        var reason = $('#myModal textarea').val();
        console.log(reason);
        $.ajax({
            type:'PUT',
            //url:'http://' + backend_host + '/web/staff/activity/'+url+'?access_token=10ae0842b11080b0b6c9412773164797',
            data:{
                'state': 'reject'
            },
            dataType:'json',
            success:function(data){
                
            }
        })
    })
})(jQuery)