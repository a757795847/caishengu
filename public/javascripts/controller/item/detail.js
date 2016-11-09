(function($){
    var url = window.location.search.split('?')[1].split('&');

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/project/'+url[1]+'?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
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

            $('#noBtn').attr('data-id',data.activity_id);
            $('#yesBtn').attr('data-id',data.activity_id);
            $('#colseBtn').attr('data-id',data.activity_id);

            if(url[0] == 'apply'){
                $('#apply').css('display','block');
            }else{
                $('#underway').css('display','block');
            }
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })

    $('#noBtn').on('click',function(){
        var reason = $('#myModalWait textarea').val();
        stateAjax('reject',reason);
    })
    $('#yesBtn').on('click',function(){
        stateAjax('accept');
    })
    function stateAjax(state,reject_reason){
        var datas = {};
        if(arguments.length == 1){
            datas = {
                'state':state
            }
        }else{
            datas = {
                'state':state,
                'reject_reason':reject_reason
            }
        }
        // $.ajax({
        //     type:'PUT',
        //     url:"http://" + backend_host + '/web/staff/project/'+url[1]+'?'+token,
        //     data:datas,
        //     dataType:'json',
        //     success:function(data){
        //         console.log(data);
        //         $('#myModalWait textarea').val('');
        //     },
        //     error:function(jqXHR){
        //         if(jqXHR.status == 400){
        //
        //         }
        //     }
        // })
    }
    $('#colseBtn').on('click',function(){

    })



})(jQuery)