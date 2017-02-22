(function($){
    $('#ruleDate').daterangepicker();
    $('#validTime').datepicker({
        autoclose: true
    });
    // 规则
    function ruleAjax(type,datas) {
        $.ajax({
            type:type,
            url:"http://" + backend_host + '/web/staff/coupon/rule?'+token,
            contentType:'application/json',
            data:datas,
            dataType:'json',
            success:function(data){
                console.log('rule',data);
                var rule = '';
                if(type == 'GET'){
                    for(var i=0;i<data.list.length;i++){
                        rule += '<tr class="'+data.list[i].rule_id+'"><td>'+data.list[i].start_date+'--'+data.list[i].end_date+'</td><td>'+data.list[i].money+'</td><td>'+data.list[i].coupon_name+'</td>';
                        rule += '<td>'+data.list[i].remark+'</td><td><span class="label label-info"><a data-id="'+data.list[i].rule_id+'" href="#">删除</a></span></td></tr>';
                    }
                    $('#rule tbody:eq(0)').html(rule);
                }

                if(type == 'POST' ){
                    datas = JSON.parse(datas);
                    rule += '<tr class="'+datas.success_description+'"><td>'+datas.start_date+'--'+datas.end_date+'</td><td>'+datas.money+'</td><td>'+datas.ticketName+'</td>';
                    rule += '<td>'+datas.remark+'</td><td><span class="label label-info"><a data-id="'+data.success_description+'" href="#">删除</a></span></td></tr>';
                    $('#rule tbody:eq(0)').append(rule);
                    empty();
                }
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
    ruleAjax('GET');

    // 优惠券
    function ticketListAjax() {
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/coupon/collection?'+token,
            dataType:'json',
            success:function(data){
                console.log(data);
                var ticket = '',ruleTicket = '';
                for(var i=0;i<data.list.length;i++){
                    ticket += '<tr class="'+data.list[i].id+'"><td><img src="http://' + backend_host+data.list[i].image+'?'+token+'" alt=""></td><td>'+data.list[i].name+'</td><td>'+data.list[i].remark+'</td>';
                    ticket += '<td></td><td><span class="label label-info"><a data-id="'+data.list[i].id+'" href="#">删除</a></span></td></tr>';
                    ruleTicket += '<option data-remark="'+data.list[i].remark+'" class="'+data.list[i].id+'" data-id="'+data.list[i].id+'">'+data.list[i].name+'</option>';
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
        });
    }
    ticketListAjax()


    //投放
    function castAjax(datas) {
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/coupon/record/issue?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(data);
                var record = '', onThrow = '';
                for(var i=0;i<data.list.length;i++){
                    record += '<tr><td>'+data.list[i].issue_datetime+'</td><td>'+data.list[i].coupon_name+'</td>';
                    record += '<td>'+data.list[i].user+'</td><td>'+data.list[i].contact_phone+'</td><td>已核销/未核销</td></tr>';

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
        });
    }
    castAjax()

    $('#recordSearch').on('click',function(){
        var recordText = $('#recordText').val();
        castAjax({
            'keyword':recordText
        })
        // $.ajax({
        //     type:'GET',
        //     url:"http://" + backend_host + '/web/staff/coupon/record/issue?'+token,
        //     data:{
        //         'keyword':recordText
        //     },
        //     dataType:'json',
        //     success:function(data){
        //         console.log(data);
        //
        //     },
        //     error:function(jqXHR){
        //         if(jqXHR.status == 400){
        //
        //         }
        //         if(jqXHR.status == 401){
        //             overdueToken()
        //         }
        //     }
        // })
    });

    //删除
    function ruleDeleteAjax(dataId,url){
        $.ajax({
            type:'DELETE',
            url:"http://" + backend_host + '/web/staff/coupon/'+url+'/'+dataId+'?'+token,
            dataType:'json',
            success:function(data){ 
                console.log(data);
                $('#rule').find('.'+dataId).remove();
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
        ticketOperationAjax('DELETE',{},dataId);
    })
    $('#rule tbody:eq(0)').on('click','a',function(){
        var dataId = $(this).attr('data-id');
        ruleDeleteAjax(dataId,'rule');
    })
    //上传图片

    newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token,1,"jpg,jpeg,gif,png");

    var images = '';
    function fileUploadCompleteCallback(key, src) {

        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#container').before(imageBoxs);
        images = key;
        console.log(images);
        $('#container').hide();

    }
    $('#fsUploadProgress').on('mousemove ', '.imgBox', function () {
        $(this).find('button').css('display', 'block');

    })
    $('#fsUploadProgress').on('mouseout ', '.imgBox', function () {
        $(this).find('button').css('display', 'none');
    })
    $('#fsUploadProgress').on('click ', '.imgBox button', function (e) {
        e.stopPropagation();
        images = '';
        $(this).parent().remove();
        $('#container').show();
    })

    //新增
    $('#ticketAdd').on('click',function(){
        var ticketName = $('#ticketName').val();
        var remarkVal = $('#remark').val();
        var expireDate = $('#validTime').val();
        var datas = {
            'name':ticketName,
            'image':images,
            'remark':remarkVal,
            'expire_date':expireDate
        };
        datas = JSON.stringify(datas);
        // 192.168.1.100:9000
        ticketOperationAjax('POST',datas)

    })
    function ticketOperationAjax(type,datas,id) {
        var url = 'http://'+backend_host+'/web/staff/coupon/entity?'+token;

        if(type == 'DELETE' && id){

            url = 'http://'+backend_host+'/web/staff/coupon/entity/'+id+'?'+token;
        }
        $.ajax({
            type:type,
            url:url,
            data:datas,
            contentType:'application/json',
            dataType:'json',
            success:function(data){
                console.log(data)
                if(type == 'POST'){
                    imgUPload(images);
                    images = '';
                    var ticket = '',ruleTicket = '';

                    ticket += '<tr class="'+id+'"><td><img src="http://' + backend_host+datas.expireDate+'?'+token+'" alt=""></td><td>'+datas.ticketName+'</td><td>'+datas.remarkVal+'</td>';
                    //有问题
                    ticket += '<td></td><td><span class="label label-info"><a data-id="'+data.success_description+'" href="#">删除</a></span></td></tr>';

                    ruleTicket += '<option data-remark="'+datas.remark+'" class="'+id+'" data-id="'+data.success_description+'">'+datas.ticketName+'</option>';

                    $('#ticket tbody:eq(0)').append(ticket);
                    $('#couponId').append(ruleTicket);
                    empty()
                }else if(type == 'DELETE'){
                    $('#ticket tbody:eq(0)').find('.'+id).remove();
                    $('#couponId').find('.'+id).remove();
                }

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
    $('#ruleAdd').on('click',function(){
        var ruleDate = $('#ruleDate').val().split('-');
        var ruleMoney = $('#ruleMoney').val();
        var couponId = $('#couponId option:selected').attr('data-id');
        var ticketName = $('#couponId option:selected').val();
        var remark = $('#couponId option:selected').attr('data-remark')
        ruleDate[0] = ruleDate[0].trim().replace(/(\/)/g,'-');
        ruleDate[1] = ruleDate[1].trim().replace(/(\/)/g,'-');
        var datas = {
            'start_date':ruleDate[0],
            'end_date':ruleDate[1],
            'money':ruleMoney,
            'coupon_id':couponId,
            'ticketName':ticketName,
            'remark':remark
        };
        datas = JSON.stringify(datas);
        ruleAjax('POST',datas);
    })
    $('#ruleCancel').on('click',empty);
    $('#ticketCancel').on('click',empty);
    function empty() {
        $('#fsUploadProgress').find('.imgBox').remove();
        $('#container').show();
        $('#ticketName').val('');
        $('#validTime').val('');
        $('#remark').val('');
        $('#ruleMoney').val('');
    }
    
    
    
})(jQuery)