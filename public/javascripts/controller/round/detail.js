(function($){
    var stateUrl = window.location.search.split('?')[1].split('&');
    if(stateUrl[0] == 'apply'){
        detailAjax(stateUrl[1]);
        $('#apply').css('display','block');
        $('#reject').on('click',function(){
            var reasonText = $('#myModalWait textarea').val();
            stateAjax({'state':'reject','reject_reason':reasonText});
        })
        $('#accept').on('click',function(event){
            var dataId = $(this).attr('data-id');
            stateAjax({'state':'accept'});
        })

    }else if(stateUrl[0] == 'underway'){
        detailAjax(stateUrl[1]);
        $('#underway').css('display','block');
        $('#invalid').on('click',function () {
            classAjax('invalid');
        });
        $('#valid').on('click',function () {
            classAjax('valid');
        })
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
                        if(jqXHR.status == 401){
                            overdueToken()
                        }
                    }
                })
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

    function stateAjax(datas){
        $.ajax({
            type:'PUT',
            url:"http://" + backend_host + '/web/staff/quanzi/entity/' + stateUrl[1] +'?'+token,
            data:datas,
            dataType:'json',
            success:function(data){
                console.log(data);
                 $('#myModal textarea').val('')
            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    }

    function classAjax(valid){
        $.ajax({
            type:'PUT',
            url:"http://" + backend_host + '/web/staff/quanzi/class?' + token +'&class_id='+stateUrl[1]+'&valid='+valid,
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