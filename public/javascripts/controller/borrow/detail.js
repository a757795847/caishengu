(function ($) {
    // var url = window.location.search.split('?')[1].split('&');
    // if(url[0] == 'add'){
    //     $('#addBorrow').on('click',function(){
    //         var location = $('#location').val();
    //         var class_level1_id = $('#classLevel1Id').val();
    //         var class_level2_id = $('#classLevel2Id').val();
    //         var stage_id = $('#stageId').val();
    //         var financing_date = $('#reservation').val();
    //         var stage_id2 = $('#stageId2').val();
    //         var money = $('#money').val();
    //
    //         console.log(location);
    //         console.log(class_level1_id);
    //         console.log(class_level2_id);
    //         console.log(stage_id);
    //         console.log(financing_date);
    //         console.log(stage_id2);
    //         console.log(money);
    //         $.ajax({
    //             type:'GET',
    //             url:"http://" + backend_host + '/web/staff/news/financing/'+url[1]+'?'+token,
    //             dataType:'json',
    //             data:{//没有简介
    //                 'logo':'suibianxiede',
    //                 'location':location,
    //                 'class_level1_id':class_level1_id,
    //                 'class_level2_id':class_level2_id,
    //                 'stage_id':stage_id,
    //                 'images':['suibianxiede'],
    //                 'history':{
    //                     'financing_date':financing_date,
    //                     'stage_id':stage_id2,
    //                     'money':money
    //                 }
    //             },
    //             success:function(data){
    //                 console.log(data);
    //
    //             },
    //             error:function(jqXHR){
    //                 if(jqXHR.status == 400){
    //
    //                 }
    //             }
    //         })
    //     })
    // }else if(url[0] == 'change'){
    //     $('#addBorrow').on('click',function(){
    //         var location = $('#location').val();
    //         var class_level1_id = $('#classLevel1Id').val();
    //         var class_level2_id = $('#classLevel2Id').val();
    //         var stage_id = $('#stageId').val();
    //         var financing_date = $('#reservation').val();
    //         var stage_id2 = $('#stageId2').val();
    //         var money = $('#money').val();
    //
    //         console.log(location);
    //         console.log(class_level1_id);
    //         console.log(class_level2_id);
    //         console.log(stage_id);
    //         console.log(financing_date);
    //         console.log(stage_id2);
    //         console.log(money);
    //
    //     })
    //
    //
    //     $.ajax({
    //         type:'GET',
    //         url:"http://" + backend_host + '/web/staff/news/financing/'+url[1]+'?'+token,
    //         dataType:'json',
    //     // {
    //     //     logo:
    //     //         string *
    //     //         logo
    //     //     location:
    //     //         string *
    //     //         地区
    //     //     class_level1_id:
    //     //         string *
    //     //         所属大类id
    //     //     class_level2_id:
    //     //         string *
    //     //         所属小类id
    //     //     stage_id:
    //     //         string *
    //     //         当前轮次id
    //     //     images:
    //     //         [
    //     //             介绍图片
    //     //             string
    //     //         ]
    //     //     history:
    //     //         [
    //     //             融资历史
    //     //             WebStaffNewsFinancingPostReqHistory {
    //     //             financing_date:
    //     //             string *
    //     //             时间
    //     //             stage_id:
    //     //             string *
    //     //             轮次id
    //     //             money:
    //     //             string *
    //     //             金额
    //     //         }
    //     //         ]
    //     // }
    //         success:function(data){
    //             console.log(data);
    //             var news = '';
    //             for (var i = 0; i < data.length; i++) {
    //                 news += '<tr><td>'+data[i].order+'</td><td>'+data[i].name +'</td><td>'+data[i].stage+'</td>';
    //                 news += '<td><span class="label label-info"><a href="/borrow/detail?change&'+data[i].news_id+'">编辑</a></span>'
    //                 news += '<span class="label label-info"><a class="delete" data-id="'+data[i].news_id+'" href="#">删除</a></td></tr>';
    //             }
    //             $('#news').html(news);
    //         },
    //         error:function(jqXHR){
    //             if(jqXHR.status == 400){
    //
    //             }
    //         }
    //     })
    // }
    financingAjax()
    function financingAjax(financingId){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/other/definition/financing?'+token,
            dataType:'json',
            success:function(data){
                console.log(data);
                var stageList = '';
                for(var i = 0; i<data.length;i++){
                    stageList += '<option>'+data[i].name+'</option>';
                    //if()选中状态
                }
                financingId.html(stageList);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }

})(jQuery)