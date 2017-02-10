/*
(function($){

    $('#tributeClass').on('click','li',function(){
        $('#tributeClass li').removeClass('active');
        $(this).addClass('active');
        var hrefUrl = $(this).find('a').attr('data-id');
        $('#tributeAddDetail').attr('href','/tribute/frame/detail?add&' + hrefUrl );
        tributeList('http://' + backend_host + '/web/staff/goods/virtual?'+ token +'&class_id='+hrefUrl);
        $('#searchGoods').attr('data-id',hrefUrl);
    })
    //分类
    $.ajax({
        type:'GET',
        url:'http://' + backend_host + '/web/staff/goods/virtual/class?'+token,
        dataType:'json',
        success:function(data){
            console.log(data);
            var classNameLi = '',active = '';
            for(var i = 0; i<data.length; i++){
                if(i == 0){
                    active = 'class="active"';
                }else{
                    active = '';
                }
                classNameLi += '<li  '+ active +' ><a href="#" data-id="'+data[i].id+'">'+data[i].name+'</a></li>';
            }
            $('#tributeClass').html(classNameLi);
            tributeList('http://' + backend_host + '/web/staff/goods/virtual?'+ token +'&class_id='+data[0].id);
            $('#tributeAddDetail').attr('href','/tribute/frame/detail?add&' + data[0].id);
            $('#searchGoods').attr('data-id',data[0].id)
        },
        error:function(jqXHR,textStatus,errorThrown){
            if(jqXHR.status == 400){

            }
            if(jqXHR.status == 401){
                overdueToken()
            }
        }
    })
    function tributeList(hrefUrl){
        $.ajax({
            type:'GET',
            url:hrefUrl,
            dataType:'json',
            success:function(data){
                console.log(data);
                var classNameTr = '', valid = '';
                for(var i = 0; i<data.length; i++){
                    valid = data[i].valid?'上架':'下架';
                    classNameTr += '<tr><td><img src="http://' + backend_host +data[i].goods_image+'?'+token+'" /><span>'+data[i].goods_name+'</span><span>'+data[i].price_point+'财神币/';
                    classNameTr += data[i].price_coin+'积分</span></td><td><span class="label label-info"><a href="#">'+valid+'</a>';
                    classNameTr += '</span><span class="label label-info"><a href="/tribute/frame/detail?edit&'+data[i].goods_id+'">编辑</a></span></td></tr>';
                }
                //$('#tributeContent').html(classNameTr);
            },
            error:function(jqXHR,textStatus,errorThrown){
                if(jqXHR.status == 400){

                }
                if(jqXHR.status == 401){
                    overdueToken()
                }
            }
        })
    }
    //搜索
    $('#searchGoods').on('click',function(){
        var classId = $(this).attr('data-id');
        var textGoods = $('#textGoods').val();
        console.log(classId);
        console.log(textGoods);
        tributeList('http://' + backend_host + '/web/staff/goods/virtual?'+ token +'&class_id='+classId+'&keyword='+textGoods);
    })
    
    
})(jQuery)
*/

/*$(function () {
    $(".tribute-frame-left-xiang").css("backgroundColor", "#54a5c5" );
    $(".tribute-frame-left-xiang").css("color", "blank");
    $(".tribute-frame-left-xiang").css("fontWeight", "bold");


    $(".tribute-frame-left-xiang").on("click", function () {
        $(this).css("backgroundColor", "#54a5c5");
        $(".tribute-frame-left-hua").css("backgroundColor", "#fff");
        $(".tribute-frame-left-you").css("backgroundColor", "#fff");
        $(".tribute-frame-left-deng").css("backgroundColor", "#fff");
        $(".tribute-frame-left-gaodian").css("backgroundColor", "#fff");
    });
    $(".tribute-frame-left-hua").on("click", function () {
        $(this).css("backgroundColor", "#54a5c5");
        $(".tribute-frame-left-xiang").css("backgroundColor", "#fff");
        $(".tribute-frame-left-you").css("backgroundColor", "#fff");
        $(".tribute-frame-left-deng").css("backgroundColor", "#fff");
        $(".tribute-frame-left-gaodian").css("backgroundColor", "#fff");
    });
    $(".tribute-frame-left-you").on("click", function () {
        $(this).css("backgroundColor", "#54a5c5");
        $(".tribute-frame-left-xiang").css("backgroundColor", "#fff");
        $(".tribute-frame-left-hua").css("backgroundColor", "#fff");
        $(".tribute-frame-left-deng").css("backgroundColor", "#fff");
        $(".tribute-frame-left-gaodian").css("backgroundColor", "#fff");
    });
    $(".tribute-frame-left-deng").on("click", function () {
        $(this).css("backgroundColor", "#54a5c5");
        $(".tribute-frame-left-xiang").css("backgroundColor", "#fff");
        $(".tribute-frame-left-hua").css("backgroundColor", "#fff");
        $(".tribute-frame-left-you").css("backgroundColor", "#fff");
        $(".tribute-frame-left-gaodian").css("backgroundColor", "#fff");
    });
    $(".tribute-frame-left-gaodian").on("click", function () {
        $(this).css("backgroundColor", "#54a5c5");
        $(".tribute-frame-left-xiang").css("backgroundColor", "#fff");
        $(".tribute-frame-left-hua").css("backgroundColor", "#fff");
        $(".tribute-frame-left-you").css("backgroundColor", "#fff");
        $(".tribute-frame-left-deng").css("backgroundColor", "#fff");
    });
});*/


var out_id = "";

$(function () {
    $.getJSON("http://" + backend_host + '/web/staff/goods/virtual/class/collection?' + token,
        function (data) {
            // console.log(data)
            var tbody = "";
            out_id = data.list[0].id;

            $.each(data.list, function (i, order) {

                tbody +='<li class="tribute-frame-left-common" id="'+ order.id +'" >'+ order.name +'</li>';

            });

            $('#tributeClass').append(tbody);

            // console.info("第一个子节点1", $("#tributeClass").find("li").eq(0));
            $("#tributeClass li:first").css("backgroundColor", "#54a5c5" );


            $.getJSON("http://" + backend_host + '/web/staff/goods/virtual/collection?' + token + "&class_id=" + data.list[0].id,
                function (data) {
                    // console.log(data)
                    var tbody_s = "";

                    $.each(data.list, function (i, order) {

                        tbody_s +='<tr><th>'+ order.name +'<span>'+ order.point+'财神币/'+ order.coin +'积分</span></th>';
                        tbody_s +='<th><span class="label label-info"><a href="/tribute/frame/detail?1&id='+order.id+'">编辑</a></span>';
                        tbody_s +='<span class="label label-info tribute-frame-remove" id="'+order.id+'" data-toggle="modal" data-target="#myModal"><a href="#">删除</a></span>';
                        tbody_s +='<span class="label label-info"><a href="#">上</a></span>';
                        tbody_s +='<span class="label label-info"><a href="#">下</a></span></th></tr>';

                    });

                    $('#tributeContent').append(tbody_s);

                    $(".tribute-frame-remove").click(function () {
                        var goods_id = $(this).attr("id");
                        console.info("goods_id", goods_id);
                        $("#comfirm").click(function () {
                            $.ajax({
                                type:'DELETE',
                                contentType:'application/json',
                                url:'http://'+ backend_host + '/web/staff/goods/virtual/entity?' + token + "&goods_id=" + goods_id,
                                data:{},
                                dataType:'json',
                                success:function(data){
                                    // console.log(data);

                                    $.getJSON("http://" + backend_host + '/web/staff/goods/virtual/collection?' + token + "&class_id=" + out_id,
                                        function (data) {
                                            console.log("确认删除后重新get的数据", data);
                                            console.log("确认删除后重新get的数据个数", data.length);
                                            var tbody_s = "";

                                            $.each(data.list, function (i, order) {

                                                tbody_s += '<tr><th>' + order.name + '<span>' + order.point + '财神币/' + order.coin + '积分</span></th>';
                                                tbody_s += '<th><span class="label label-info"><a href="/tribute/frame/detail?1&id=' + order.id + '">编辑</a></span>';
                                                tbody_s += '<span class="label label-info tribute-frame-remove" id="' + order.id + '" data-toggle="modal" data-target="#myModal"><a href="#">删除</a></span>';
                                                tbody_s += '<span class="label label-info"><a href="#">上</a></span>';
                                                tbody_s += '<span class="label label-info"><a href="#">下</a></span></th></tr>';

                                            });

                                            $('#tributeContent').html(tbody_s);

                                        });

                                },
                                error:function(jqXHR){
                                    console.log(jqXHR.status);
                                    if(jqXHR.status == 406){

                                    }
                                }

                            })
                        })

                    })
                });




            $(".tribute-frame-left-common").on("click", function () {

                $(".tribute-frame-left-common").css("backgroundColor", "");
                $(this).css("backgroundColor", "#54a5c5" );

                console.info("id", $(this).attr("id"));
                out_id = $(this).attr("id");

                $.getJSON("http://" + backend_host + '/web/staff/goods/virtual/collection?' + token + "&class_id=" + $(this).attr("id"),
                    function (data) {
                        // console.log(data)
                        var tbody_s = "";

                        $.each(data.list, function (i, order) {

                            tbody_s +='<tr><th>'+ order.name +'<span>'+ order.point+'财神币/'+ order.coin +'积分</span></th>';
                            tbody_s +='<th><span class="label label-info"><a href="/tribute/frame/detail?1&id='+order.id+'">编辑</a></span>';
                            tbody_s +='<span class="label label-info tribute-frame-remove" id="' + order.id + '" data-toggle="modal" data-target="#myModal"><a href="#" >删除</a></span>';
                            tbody_s +='<span class="label label-info"><a href="#">上</a></span>';
                            tbody_s +='<span class="label label-info"><a href="#">下</a></span></th></tr>';

                        });

                        $('#tributeContent').html(tbody_s);

                        $(".tribute-frame-remove").click(function () {
                            var goods_id = $(this).attr("id");
                            console.info("goods_id", goods_id);
                            $("#comfirm").click(function () {
                                $.ajax({
                                    type:'DELETE',
                                    contentType:'application/json',
                                    url:'http://'+ backend_host + '/web/staff/goods/virtual/entity?' + token + "&goods_id=" + goods_id,
                                    data:{},
                                    dataType:'json',
                                    success:function(data){
                                        // console.log(data);

                                        $.getJSON("http://" + backend_host + '/web/staff/goods/virtual/collection?' + token + "&class_id=" + out_id,
                                            function (data) {
                                                console.log("确认删除后重新get的数据", data);
                                                console.log("确认删除后重新get的数据个数", data.list.length);
                                                var tbody_s = "";

                                                $.each(data.list, function (i, order) {

                                                    tbody_s += '<tr><th>' + order.name + '<span>' + order.point + '财神币/' + order.coin + '积分</span></th>';
                                                    tbody_s += '<th><span class="label label-info"><a href="/tribute/frame/detail?1&id=' + order.id + '">编辑</a></span>';
                                                    tbody_s += '<span class="label label-info tribute-frame-remove" id="' + order.id + '" data-toggle="modal" data-target="#myModal"><a href="#">删除</a></span>';
                                                    tbody_s += '<span class="label label-info"><a href="#">上</a></span>';
                                                    tbody_s += '<span class="label label-info"><a href="#">下</a></span></th></tr>';

                                                });

                                                $('#tributeContent').html(tbody_s);

                                            });

                                    },
                                    error:function(jqXHR){
                                        console.log(jqXHR.status);
                                        if(jqXHR.status == 406){

                                        }
                                    }

                                })
                            })

                        })
                    });



            })
    });



});

function tribute_frame_pulls() {
    console.info("out_id", out_id);
    location.href = "/tribute/frame/detail?0&id=" + out_id
}