(function($){


    var accepts = []; //批量同意需要用到的数组

    $.ajax({
        type:'GET',
        url:"http://" + backend_host + '/web/staff/finance/approve?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var moneyRun = '', moneyRuns = [];
            for(var i = 0; i< data.length; i++){
                moneyRun += '<tr><td>'+data[i].money+'</td><td>'+data[i].datetime+'</td><td>'+data[i].contact_name+'</td><td>'+data[i].apply_name+'</td>';
                moneyRun += '<td><span class="label label-info"><a class="accept" href="'+data[i].id+'">同意</a>';
                moneyRun += '</span><span class="label label-info"><a class="reject" href="'+data[i].id+'">拒绝</a></span></td></tr>';
                moneyRuns.push(data[i].id);
            }
            accepts = moneyRuns;
            $('#runList').html(moneyRun);
        },
        error:function(jqXHR){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })


    //排序图标切换
   function sorting(obj){
        var spanOpp = obj.find('span');
        if(spanOpp.hasClass('glyphicon-sort')){
            if(spanOpp.hasClass('glyphicon-sort-by-attributes-alt')){
                spanOpp.removeClass('glyphicon-sort-by-attributes-alt').addClass('glyphicon-sort-by-attributes');
            }else{
                spanOpp.removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-sort-by-attributes-alt');
            }
        }
    }
    //排序ajax
    function listAjax(url,sort){
        $.ajax({
            type:'GET',
            url:url,
            data:{
                'order_money' : sort
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                var moneyRun = '', moneyRuns = [];
                for(var i = 0; i< data.length; i++){
                    moneyRun += '<tr><td>'+data[i].money+'</td><td>'+data[i].datetime+'</td><td>'+data[i].contact_name+'</td><td>'+data[i].apply_name+'</td>';
                    moneyRun += '<td><span class="label label-info"><a class="accept" href="'+data[i].id+'">同意</a>';
                    moneyRun += '</span><span class="label label-info"><a class="reject" href="'+data[i].id+'">拒绝</a></span></td></tr>';
                    moneyRuns.push(data[i].id);
                }
                accepts = moneyRuns;
                $('#runList').html(moneyRun);
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
    var waitSorting = 'asc', dateSorting = 'asc';
    $('#approve').on('click',function(){
        sorting($(this));
        if(waitSorting == 'asc'){
            listAjax('http://' + backend_host + '/web/staff/finance/approve?'+token,waitSorting);
            waitSorting = 'des';
        }else{
            listAjax('http://' + backend_host + '/web/staff/finance/approve?'+token,waitSorting);
            waitSorting = 'asc';
        }
    });
    $('#date').on('click',function(){
        sorting($(this));
        if(dateSorting == 'asc'){
            listAjax('http://' + backend_host + '/web/staff/finance/approve?'+token,dateSorting);
            dateSorting = 'des';
        }else{
            listAjax('http://' + backend_host + '/web/staff/finance/approve?'+token,dateSorting);
            dateSorting = 'asc';
        }
    });

    //操作ajax
    function operationAjax(obj,operation){
        var href = obj.attr('href');
        console.log(href);
        $.ajax({
            type:'PUT',
            url:'http://' + backend_host + '/web/staff/finance/approve/'+href+'?'+token+'&operation='+operation,
            dataType:'json',
            success:function(data){
                console.log(data);
            },
            error:function(jqXHR,textStatus, errorThrown){
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }

    $('.accept').on('click',function(e){
        e.preventDefault();
        operationAjax($(this),'accept')
    })

    $('.reject').on('click',function(e){
        e.preventDefault();
        operationAjax($(this),'reject')
    })

})(jQuery)
