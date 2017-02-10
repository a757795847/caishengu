
newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token);

var image = [];
function fileUploadCompleteCallback(key, src) {
    if (image.length == 8) {
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#container').before(imageBoxs);

        image.push(key)
        $('#container').hide()
    } else {
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#container').before(imageBoxs);

        image.push(key)
    }
    console.info("图片arr", image);
    console.info("图片张数3", image.length);
}
$('#fsUploadProgress').on('mousemove ', '.imgBox', function () {
    $(this).find('button').css('display', 'block');

})
$('#fsUploadProgress').on('mouseout ', '.imgBox', function () {
    $(this).find('button').css('display', 'none');
})
$('#fsUploadProgress').on('click ', '.imgBox button', function (e) {
    e.stopPropagation();
    var dataName = $(this).attr('data-name');
    console.info("dataName", dataName);
    var index = null;
    for (var i = 0; i < image.length; i++) {
        if (dataName == image[i]) {
            index = i
        }
    }
    console.info("删除的下标", index);
    image.splice(index, 1);
    console.info("image", image);
    $(this).parent().remove();
    $('#container').show();
})

newQiniu(fileUploadCompleteCallbacks, 'pushadd', 'imagebox', imagetokens().token);
var images = [];
function fileUploadCompleteCallbacks(key, src) {
    if(images.length == 8){
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#pushadd').before(imageBoxs);
        images.push(key)
        $('#pushadd').hide()
    }else{
        var imageBoxs = '';
        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs += '<img src="' + src + '"></div>';
        $('#pushadd').before(imageBoxs);
        images.push(key)
    }

    console.info("图片arr", images);
    console.info("图片张数3", images.length);
}
$('#imagebox').on('mousemove ', '.imgBox', function () {
    $(this).find('button').css('display', 'block');

})
$('#imagebox').on('mouseout ', '.imgBox', function () {
    $(this).find('button').css('display', 'none');
})
$('#imagebox').on('click ', '.imgBox button', function (e) {
    e.stopPropagation();
    var dataName = $(this).attr('data-name');
    var index = null;
    for (var i = 0; i < images.length; i++) {
        if (dataName == images[i]) {
            index = i
        }
    }
    console.info("删除的下标", index);
    images.splice(index, 1);
    console.info("images", images);
    $(this).parent().remove();
    $('#pushadd').show();
})


$(".father").on('click','span',function(){
        var Edit=$(this).html();
    console.log(Edit);
        if(Edit=="展开") {
            console.log("1");
            $(this).parent().next().css({
                "height": "90px",
                'opacity': 1,
            });
            $(this).parent().next().children().css("display", "block");
            $(this).html("收起");

        }else{
            $(this).parent().next().css({
                "height": "0",
                'opacity': 0
            });
            console.info("(this)", $(this).parent().next().children());
            $(this).parent().next().children().css("display", "none");
            $(this).html("展开");

        }
});
$("#boxInfo").on("click",'.out',function(){
    $(this).parent().parent().remove();

});

var index_i = 1;
var image_tu = [];
$(".btn.btn-default.add").on("click",function(){
    console.info("index_i", index_i);
    var sub="";
    var faid = 'addImgs_tu'+index_i;
    var chid = "container_tu"+index_i;
    var fsid = "fsUploadProgress_tu"+index_i;
    sub += '<tr> <td class="shopping-frame-details-tou-tu"> <div role="tabpanel" id="'+faid+'"  class="tab-pane fade in active" aria-labelledby="demo-tab">';
    sub += '<div  id="'+fsid+'">';
    sub += '<div class="addImg-tu" id="'+chid+'">';
    sub += '<a id="pickfiles'+index_i+'" href="#" >';
    sub += '<i class="glyphicon glyphicon-plus"></i>';
    sub += '</a></div></div></div></td>';
    sub += '<td> <input type="text" class="form-control colors" placeholder="红色" value=""></td>';
    sub += '<td> <input type="text" class="form-control weight" placeholder="kg"></td>';
    sub += '<td> <input type="text" class="form-control spec" placeholder="大" value=""></td>';
    sub += '<td> <input type="text" class="form-control coin" placeholder="1" value=""></td>';
    sub += '<td> <input type="text" class="form-control point" placeholder="10" value=""></td>';
    sub += '<td> <input type="text" class="form-control number" placeholder="10" value=""></td>';
    sub += '<td> <button class="btn btn-default out">删除</button></td></tr>';

    console.log(sub);
$(".table.no-margin").find('tbody').append(sub);
console.log('container_tu'+index_i)
    newQiniu(fileUploadCompleteCallback_other, chid, faid, imagetokens().token);

    function fileUploadCompleteCallback_other(key, src) {
        var imageBoxs_tu = '';
        imageBoxs_tu += '<div class="imgBox_tu"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
        imageBoxs_tu += '<img class="images" data-key="'+key+'" src="' + src + '"></div>';
        $('#'+faid).hide();

        $('#'+faid).before(imageBoxs_tu);

        image_tu.push(key);
    }
    $('#'+fsid).on('mousemove ', '.imgBox', function () {
        $(this).find('button').css('display', 'block');

    })
    $('#'+fsid).on('mouseout ', '.imgBox', function () {
        $(this).find('button').css('display', 'none');
    })
    $('#'+fsid).on('click ', '.imgBox_tu button', function (e) {
        e.stopPropagation();
        var dataName = $(this).attr('data-name');
        image_tu = '';
        $(this).parent().remove();
        $('#container_tu'+index_i).show();
    })
    index_i++
});
var list = [];
function listdata(image,color,weight,spec,coin,point,number) {
    var data = {
        'image':image,
        'color':color,
        'weight':weight,
        'spec':spec,
        'coin':coin,
        'point':point,
        'number':number
    };
    list.push(data)
}


var type_list_data = [];
function type_list(class_id, label_id, input_val) {
    var data = {
        class_id: class_id,
        label_id: label_id,
        is_choose: input_val
    };
    type_list_data.push(data)
}


$(function () {
    var suffix_type = window.location.search.slice(1, 2);
    // console.info("suffix_type", suffix_type);
    if (suffix_type == 0) {
        var defaultData = '';
            defaultData += '<tr><td class="shopping-frame-details-tou-tu"> <div role="tabpanel" id="addImgs_tu" class="tab-pane fade in active" aria-labelledby="demo-tab">';
            defaultData += '<div  id="fsUploadProgress_tu">';
            defaultData += '<div class="addImg-tu" id="container_tu">';
            defaultData += '<a id="pickfiles_tu" href="#" >';
            defaultData += '<i class="glyphicon glyphicon-plus"></i>';
            defaultData += '</a></div></div></div></td>';
            defaultData += '<td> <input type="text" class="form-control colors" placeholder="红色" value=""></td>';
            defaultData += '<td> <input type="text" class="form-control weight" placeholder="kg"></td>';
            defaultData += '<td> <input type="text" class="form-control spec" placeholder="大" value=""></td>';
            defaultData += '<td> <input type="text" class="form-control coin" placeholder="1" value=""></td>';
            defaultData += '<td> <input type="text" class="form-control point" placeholder="10" value=""></td>';
            defaultData += '<td> <input type="text" class="form-control number" placeholder="10" value=""></td>';
            defaultData += '<td> <button class="btn btn-default out">删除</button></td></tr>';

        $('table.table tbody#boxInfo').append(defaultData);

        newQiniu(fileUploadCompleteCallback_first, 'container_tu', 'addImgs_tu', imagetokens().token);

        var image_tu = "";
        function fileUploadCompleteCallback_first(key, src) {
            var imageBoxs_tu = '';
            imageBoxs_tu += '<div class="imgBox_tu"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
            imageBoxs_tu += '<img class="images" data-key="'+key+'" src="' + src + '"></div>';
            $('#container_tu').hide();

            $('#container_tu').before(imageBoxs_tu);

            image_tu = key;
        }
        $('#fsUploadProgress_tu').on('mousemove ', '.imgBox', function () {
            $(this).find('button').css('display', 'block');

        })
        $('#fsUploadProgress_tu').on('mouseout ', '.imgBox', function () {
            $(this).find('button').css('display', 'none');
        })
        $('#fsUploadProgress_tu').on('click ', '.imgBox_tu button', function (e) {
            e.stopPropagation();
            var dataName = $(this).attr('data-name');
            image_tu = '';
            $(this).parent().remove();
            $('#container_tu').show();
        })

        $.getJSON("http://" + backend_host + '/other/definition/district?' + token,
            function (data) {
                console.log("全国省份", data);
                var defaultOption = "";

                $.each(data, function (i, order) {

                    defaultOption +='<option value='+order.name+'>'+order.name+'</option>';

                });

                $('select.shopping_frame_details_select').append(defaultOption);
            })
        /*var defaultOption = '';
        defaultOption += '<option value ="北京市">北京市 </option><option value ="天津市">天津市 </option><option value ="上海市">上海市 </option>' +
            '<option value ="重庆市">重庆市 </option><option value ="河北省">河北省 </option><option value ="山西省">山西省 </option><option value ="辽宁省">辽宁省 </option>' +
            '<option value ="吉林省">吉林省 </option><option value ="黑龙江省">黑龙江省</option><option value ="江苏省">江苏省 </option><option value ="浙江省">浙江省 </option>' +
            '<option value ="安徽省">安徽省 </option><option value ="福建省">福建省 </option><option value ="江西省">江西省 </option><option value ="山东省">山东省 </option>' +
            '<option value ="河南省">河南省 </option><option value ="湖北省">湖北省 </option><option value ="湖南省">湖南省 </option><option value ="广东省">广东省 </option>' +
            '<option value ="海南省">海南省 </option><option value ="四川省">四川省 </option><option value ="贵州省">贵州省 </option><option value ="云南省">云南省 </option>' +
            '<option value ="陕西省">陕西省 </option><option value ="甘肃省">甘肃省 </option><option value ="青海省">青海省 </option><option value ="台湾省">台湾省 </option>' +
            '<option value ="广西壮族自治区">广西壮族自治区</option><option value ="内蒙古自治区">内蒙古自治区</option><option value ="西藏自治区">西藏自治区</option>' +
            '<option value ="宁夏回族自治区">宁夏回族自治区 </option><option value ="新疆维吾尔自治区">新疆维吾尔自治区</option><option value ="香港特别行政区">香港特别行政区</option>' +
            '<option value ="澳门特别行政区">澳门特别行政区</option>'
        $('select.shopping_frame_details_select').append(defaultOption);*/

        $.getJSON("http://" + backend_host + '/web/staff/goods/market/class/collection?' + token + '&with_label=true',
            function (data) {
                console.log(data);
                var defaultType = "";

                $.each(data.list, function (i, order) {

                    defaultType +='<div class="father">';
                    defaultType +='<div>'+order.name+'<span class="open">展开</span></div>';
                    defaultType +='<ul class="twocat">';
                    $.each(order.children, function (a, item) {
                        defaultType +='<li><input type="checkbox" id='+item.label_id+' class='+order.id+'>'+item.label_name+'</li>';
                    })
                    defaultType +='</ul></div>';

                });

                $('div.category').append(defaultType);
                $(".father").on('click','span',function(){
                    var Edit=$(this).html();
                    console.log(Edit);
                    if(Edit=="展开") {
                        console.log("1");
                        $(this).parent().next().css({
                            "height": "auto",
                            'opacity': 1,
                        });
                        $(this).parent().next().children().css("display", "block");
                        $(this).html("收起");

                    }else{
                        $(this).parent().next().css({
                            "height": "0",
                            'opacity': 0
                        });
                        console.info("(this)", $(this).parent().next().children());
                        $(this).parent().next().children().css("display", "none");
                        $(this).html("展开");

                    }
                })
            });



        $.getJSON("http://" + backend_host + '/web/staff/postage/collection?' + token,
            function (data) {
                console.log(data);
                var defaultTemplateOption = "";

                $.each(data.list, function (i, order) {

                    defaultTemplateOption +='<option value='+order.name+'>'+order.name+'</option>';

                });

                $('.shopping-frame-details-template').append(defaultTemplateOption);
            })

        $("#keep").click(function () {
            var given_id = $("#shopping_frame_details_given_id").val();
            console.info("编号",given_id)
            var name = $("#shopping_frame_details_name").val();
            console.info("标题", name);
            var manufacturer = $("#shopping_frame_details_manufacturer").val();
            console.info("厂商", manufacturer);
            var place = $(".shopping_frame_details_select").find("option:selected").text();
            console.info("发货地1", place)
            var postage = $(".shopping-frame-details-template").find("option:selected").text();
            console.info("postage",postage);


            for(var i =0;i<$('#boxInfo tr').length;i++){
                var datas = $('#boxInfo tr').eq(i)
                var theimage = datas.find('.images').data("key")
                var colors = datas.find('.colors').val()
                var weight = datas.find('.weight').val()
                var spec = datas.find('.spec').val()
                var coin = datas.find('.coin').val()
                var point = datas.find('.point').val()
                var number = datas.find('.number').val()
                listdata(theimage,colors,parseFloat(weight),spec,parseFloat(coin),parseFloat(point),parseFloat(number))
            }
            console.log(list)


            for (var b = 0; b < list.length; b++) {
                if (list[b].coin == "" || list[b].color == "" ||list[b].image == undefined || list[b].number == "" || list[b].point == "" || list[b].spec == "" || list[b].weight == "") {
                    $("#shpping_frame_details_hint_4").css("display", "inline-block");
                    list=[]
                } else {
                    $("#shpping_frame_details_hint_4").css("display", "none");
                }
            }

            for (var c = 0; c < $('.father ul li input').length; c++) {

                if ($('.father ul li input').eq(c).is(':checked')) {
                    var class_id = $('.father ul li input').eq(c).attr("class");
                    var label_id = $('.father ul li input').eq(c).attr("id");
                    var input_val = true

                    type_list(class_id, label_id, input_val)
                }
            }
            console.info("类目列表", type_list_data);

            var add_data = {
                "given_id": parseFloat(given_id),
                "name": name,
                "images": image,
                "spec_list": list,
                "manufacturer": manufacturer,
                "place": place,
                "class_label_list": type_list_data,
                "postage": postage,
                "introduce_images": images
            }
            console.info("add_data", add_data);
            if (given_id == "" || !/^[0-9]*[1-9][0-9]*$/.test(given_id) || image.length == 0 || name == "" || manufacturer == "" || type_list_data.length == 0 || images.length == 0) {
                if (given_id == "" || !/^[0-9]*[1-9][0-9]*$/.test(given_id)) {
                    $("#shpping_frame_details_hint_1").css("display", "inline-block");
                } else {
                    $("#shpping_frame_details_hint_1").css("display", "none");
                }
                if (image.length == 0) {
                    $("#shpping_frame_details_hint_2").css("display", "inline-block");
                } else {
                    $("#shpping_frame_details_hint_2").css("display", "none");
                }
                if (name == "") {
                    $("#shpping_frame_details_hint_3").css("display", "inline-block");
                } else {
                    $("#shpping_frame_details_hint_3").css("display", "none");
                }
                if (manufacturer == "") {
                    $("#shpping_frame_details_hint_5").css("display", "inline-block");
                } else {
                    $("#shpping_frame_details_hint_5").css("display", "none");
                }
                if (type_list_data.length == 0) {
                    $("#shpping_frame_details_hint_6").css("display", "inline-block");
                } else {
                    $("#shpping_frame_details_hint_6").css("display", "none");
                }
                if (images.length == 0) {
                    $("#shpping_frame_details_hint_7").css("display", "inline-block");
                } else {
                    $("#shpping_frame_details_hint_7").css("display", "none");
                }
            } else {
                $("#shpping_frame_details_hint_1").css("display", "none");
                $("#shpping_frame_details_hint_2").css("display", "none");
                $("#shpping_frame_details_hint_3").css("display", "none");
                $("#shpping_frame_details_hint_4").css("display", "none");
                $("#shpping_frame_details_hint_5").css("display", "none");
                $("#shpping_frame_details_hint_6").css("display", "none");
                $("#shpping_frame_details_hint_7").css("display", "none");

                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: 'http://' + backend_host + '/web/staff/goods/market/entity?' + token,
                    data: JSON.stringify(add_data),
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        location.href = "/shopping/frame"
                    },
                    error: function (jqXHR) {
                        console.log(jqXHR.status);
                        if (jqXHR.status == 406) {

                        }
                    }

                })
            }

            list = []
            type_list_data = []
        })
    } else {
        $(".shopping-frame-details-remove").css("display", "inline-block");
    }
});
