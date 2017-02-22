(function ($) {
    var url = window.location.search.split('?')[1].split('&');
    $('#reservation').daterangepicker({
        opens:'left',
        drops:'down'
    });
    function clickBtn(id) {
        $('#'+id).on('mousemove ', '.imgBox', function () {
            $(this).find('button').css('display', 'block');

        })
        $('#'+id).on('mouseout ', '.imgBox', function () {
            $(this).find('button').css('display', 'none');
        })
    }
    newQiniu(fileUploadCompleteCallback, 'containerLogo', 'addLogo', imagetokens().token,1,"jpg,jpeg,gif,png");

    var imagesLogo = '';

    function fileUploadCompleteCallback(key, src) {
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#containerLogo').hide();

        $('#containerLogo').before(imageBoxs);

        imagesLogo = key;
        console.info("fileUploadCompleteCallback", key)
    }

    $('#fsUploadProgress1').on('click ', '.imgBox button', function (e) {
        e.stopPropagation();
        imagesLogo = '';
        $(this).parent().remove();
        $('#containerLogo').show();
    })
    clickBtn('fsUploadProgress1','containerLogo')

    newQiniu(introduceUploadCompleteCallback, 'container2', 'addImgs', imagetokens().token,1,"jpg,jpeg,gif,png");

    var introduceImage = '';

    function introduceUploadCompleteCallback(key, src) {
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#container2').hide();

        $('#container2').before(imageBoxs);

        introduceImage = key;
    }
    clickBtn('fsUploadProgress2','container2')

    $('#fsUploadProgress2').on('click ', '.imgBox button', function (e) {
        e.stopPropagation();
        introduceImage = '';
        $(this).parent().remove();
        $('#container2').show();
    })

    $('#addBorrow').on('click',function(){
        var location = $('#location').val();
        var class_level1_id = $('#classLevel1Id').val();
        var class_level2_id = $('#classLevel2Id').val();
        var stage_id = $('#stageId').val();
        var financing_date = $('#reservation').val();
        var stage_id2 = $('#stageId2').val();
        var money = $('#money').val();

        var datas = {//没有简介
            'logo':imagesLogo,
            'location':location,
            'class_level1_id':class_level1_id,
            'class_level2_id':class_level2_id,
            'stage_id':stage_id,
            'financing_date':'2015-12-22',
            'financing_organization':'红杉资本',
            'images':introduceImage,
            'history':{
                'financing_date':financing_date,
                'stage_id':stage_id2,
                'money':money
            }
        };

        $.ajax({
            type:'POST',
            url:"http://" + backend_host + '/web/staff/news/financing?'+token,
            contentType:'application/json',
            dataType:'json',
            data:JSON.stringify(datas),
            success:function(data){
                console.log(data);
                imgUPload(imageLogo)
                imgUPload(introduceImage)

            },
            error:function(jqXHR){
                if(jqXHR.status == 400){

                }
            }
        })
    })

    //下拉列表
    financingAjax($('#stageId2'));
    financingAjax($('#stageId'));
    function financingAjax(financingId){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/other/definition/financing?'+token,
            dataType:'json',
            success:function(data){
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
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }
    industryAjax($('#classLevel1Id'));
    industryAjax($('#classLevel2Id'));
    function industryAjax(industry){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/other/definition/industry?'+token,
            dataType:'json',
            success:function(data){
                var stageList = '';
                for(var i = 0; i<data.length;i++){
                    stageList += '<option>'+data[i].name+'</option>';
                    //if()选中状态
                }
                industry.html(stageList);
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


})(jQuery)