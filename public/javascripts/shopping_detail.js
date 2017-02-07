


$(document).ready(function () {


})

$(function () {
    var type = window.location.search.slice(3);
    console.info("type", type);

    if (type == null) {
        $("#keep").on("click", function () {
            var genera_name = $("#title").val()
            console.info("genera_name", genera_name)
            $.ajax({
                type:'POST',
                contentType:'application/json',
                url:'http://'+ backend_host + '/web/staff/goods/market/class/entity?' + token,
                data: {
                    "name": genera_name,

                    //todo 图片url
                    "image": ""
                },
                dataType:'json',
                success:function(data){
                    console.log(data);
                    location.href = "/shopping/frame"
                },
                error:function(jqXHR){
                    console.log(jqXHR.status);
                    if(jqXHR.status == 406){

                    }
                }

            })
        })
    } else {
        var id = window.location.search.slice(4);
        console.info("id", id);
        $.getJSON("http://" + backend_host + '/web/staff/goods/market/class/entity?' + token + "&id=" + id,
            function (data) {
                console.log("data.name", data.name);
                $("#title").val(data.name)

                var addData = '';
                for (var i = 0; i < data.label_list.length; i++) {
                    addData += '<div class="input-group">';
                    addData += '<div class="input-group-btn">';
                    addData += '<button type="button" class="btn btn-default"><i class="fa fa-chain"></i></button>';
                    addData += '</div>';
                    addData += '<input type="text" class="form-control address" placeholder="二级分类名" >';
                    addData += '<span><a href="#" data-toggle="modal" data-target="#myModal" class="shopping-frame-detail-remove">删除</a></span>';
                    addData += '<span>上</span>';
                    addData += '<span>下</span>';
                    addData += '</div>';

                }
                $('.father').append(addData);
            });



        $("#addgr").css("display", "inline-block");

        $("#addgr").on("click", function () {
            var addData = '';
            addData += '<div class="input-group">';
            addData += '<div class="input-group-btn">';
            addData += '<button type="button" class="btn btn-default"><i class="fa fa-chain"></i></button>';
            addData += '</div>';
            addData += '<input type="text" class="form-control address" placeholder="二级分类名">';
            addData += '<span><a href="#" data-toggle="modal" data-target="#myModal" class="shopping-frame-detail-remove">删除</a></span>';
            addData += '<span>上</span>';
            addData += '<span>下</span>';
            addData += '</div>';

            $('.father').append(addData);
        })

        $(".shopping-frame-detail-remove").on("click", function () {
            var out = this;
            $("#comfirm").on("click", function () {
                console.info("out", out.parentNode.parentNode);
                $(out).css("color", "red")
            })
        });

    }
});

