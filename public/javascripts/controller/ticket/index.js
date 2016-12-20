(function($){
    $('#ruleDate').daterangepicker();
    $('#validTime').daterangepicker();
    // 规则
    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/coupon/rule?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var rule = '';
            for(var i=0;i<data.length;i++){
                rule += '<tr><td>'+data[i].start_date+'--'+data[i].end_date+'</td><td>'+data[i].money+'</td><td>'+data[i].coupon_name+'</td>';
                rule += '<td>'+data[i].remark+'</td><td><span class="label label-info"><a data-id="'+data[i].rule_id+'" href="#">删除</a></span></td></tr>'
            }
            $('#rule tbody:eq(0)').html(rule);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })
    // 优惠券
    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/coupon/collection?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var ticket = '',ruleTicket = '';
            for(var i=0;i<data.length;i++){
                ticket += '<tr><td><img src="http://' + backend_host+data[i].image+'?'+token+'" alt=""></td><td>'+data[i].name+'</td><td>'+data[i].remark+'</td>';
                ticket += '<td></td><td><span class="label label-info"><a data-id="'+data[i].id+'" href="#">删除</a></span></td></tr>';
                ruleTicket += '<option data-id="'+data[i].id+'">'+data[i].name+'</option>'
            }
            $('#ticket tbody:eq(0)').html(ticket);
            $('#couponId').html(ruleTicket);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })

    //投放
    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/coupon/record/issue?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var record = '', onThrow = '';
            for(var i=0;i<data.length;i++){
                record += '<tr><td>'+data[i].issue_datetime+'</td><td>'+data[i].coupon_name+'</td>';
                record += '<td>'+data[i].user+'</td><td>'+data[i].contact_phone+'</td><td>已核销/未核销</td></tr>';

            }
            $('#record tbody:eq(0)').html(record);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })
    $('#recordSearch').on('click',function(){
        var recordText = $('#recordText').val();
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/coupon/record/issue?'+token,
            data:{
                'keyword':recordText
            },
            dataType:'json',
            success:function(data){
                console.log(data);

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    })

    //删除
    function deleteAjax(dataId,url){
        $.ajax({
            type:'DELETE',
            url:"http://" + backend_host + '/web/staff/coupon/'+url+'/'+dataId+'?'+token,
            dataType:'json',
            success:function(data){
                console.log(data);

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }
    $('#ticket tbody:eq(0)').on('click','a',function(){
        var dataId = $(this).attr('data-id');
        deleteAjax(dataId,'entity');
    })
    $('#rule tbody:eq(0)').on('click','a',function(){
        var dataId = $(this).attr('data-id');
        deleteAjax(dataId,'rule');
    })
    //上传图片
    var images = '', imagetoken =[];
    $('#pickfiles').on('click',function(){
        imagetoken = [];
        imagetokens();
    })
    function imagetokens(){
        $.ajax({
            type:'POST',
            url:'http://' + backend_host + '/other/file/apply?'+token,
            dataType:'json',
            async:false,
            success:function(data){
                imagetoken.push(data.token);
                imagetoken.push(data.file_key);

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        });
    }
    imagetokens();
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'container',
        container: 'addImgs',
        uptoken: imagetoken[0],
        unique_names: false,
        multi_selection: false,
        max_file_size:'3mb',
        save_key: false,
        domain: 'http://qiniu-plupload.qiniudn.com/',
        get_new_uptoken: true,
        auto_start: true,
        log_level: 5,
        filters: {
            mime_types: [
                {title: "Image files", extensions: "jpg,jpeg,gif,png"}
            ]
        },
        init: {
            'FilesAdded': function (up, files) {

            },
            'BeforeUpload': function (up, file) {

            },
            'UploadProgress': function (up, file) {

            },
            'UploadComplete': function () {

            },
            'FileUploaded': function (up, file, info) {
                images = imagetoken[1];
                var domain = up.getOption('domain');
                var res = eval('(' + info + ')');
                var Src = 'http://' + backend_host + '/other/file/' + res.key + '?' + token;
                var imageBoxs = '';
                imageBoxs += '<div class="imgBox"><button type="button" data-index="'+ imagetoken[1] +'" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<img src="'+ Src +'"></div>';
                $('#container').hide();
                $('#container').before(imageBoxs);
                imagetoken = [];
                console.log(images);
            },
            'Error': function (up, err, errTip) {

            }
            ,
            'Key': function (up, file) {
                var key = imagetoken[1];
                return key
            }
        }
    });
    $('#fsUploadProgress').on('mousemove ','.imgBox',function(){
        $(this).find('button').css('display','block');
    })
    $('#fsUploadProgress').on('mouseout ','.imgBox',function(){
        $(this).find('button').css('display','none');
    })
    cancelImages();
    function cancelImages(){
        $('#fsUploadProgress').on('click ','.imgBox button',function(e){
            e.stopPropagation();
            var dataIndex = $(this).attr('data-index');
            images = '';
            $(this).parent().remove();
            $('#container').show();
        })
    }

//   通知图片上传成功
    function imgUPload(imgId){
        $.ajax({
            type:'PUT',
            url:'http://' + backend_host + '/other/file/'+imgId+'?'+token,
            dataType:'json',
            async:false,
            success:function(data){
                console.log(data);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }
    //新增
    $('#ticketAdd').on('click',function(){
        var ticketName = $('#ticketName').val();
        var remarkVal = $('#remark').val();
        var datas = {
            'name':ticketName,
            'image':images,
            'remark':remarkVal
        };
        datas = JSON.stringify(datas);
        // 192.168.1.100:9000
        $.ajax({
            type:'POST',
            contentType:"application/json",
            url:'http://'+backend_host+'/web/staff/coupon/entity?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(data);
                imgUPload(images);
                images = '';
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    })
    $('#ruleAdd').on('click',function(){
        var ruleDate = $('#ruleDate').val().split('-');
        var ruleMoney = $('#ruleMoney').val();
        var couponId = $('#couponId option:selected').attr('data-id');
        ruleDate[0] = ruleDate[0].trim().replace(/(\/)/g,'-');
        ruleDate[1] = ruleDate[1].trim().replace(/(\/)/g,'-');
        var datas = {
            'start_date':ruleDate[0],
            'end_date':ruleDate[1],
            'money':ruleMoney,
            'coupon_id':couponId
        };
        datas = JSON.stringify(datas);
        console.log(datas);
        $.ajax({
            type:'POST',
            contentType:"application/json",
            url:'http://'+backend_host+'/web/staff/coupon/rule?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(data);
                imgUPload(images);
                images = '';
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    })
    
})(jQuery)