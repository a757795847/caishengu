(function($){

    // {
    //     project_id:
    //         string *
    //         项目id
    //     project_name:
    //         string *
    //         项目名称
    //     project_logo:
    //         string *
    //         logo
    //     project_title:
    //         string *
    //         标题
    //     short_introduction:
    //         string *
    //         短简介
    //     loaction:
    //         string *
    //         地区
    //     project_type:
    //         string *
    //         类型
    //     introduction:
    //         string *
    //         项目详情
    //     images:
    //         [
    //             介绍图
    //             string
    //         ]
    //     appeal:
    //         string *
    //         诉求
    //     contact_address:
    //         string *
    //         联系地址
    //     website:
    //         string *
    //         官网
    //     email:
    //         string *
    //         邮箱
    //     contact_person:
    //         string *
    //         联系人
    //     contact_phone:
    //         string *
    //         联系方式
    //     state:
    //         string *
    //         申请状态
    // }

    var data = {
        'project_id' : '123456',
        'project_name':'ace',
        'project_logo':'/dsfds/fsdf/dsf.jpg',
        'project_title':'Touchjet',
        'short_introduction':'新型的课触摸式投影仪',
        'loaction':'杭州',
        'project_type':'专业工具',
        'introduction':'通过无线连接到同Android平台的移动设备，并投射屏幕内容',
        'images':[
            '/dsfds/fsdf/dsf.jpg',
            '/dsfds/fsdf/dsf.jpg',
            '/dsfds/fsdf/dsf.jpg'
        ],
        'appeal':'目前项目需要融资三千万',
        'contact_address':'杭州滨江',
        'website':'www.qq.com',
        'email':'2345678@qq.com',
        'contact_person':'张三',
        'contact_phone':'23456789',
        'state':'是'
    };
    $('#project_logo').attr('src',data.project_logo);
    $('#projectTitle').text(data.project_title);
    $('#shortIntroduction').text(data.short_introduction);
    $('#loaction').text(data.loaction);
    $('#projectType').text(data.project_type);

    var images = '';
    for (var i = 0; i<data.images.length; i++){
        images += '<img src="'+ data.images[i] +'">';
    }
    $('#images').append(images);
    $('#appeal').text(data.appeal);
    $('#contactAddress').text(data.contact_address);
    $('#website').text(data.website);
    $('#email').text(data.email);
    $('#contactPerson').text(data.contact_person);
    $('#contactPhone').text(data.contact_phone);


    var btnYes = '<button type="button" class="btn btn-default pull-right col-md-1 col-lg-1" >通过</button><button type="button" class="btn btn-default pull-right col-md-1 col-lg-1" data-toggle="modal" data-target="#myModal">拒绝</button>';

    var btnNo = '<button type="button" class="btn btn-primary pull-right col-md-1 col-lg-1" >删除</button>';

    if(data.state == '是'){
        $('.box-body:eq(0)').append(btnYes);
    }else{
        $('.box-body:eq(0)').append(btnNo);
    }



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