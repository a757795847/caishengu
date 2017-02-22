(function ($) {

    var Urls = window.location.search.split('?')[1];
    function indexAjax(id) {
        $.ajax({
            type: 'GET',
            url: "http://" + backend_host + '/web/staff/gongfeng/qian/entity?'+ token,
            dataType: 'json',
            data:{
                'id':id
            },
            success: function (data) {
                console.log(data);
                $('#qianName').val(data.qian_name)
                $('#qianPoem').val(data.qian_poem)
                $('#qianExplain').val(data.qian_explain)
                $('#link').val(data.link)
                $('#qianNumber').val(data.qian_number)
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
    if(Urls != undefined){
        indexAjax(Urls)
    }


    $('#saveBtn').on('click',function () {
        var qianName = $('#qianName').val();
        var qianPoem = $('#qianPoem').val();
        var qianExplain = $('#qianExplain').val();
        var qianNumber = $('#qianNumber').val();
        var link = $('#link').val();

        if(Urls != undefined){
            saveAjax({
                'qian_id':Urls,
                'qian_name':qianName,
                'qian_poem':qianPoem,
                'qian_explain':qianExplain,
                'link':link,
                'qian_number':qianNumber
            })
        }else{
            addAjax({
                'qian_name':qianName,
                'qian_poem':qianPoem,
                'qian_explain':qianExplain,
                'link':link,
                'qian_number':qianNumber
            })
        }
    })

    function saveAjax(datas) {
        $.ajax({
            type: 'PUT',
            url: "http://" + backend_host + '/web/staff/gongfeng/qian/entity?'+ token,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(datas),
            success: function (data) {
                console.log(data);
                location.href ='/answer';
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

    function addAjax(datas) {
        $.ajax({
            type: 'POST',
            url: "http://" + backend_host + '/web/staff/gongfeng/qian/entity?'+ token,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data:JSON.stringify(datas),
            success: function (data) {
                console.log(data);
                location.href ='/answer';
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



})(jQuery)

