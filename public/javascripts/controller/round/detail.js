(function($){

    // {
    //     quanzi_id:
    //         string *
    //         圈子id
    //     quanzi_logo:
    //         string *
    //         圈子logo
    //     quanzi_title:
    //         string *
    //         圈子标题
    //     class_name:
    //         string *
    //         圈子类别名称
    //     class_id:
    //         string *
    //         圈子类别id
    //     owner:
    //         string *
    //         圈主
    //     introduction:
    //         string *
    //         圈子简介
    // }

    var data = {
        'quanzi_id' : '123456',
        'quanzi_logo':'/dsfds/fsdf/dsf.jpg',
        'quanzi_title':'Touchjet',
        'class_name':'',
        'class_id':'',
        'owner':'张三',
        'introduction':'哇哇哇哇哇哇'
    };



    var stateUrl = window.location.search.split('?')[1].split('&');
    if(stateUrl[0] == 'wait'){
        detailAjax(stateUrl[1]);
        $('#waitBtn').css('display','block');
        $('#reason').on('click',function(){
            var reasonText = $('#myModal textarea').val();
            stateAjax('reject',stateUrl[1],reasonText)
            $('#myModal textarea').val('')
        })
        $('#accept').on('click',function(event){
            var dataId = $(this).attr('data-id');
            stateAjax('accept',stateUrl[1]);
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
    }else if(stateUrl[0] == 'out'){
        detailAjax(stateUrl[1]);
        $('#outBtn').css('display','block');
    }

    function detailAjax(dataId){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/quanzi/entity/'+dataId+'?'+token,
            dataType:'json',
            success:function(data){
                console.log(data);
                $('#quanziLogo').attr('src','http://'+backend_host+data.quanzi_logo+'?'+token);
                $('#quanziTitle').text(data.quanzi_title);
                $('#owner').text(data.owner);
                $('#introduction').text(data.introduction);
                var classState = data.class_id;
                $.ajax({
                    type:'GET',
                    url:"http://" + backend_host + '/other/definition/quanzi?'+token,
                    dataType:'json',
                    success:function(data){
                        console.log(data);
                        var classNames = '';
                        for(var i = 0; i<data.length;i++){
                            if(data[i].id == classState){
                                classNames += '<option selected="selected">'+data[i].name+'</option>';
                            }else{
                                classNames += '<option>'+data[i].name+'</option>';
                            }
                        }
                        $('#classNames').html(classNames);
                    },
                    error:function(jqXHR){
                        if(jqXHR.status == 400){

                        }
                    }
                })
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }


})(jQuery)