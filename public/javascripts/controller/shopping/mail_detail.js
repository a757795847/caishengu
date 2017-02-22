(function ($) {

    var Urls = window.location.search.split('?')[1];
    var provinceList = [];
    function indexAjax(data) {
        $.ajax({
            type: 'GET',
            url: "http://" + backend_host + '/web/staff/postage/entity?'+ token,
            dataType: 'json',
            data:data,
            success: function (data) {
                console.log(data);
                var province = ['香港特别行政区','澳门特别行政区','北京市','上海市','天津市','重庆市','台湾','广东省','江苏省','山东省','浙江省','河南省','四川省',
                    '河北省','湖北省','湖南省','辽宁省','福建省','安徽省','陕西省','内蒙古自治区','广西壮族自治区','江西省','黑龙江省','吉林省','云南省','山西省',
                    '贵州省','新疆维吾尔自治区','甘肃省','海南省','宁夏回族自治区','西藏自治区','青海省'];
                var mailTbody = '';
                for(var i=0;i<data.province_list.length;i++){
                    mailTbody += '<tr><th data-id="'+data.province_list[i].province_id+'">'+data.province_list[i].province_name+'</th><th><input type="text" value="'+data.province_list[i].first_weight+'">元</th>';
                    mailTbody += '<th><input type="text" value="'+data.province_list[i].second_weight+'">元</th></tr>'
                    provinceList.push({
                        'province_id': data.province_list[i].province_id,
                        'province_name':data.province_list[i].province_name,
                        'first_weight':data.province_list[i].first_weight,
                        'second_weight':data.province_list[i].second_weight
                    })
                }
                $('#mailTbody').html(mailTbody);
                $("#first").val(data.default_first_weight);
                $("#second").val(data.default_second_weight);
                $("#modelID").val(data.name);
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
    if( Urls != undefined){
        indexAjax({
            "postage_id":Urls
        })
    }


    $.ajax({
        type: 'GET',
        url: "http://" + backend_host + '/other/definition/district?'+ token+'&level=0',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var provincesHtml = '';
            for (var i =0;i<data.length;i++){
                provincesHtml +='<option data-id="'+ data[i].id +'" >'+ data[i].name +'</option>'
            }
            $('#provinces').html(provincesHtml)
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    });

    $('#addProvinces').on('click',function () {
        var name = $('#provinces').val();
        var id = Number($('#provinces').find("option:selected").data('id'));
        var firstWeight = Number($('#addFirstWeight').val())
        var secondWeight = Number($('#addSecondWeight').val())
        var mailTbody = '<tr><th>'+name+'</th><th><input type="text" value="'+firstWeight+'">元</th><th><input type="text" value="'+secondWeight+'">元</th></tr>';
        $('#mailTbody').append(mailTbody);
        provinceList.push({
            'province_id': id,
            'province_name':name,
            'first_weight':firstWeight,
            'second_weight':secondWeight
        })
    })

    $('#saveGoods').on('click',function () {
        var name = $('#modelID').val()
        var firstWeight = Number($('#first').val());
        var secondWeight = Number($('#second').val());
        if(Urls != undefined){
            changeAjax({
                'id':Urls,
                'name':name,
                'default_first_weight':firstWeight,
                'default_second_weight':secondWeight,
                'province_list': provinceList
            })
        }else{
            addAjax({
                'name':name,
                'default_first_weight':firstWeight,
                'default_second_weight':secondWeight,
                'province_list': provinceList
            })
        }


    })
    function addAjax(datas) {
        $.ajax({
            type: 'POST',
            url: "http://" + backend_host + '/web/staff/postage/entity?'+ token,
            data:JSON.stringify(datas),
            contentType:"application/json; charset=UTF-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                location.href ='/shopping/mail';
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
    function deleteAjax(id) {
        $.ajax({
            type: 'DELETE',
            url: "http://" + backend_host + '/web/staff/postage/entity?'+ token+'&template_id='+id,
            contentType:"application/json; charset=UTF-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                location.href ='/shopping/mail';
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
    function changeAjax(datas) {
        $.ajax({
            type: 'PUT',
            url: "http://" + backend_host + '/web/staff/postage/entity?'+ token,
            data:JSON.stringify(datas),
            contentType:"application/json; charset=UTF-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                location.href ='/shopping/mail';
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

    $('#closeGoods').on('click',function () {
        if(Urls != undefined){
            deleteAjax(Urls)
        }
    })


})(jQuery)

