(function($){
    
    var url = window.location.search.split('?')[1].split('&');

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/activity/'+url[1]+'?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);

            $('#poster').attr('src','http://' + backend_host +data.poster+'?'+token);
            $('#startDateTime').text(data.start_datetime);
            $('#endDateTime').text(data.end_datetime);
            $('#hostAddress').text(data.host_address);
            $('#host').text(data.host);
            $('#limitDateTime').text(data.limit_datetime);
            $('#limitPerson').text(data.limit_person);
            $('#introduction').text(data.introduction);
            $('#contactPerson').text(data.contact_person);
            $('#contactPhone').text(data.contact_phone);
            $('#state').text(data.state);
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
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })

    $('#noBtn').on('click',function(){
        var reason = $('#myModalWait textarea').val();
        stateAjax('reject',reason);
        $('#myModalWait textarea').val('');
    })
    $('#yesBtn').on('click',function(){
        stateAjax('accept');
    })
    function stateAjax(dataId,state,reject_reason){
        var dataUrl = 'http://' + backend_host + '/web/staff/activity/'+dataId+'?'+token+'&state='+state;
        if(arguments.length == 3){
            dataUrl += '&reject_reason='+reject_reason;
        }
        console.log(dataUrl);
        $.ajax({
            type:'PUT',
            url:dataUrl,
            dataType:'json',
            success:function(data){
                console.log(data);
                $('#myModalWait textarea').val('');
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
    $('#colseBtn').on('click',function(){

    })
})(jQuery)