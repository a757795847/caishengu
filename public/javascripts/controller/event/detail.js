(function($){
    
    var url = window.location.search.split('?')[1].split('&');

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/activity/'+url[1]+'?'+token,
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

            var btnYes = '<button type="button" class="btn btn-default btn-lg pull-right" data-toggle="modal" data-target="#myModal">拒绝</button>';
                btnYes += '<button id="yesBtn" type="button" class="btn btn-default btn-lg pull-right">通过</button>';
            console.log(btnYes)
            var btnNo = '<button id="colseBtn" type="button" class="btn btn-primary btn-lg pull-right">删除</button>';

            if(url[1] == 'abc'){
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
            url:'http://' + backend_host + '/web/staff/activity/'+url+'?'+token,
            data:{
                'state': 'reject'
            },
            dataType:'json',
            success:function(data){
                
            }
        })
    })
})(jQuery)