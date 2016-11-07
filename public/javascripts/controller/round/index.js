(function ($) {

    //分类
    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/quanzi/class?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var manages = '';
            for (var i = 0; i < data.length; i++) {
                if(data[i].state == true ){
                    manages += '<tr><td>'+data[i].order+'</td><td>'+data[i].class_name+'</td></tr>';
                }
            }
            $('#manage tbody:eq(0)').html(manages);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
        }
    })



    function indexAjax(tabID,state,keyword){
        var datas = {};
        if(arguments.length == 3){
            datas = {
                'state': state,
                'keyword':keyword
            }
        }else{
            datas = {
                'state': state
            }
        }
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/quanzi/entity?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(data);
                var rounds = '' , stateUrl = '';
                for (var i = 0; i < data.length; i++) {
                    if(state == 'apply'){
                        stateUrl = '/round/detail?wait&'+data[i].quanzi_id;
                    }else{
                        stateUrl = '/round/detail?out&'+data[i].quanzi_id;
                    }
                    rounds += '<tr><td>'+data[i].quanzi_name+'</td><td>'+data[i].owner+'</td><td>'+data[i].contact_phone+'</td>'
                    rounds += '<td><span class="label label-info"><a href="'+stateUrl+'">查看详情</a></span>';
                    if(state == 'apply'){
                        rounds += '<span class="label label-info"><a class="accept" href="#">通过</a></span><span class="label label-info">';
                        rounds += '<a class="reject" data-id="'+data[i].quanzi_id+'" href="#" data-toggle="modal" data-target="#myModal">拒绝</a></span></td></tr>';
                    }
                }
                tabID.html(rounds);
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }

    indexAjax($('#wait tbody:eq(0)'),'apply');
    indexAjax($('#out tbody:eq(0)'),'accepted');
    //搜索
    $('#waitSearch').on('click',function(){
        var serchText = $('#waitText').val()
        indexAjax($('#wait tbody:eq(0)'),'apply',serchText);
    })
    $('#outSearch').on('click',function(){
        var serchText = $('#outText').val()
        indexAjax($('#out tbody:eq(0)'),'accepted',serchText);
    })
    //拒绝/通过
    $('#wait tbody:eq(0)').on('click','.reject',function(event){
        var dataId = $(this).attr('data-id');
        $('#reason').on('click',function(){
            var reasonText = $('#myModal textarea').val();
            stateAjax('reject',dataId,reasonText)
            $('#myModal textarea').val('')
        })
    })
    $('#wait tbody:eq(0)').on('click','.accept',function(event){
        var dataId = $(this).attr('data-id');
        stateAjax('accept',dataId);
    })
    function stateAjax(state,dataId,reject_reason){
        var data = {
            state:state
        };
        if(arguments.length == 3){
            data = {
                'state':state,
                'reject_reason':reject_reason
            }
        }
        $.ajax({
            type:'PUT',
            url:"http://" + backend_host + '/web/staff/quanzi/entity/' + dataId +'?'+token,
            data:data,
            dataType:'json',
            success:function(data){
                console.log(data);

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }

})(jQuery)