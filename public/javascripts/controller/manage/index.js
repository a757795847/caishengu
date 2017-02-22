(function ($) {

    function indexAjax(tabID,datas,pageState){
        $.ajax({
            type:'GET',
            url:"http://" + backend_host + '/web/staff/finance/manage/shop/collection?'+token,
            data : datas,
            contentType:'application/json',
            dataType:'json',
            success:function(data){
                console.log(data);
                var manages = '';
                for (var i = 0; i < data.list.length; i++) {
                    manages += '<tr><td>'+data.list[i].shop_id+'</td><td>'+data.list[i].shop_name+'</td><td>'+data.list[i].contact_person+'</td>';
                    manages += '<td><span class="label label-info"><a href="/manage/details?'+data.list[i].shop_id+'">查看</a></span></td></tr>'
                }
                $('#'+tabID+' tbody:eq(0)').html(manages);
                if( pageState == 1){
                    $('#'+tabID+' .pagination').pagination({
                        count: data.item_total, //总数
                        size:10, //每页数量
                        index: 1,//当前页
                        lrCount: 3,//当前页左右最多显示的数量
                        lCount: 1,//最开始预留的数量
                        rCount: 1,//最后预留的数量
                        callback: function (options) {
                            var index = options.index -1;
                            if(datas.keyword){
                                indexAjax(tabID, {'status':datas.status,'page_total':true,'page':index,'keyword':datas.keyword})
                            }else{
                                indexAjax(tabID, {'status':datas.status,'page_total':true,'page':index})
                            }
                            //options.count = 300;
                            //return options;
                        },
                    });
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
    }
    indexAjax('all',{'page_total':true},1);
    indexAjax('wait',{'page_total':true,'state':'apply'},1);
    indexAjax('out',{'page_total':true,'state':'underway'},1);

    $('#export').on('click',function () {
        var val = $('#all .exportName').val();
        location.href = "http://" + backend_host + '/web/staff/finance/manage/shop/entity/history/collection/output?'+token+"&shop_id="+val;

    })
    $('#waitSearchBtn').on('click',function () {
        var val = $('#wait').find('input').val();
        indexAjax('wait',{'page_total':true,'state':'apply','keyword':val},1);
    })
    $('#outSearchBtn').on('click',function () {
        var val = $('#out').find('input').val();
        indexAjax('out',{'page_total':true,'state':'underway','keyword':val},1);
    })

})(jQuery)