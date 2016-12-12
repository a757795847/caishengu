(function($){
    var url = window.location.search.split('?')[1].split('&');

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/project/'+url[1]+'?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
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
            if(jqXHR.status == 401){
                overdueToken()
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
    function stateAjax(dataId,state,reject_reason){
        var dataUrl = 'http://' + backend_host + '/web/staff/project/'+dataId+'?'+token+'&state='+state;
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