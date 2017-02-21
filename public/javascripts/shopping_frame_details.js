$(".father").on('click', 'span', function () {
    var Edit = $(this).html();
    console.log(Edit);
    if (Edit == "展开") {
        console.log("1");
        $(this).parent().next().css({
            "height": "90px",
            'opacity': 1,
        });
        $(this).parent().next().children().css("display", "block");
        $(this).html("收起");

    } else {
        $(this).parent().next().css({
            "height": "0",
            'opacity': 0
        });
        console.info("(this)", $(this).parent().next().children());
        $(this).parent().next().children().css("display", "none");
        $(this).html("展开");

    }
});

var list = [];
function listdata(image, color, weight, spec, coin, point, number) {
    var data = {
        'image': image,
        'color': color,
        'weight': parseFloat(weight),
        'spec': spec,
        'coin': parseFloat(coin),
        'point': parseFloat(point),
        'number': parseFloat(number)
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

        $("#boxInfo").on("click", '.out', function () {
            $(this).parent().parent().remove();

        });
        var index_i = 99;
        var image_tu_add = [];
        $(".btn.btn-default.add").on("click", function () {
            console.info("index_i", index_i);
            var sub = "";
            var faid = 'addImgs_tu' + index_i;
            var chid = "container_tu" + index_i;
            var fsid = "fsUploadProgress_tu" + index_i;
            sub += '<tr> <td class="shopping-frame-details-tou-tu"> <div role="tabpanel" id="' + faid + '"  class="tab-pane fade in active" aria-labelledby="demo-tab">';
            sub += '<div  id="' + fsid + '">';
            sub += '<div class="addImg-tu" id="' + chid + '">';
            sub += '<a id="pickfiles' + index_i + '" href="#" >';
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
            console.log('container_tu' + index_i)
            newQiniu(fileUploadCompleteCallback_other, chid, faid, imagetokens().token, 1, "jpg, jpeg, gif, png");

            function fileUploadCompleteCallback_other(key, src) {
                var imageBoxs_tu = '';
                imageBoxs_tu += '<div class="imgBox_tu"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs_tu += '<img class="images" data-key="' + key + '" src="' + src + '"></div>';
                $('#' + faid).hide();

                $('#' + faid).before(imageBoxs_tu);

                image_tu_add.push(key);
            }

            $('#' + fsid).on('mousemove ', '.imgBox', function () {
                $(this).find('button').css('display', 'block');

            })
            $('#' + fsid).on('mouseout ', '.imgBox', function () {
                $(this).find('button').css('display', 'none');
            })
            $('#' + fsid).on('click ', '.imgBox_tu button', function (e) {
                e.stopPropagation();
                var dataName = $(this).attr('data-name');
                image_tu_add = [];
                $(this).parent().remove();
                $('#container_tu' + index_i).show();
            })
            index_i++
        });


        newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token, 1, "jpg, jpeg, gif, png");

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

        newQiniu(fileUploadCompleteCallbacks, 'pushadd', 'imagebox', imagetokens().token, 1, "jpg, jpeg, gif, png");
        var images = [];

        function fileUploadCompleteCallbacks(key, src) {
            if (images.length == 8) {
                var imageBoxs = '';
                imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<img src="' + src + '"></div>';
                $('#pushadd').before(imageBoxs);
                images.push(key)
                $('#pushadd').hide()
            } else {
                var imageBoxs = '';
                imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs += '<img src="' + src + '"></div>';
                $('#pushadd').before(imageBoxs);
                images.push(key)
            }

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

        newQiniu(fileUploadCompleteCallback_first, 'container_tu', 'addImgs_tu', imagetokens().token, 1, "jpg, jpeg, gif, png");

        var image_tu = "";

        function fileUploadCompleteCallback_first(key, src) {
            var imageBoxs_tu = '';
            imageBoxs_tu += '<div class="imgBox_tu"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
            imageBoxs_tu += '<img class="images" data-key="' + key + '" src="' + src + '"></div>';
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

                    defaultOption += '<option value=' + order.id + '>' + order.name + '</option>';

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

                    defaultType += '<div class="father">';
                    defaultType += '<div>' + order.name + '<span class="open">展开</span></div>';
                    defaultType += '<ul class="twocat">';
                    $.each(order.children, function (a, item) {
                        defaultType += '<li><input type="checkbox" id=' + item.label_id + ' class=' + order.id + '>' + item.label_name + '</li>';
                    })
                    defaultType += '</ul></div>';

                });

                $('div.category').append(defaultType);
                $(".father").on('click', 'span', function () {
                    var Edit = $(this).html();
                    console.log(Edit);
                    if (Edit == "展开") {
                        console.log("1");
                        $(this).parent().next().css({
                            "height": "auto",
                            'opacity': 1,
                        });
                        $(this).parent().next().children().css("display", "block");
                        $(this).html("收起");

                    } else {
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

                    defaultTemplateOption += '<option value=' + order.id + '>' + order.name + '</option>';

                });

                $('.shopping-frame-details-template').append(defaultTemplateOption);
            })

        $("#keep").click(function () {
            var given_id = $("#shopping_frame_details_given_id").val();
            console.info("编号", given_id)
            var name = $("#shopping_frame_details_name").val();
            console.info("标题", name);
            var manufacturer = $("#shopping_frame_details_manufacturer").val();
            console.info("厂商", manufacturer);
            var place = $(".shopping_frame_details_select").find("option:selected").val();
            console.info("发货地", place)
            var postage = $(".shopping-frame-details-template").find("option:selected").val();
            console.info("postage", postage);


            for (var i = 0; i < $('#boxInfo tr').length; i++) {
                var datas = $('#boxInfo tr').eq(i)
                var theimage = datas.find('.images').data("key")
                var colors = datas.find('.colors').val()
                var weight = datas.find('.weight').val()
                var spec = datas.find('.spec').val()
                var coin = datas.find('.coin').val()
                var point = datas.find('.point').val()
                var number = datas.find('.number').val()
                listdata(theimage, colors, weight, spec, coin, point, number)
            }
            console.log(list)


            for (var b = 0; b < list.length; b++) {
                if (list[b].coin == "" || list[b].color == "" || list[b].image == undefined || list[b].number == "" || list[b].point == "" || list[b].spec == "" || list[b].weight == "") {
                    $("#shpping_frame_details_hint_4").css("display", "inline-block");
                    $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                    $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                    list = []
                } else if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(list[b].weight) || !/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(list[b].coin)) {
                    $("#shpping_frame_details_hint_chi_cun1").css("display", "inline-block");
                    $("#shpping_frame_details_hint_4").css("display", "none");
                    $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                } else if (!/^[0-9]*[1-9][0-9]*$/.test(list[b].point) || !/^[0-9]*[1-9][0-9]*$/.test(list[b].number)) {
                    $("#shpping_frame_details_hint_chi_cun2").css("display", "inline-block");
                    $("#shpping_frame_details_hint_4").css("display", "none");
                    $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                } else {
                    $("#shpping_frame_details_hint_4").css("display", "none");
                    $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                    $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
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
            console.info("list.length", list.length);
            if (given_id == "" || !/^[0-9]*[1-9][0-9]*$/.test(given_id) || image.length == 0 || name == "" || manufacturer == "" || type_list_data.length == 0 || images.length == 0 || list.length == 0) {
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
                if (list.length == 0) {
                    for (var b = 0; b < list.length; b++) {
                        if (list[b].coin == "" || list[b].color == "" || list[b].image == undefined || list[b].number == "" || list[b].point == "" || list[b].spec == "" || list[b].weight == "") {
                            $("#shpping_frame_details_hint_4").css("display", "inline-block");
                            $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                            $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                            list = []
                        } else if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(list[b].weight) || !/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(list[b].coin)) {
                            $("#shpping_frame_details_hint_chi_cun1").css("display", "inline-block");
                            $("#shpping_frame_details_hint_4").css("display", "none");
                            $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                        } else if (!/^[0-9]*[1-9][0-9]*$/.test(list[b].point) || !/^[0-9]*[1-9][0-9]*$/.test(list[b].number)) {
                            $("#shpping_frame_details_hint_chi_cun2").css("display", "inline-block");
                            $("#shpping_frame_details_hint_4").css("display", "none");
                            $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                        } else {
                            $("#shpping_frame_details_hint_4").css("display", "none");
                            $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                            $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                        }
                    }
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
                        // location.href = "/shopping/frame"
                    },
                    error: function (jqXHR) {
                        console.log(jqXHR.status);
                        if (jqXHR.status == 406) {

                        }
                    }

                })
            }

            list = [];
            type_list_data = []
        })
    } else {
        var goodsId = window.location.search.slice(4);
        // console.info("goodsId", goodsId);
        $(".shopping-frame-details-remove").css("display", "inline-block");


        var index_i = 99;
        var image_tu_add = [];
        $(".btn.btn-default.add").on("click", function () {
            console.info("index_i", index_i);
            var sub = "";
            var faid = 'addImgs_tu' + index_i;
            var chid = "container_tu" + index_i;
            var fsid = "fsUploadProgress_tu" + index_i;
            sub += '<tr> <td class="shopping-frame-details-tou-tu"> <div role="tabpanel" id="' + faid + '"  class="tab-pane fade in active" aria-labelledby="demo-tab">';
            sub += '<div  id="' + fsid + '">';
            sub += '<div class="addImg-tu" id="' + chid + '">';
            sub += '<a id="pickfiles' + index_i + '" href="#" >';
            sub += '<i class="glyphicon glyphicon-plus"></i>';
            sub += '</a></div></div></div></td>';
            sub += '<td> <input type="text" class="form-control colors" placeholder="红色" value=""></td>';
            sub += '<td> <input type="text" class="form-control weight" placeholder="kg"></td>';
            sub += '<td> <input type="text" class="form-control spec" placeholder="大" value=""></td>';
            sub += '<td> <input type="text" class="form-control coin" placeholder="1" value=""></td>';
            sub += '<td> <input type="text" class="form-control point" placeholder="10" value=""></td>';
            sub += '<td> <input type="text" class="form-control number" placeholder="10" value=""></td>';
            sub += '<td> <button class="btn btn-default shopping-frame-details-save">保存</button></td>';
            sub += '<td> <button class="btn btn-default add_out">删除</button></td></tr>';

            console.log(sub);
            $(".table.no-margin").find('tbody').append(sub);
            console.log('container_tu' + index_i)


            newQiniu(fileUploadCompleteCallback_other, chid, faid, imagetokens().token, 1, "jpg, jpeg, gif, png");

            function fileUploadCompleteCallback_other(key, src) {
                var imageBoxs_tu = '';
                imageBoxs_tu += '<div class="imgBox_tu"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                imageBoxs_tu += '<img class="images" data-key="' + key + '" src="' + src + '"></div>';
                $('#' + faid).hide();

                $('#' + faid).before(imageBoxs_tu);

                image_tu_add.push(key);
            }

            $('#' + fsid).on('mousemove ', '.imgBox', function () {
                $(this).find('button').css('display', 'block');

            })
            $('#' + fsid).on('mouseout ', '.imgBox', function () {
                $(this).find('button').css('display', 'none');
            })
            $('#' + fsid).on('click ', '.imgBox_tu button', function (e) {
                e.stopPropagation();
                var dataName = $(this).attr('data-name');
                image_tu_add = [];
                $(this).parent().remove();
                $('#container_tu' + index_i).show();
            })
            index_i++

            $(".shopping-frame-details-save").click(function () {
                var theimage = $(this).parent().parent().find('.images').data('key');
                console.info("theimage", theimage);
                var colors = $(this).parent().prev().prev().prev().prev().prev().prev().find('.colors').val();
                console.info("colors", colors);
                var weight = $(this).parent().prev().prev().prev().prev().prev().find('.weight').val();
                var spec = $(this).parent().prev().prev().prev().prev().find('.spec').val();
                var coin = $(this).parent().prev().prev().prev().find('.coin').val();
                var point = $(this).parent().prev().prev().find('.point').val();
                var number = $(this).parent().prev().find('.number').val();
                if (theimage == undefined || colors == "" || weight == "" || spec == "" || coin == "" || point == "" || number == "") {
                    $("#shpping_frame_details_hint_4").css("display", "inline-block");
                    $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                    $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                } else if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(weight) || !/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(coin)) {
                    $("#shpping_frame_details_hint_chi_cun1").css("display", "inline-block");
                    $("#shpping_frame_details_hint_4").css("display", "none");
                    $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                } else if (!/^[0-9]*[1-9][0-9]*$/.test(point) || !/^[0-9]*[1-9][0-9]*$/.test(number)) {
                    $("#shpping_frame_details_hint_chi_cun2").css("display", "inline-block");
                    $("#shpping_frame_details_hint_4").css("display", "none");
                    $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                } else {
                    $("#shpping_frame_details_hint_4").css("display", "none");
                    $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                    $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                    var add_data_s = {
                        "goods_id": goodsId,
                        "image": theimage,
                        "color": colors,
                        "weight": parseFloat(weight),
                        "spec": spec,
                        "coin": parseFloat(coin),
                        "point": parseFloat(point),
                        "number": parseFloat(number)
                    };
                    console.info("add_data_s", add_data_s);
                    $.ajax({
                        type: 'POST',
                        contentType: 'application/json',
                        url: 'http://' + backend_host + '/web/staff/goods/market/entity/spec?' + token,
                        data: JSON.stringify(add_data_s),
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            errorMessage("保存成功");
                            location=location
                            // location.href = "/shopping/frame"
                        },
                        error: function (jqXHR) {
                            console.log(jqXHR.status);
                            errorMessage("保存失败");
                            if (jqXHR.status == 406) {

                            }
                        }

                    })
                }
            });
        });


        $.getJSON("http://" + backend_host + '/web/staff/goods/market/entity?' + token + "&id=" + goodsId,
            function (datas) {
                console.log(datas);
                $("#shopping_frame_details_given_id").val(datas.given_id);
                $("#shopping_frame_details_name").val(datas.name);
                $("#shopping_frame_details_manufacturer").val(datas.manufacturer);
                // $("#shopping_frame_details_select").val("浙江省")
                // $("#shopping_frame_details_select  option[value='浙江省'] ").attr("selected",true)

                $.getJSON("http://" + backend_host + '/other/definition/district?' + token,
                    function (data) {
                        // console.log("全国省份", data);
                        var defaultOption = "";

                        $.each(data, function (i, order) {

                            defaultOption += '<option value=' + order.id + ' id='+order.id+'>' + order.name + '</option>';

                        });

                        $('select.shopping_frame_details_select').append(defaultOption).val(datas.place);

                    });

                $.getJSON("http://" + backend_host + '/web/staff/postage/collection?' + token,
                    function (data_template) {
                        // console.log(data_template);
                        var defaultTemplateOption = "";

                        $.each(data_template.list, function (i, order) {

                            defaultTemplateOption += '<option value=' + order.id + ' id='+order.id+'>' + order.name + '</option>';

                        });

                        $('.shopping-frame-details-template').append(defaultTemplateOption).val(datas.postage);
                    });

                var image_up_data = datas.images;
                console.info("编辑图片e", image_up_data)
                if (datas.images.length < 9) {
                    var imageBoxs = '';
                    for (var a = 0; a < datas.images.length; a++) {
                        imageBoxs += '<div class="imgBox"><button type="button" data-name="'+datas.images[a]+'" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                        imageBoxs += '<img src="http://' + backend_host + datas.images[a] + '?' + token + '"></div>';
                        // console.log(imageBoxs);
                    }
                    $('#container').before(imageBoxs);
                } else {
                    var imageBoxs_nine = '';
                    for (var i = 0; i < datas.images.length; i++) {
                        imageBoxs_nine += '<div class="imgBox"><button type="button" data-name="'+datas.images[i]+'" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                        imageBoxs_nine += '<img src="http://' + backend_host + '' + datas.images[i] + '?' + token + '"></div>';
                        // console.log(imageBoxs);
                    }
                    $('#container').hide();
                    $('#container').before(imageBoxs_nine);
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
                    for (var i = 0; i < image_up_data.length; i++) {
                        if (dataName == image_up_data[i]) {
                            index = i
                        }
                    }
                    console.info("删除的下标", index);
                    image_up_data.splice(index, 1);
                    console.info("image_up_data", image_up_data);
                    $(this).parent().remove();
                    $('#container').show();
                    console.info("下面的图片", images);
                })
                newQiniu(fileUploadCompleteCallback, 'container', 'addImgs', imagetokens().token, 1, "jpg, jpeg, gif, png");

                function fileUploadCompleteCallback(key, src) {
                    var imageBoxs = '';
                    if (image_up_data.length == 8) {
                        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                        imageBoxs += '<img src="' + src + '"></div>';
                        $('#container').before(imageBoxs);

                        image_up_data.push(key)
                        $('#container').hide()
                    } else {
                        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                        imageBoxs += '<img src="' + src + '"></div>';
                        $('#container').before(imageBoxs);

                        image_up_data.push(key)
                    }
                    console.info("编辑图片2", image)
                }


                var images_down_data = datas.introduce_images;
                console.info("编辑图片3", images_down_data);
                if (datas.introduce_images.length < 9) {
                    var imageBoxs_down = '';
                    for (var d = 0; d < datas.introduce_images.length; d++) {
                        imageBoxs_down += '<div class="imgBox"><button type="button" data-name="'+datas.introduce_images[d]+'" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                        imageBoxs_down += '<img src="http://' + backend_host + datas.introduce_images[d] + '?' + token + '"></div>';
                    }
                    $('#pushadd').before(imageBoxs_down);
                } else {
                    var imageBoxs_down_nine = '';
                    for (var f = 0; f < datas.introduce_images.length; f++) {
                        imageBoxs_down_nine += '<div class="imgBox"><button type="button" data-name="'+datas.introduce_images[f]+'" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                        imageBoxs_down_nine += '<img src="http://' + backend_host + datas.introduce_images[f] + '?' + token + '"></div>';
                    }
                    $('#pushadd').hide()
                    $('#pushadd').before(imageBoxs_down_nine);
                }

                $('.fsUploadProgress').on('mousemove ', '.imgBox', function () {
                    $(this).find('button').css('display', 'block');

                })
                $('.fsUploadProgress').on('mouseout ', '.imgBox', function () {
                    $(this).find('button').css('display', 'none');
                })
                $('.fsUploadProgress').on('click ', '.imgBox button', function (e) {
                    e.stopPropagation();
                    var dataName = $(this).attr('data-name');
                    console.info("data-name", dataName);
                    var index = null;
                    console.info("新的图片", images);
                    for (var i = 0; i < images_down_data.length; i++) {
                        if (dataName == images_down_data[i]) {
                            index = i
                        }
                    }
                    console.info("删除的下标", index);
                    /*if(images.indexOf(dataName) != -1){
                        images.splice(images.indexOf(dataName), 1);
                    }*/
                    images_down_data.splice(index, 1);
                    console.info("images_down_data", images_down_data);
                    $(this).parent().remove();
                    $('#pushadd').show();
                })
                newQiniu(fileUploadCompleteCallbacks, 'pushadd', 'imagebox', imagetokens().token, 1, "jpg, jpeg, gif, png");
                function fileUploadCompleteCallbacks(key, src) {
                    var imageBoxs = '';
                    if (images_down_data.length == 8) {
                        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                        imageBoxs += '<img src="' + src + '"></div>';
                        $('#pushadd').before(imageBoxs);
                        images_down_data.push(key)
                        $('#pushadd').hide()
                    } else {
                        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                        imageBoxs += '<img src="' + src + '"></div>';
                        $('#pushadd').before(imageBoxs);
                        images_down_data.push(key)
                    }
                    console.info("编辑图片4", images);
                }


                var defaultImg = '';
                var defaultData = '';
                $.each(datas.spec_list, function (i, order) {
                    defaultData += '<tr><td class="shopping-frame-details-tou-tu"> <div role="tabpanel" id="addImgs_tu' + i + '" class="tab-pane fade in active" aria-labelledby="demo-tab">';
                    defaultData += '<div  id="fsUploadProgress_tu' + i + '"><div class="imgBox"><button type="button" data-name="" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                    defaultData += '<img class="edit-default-img images" data-key="' + order.image.split('/')[3] + '" src="http://' + backend_host + order.image + '?' + token + '"></div><div class="addImg-tu edit-addImg-tou-tu" id="container_tu' + i + '">';
                    defaultData += '<a id="pickfiles_tu' + i + '" href="#" >';
                    defaultData += '<i class="glyphicon glyphicon-plus"></i>';
                    defaultData += '</a></div></div></div></td>';
                    defaultData += '<td> <input type="text" class="form-control colors" placeholder="" value=' + order.color + '></td>';
                    defaultData += '<td> <input type="text" class="form-control weight" placeholder="" value=' + order.weight + '></td>';
                    defaultData += '<td> <input type="text" class="form-control spec" placeholder="" value=' + order.spec + '></td>';
                    defaultData += '<td> <input type="text" class="form-control coin" placeholder="" value=' + order.coin + '></td>';
                    defaultData += '<td> <input type="text" class="form-control point" placeholder="" value=' + order.point + '></td>';
                    defaultData += '<td> <input type="text" class="form-control number" placeholder="" value=' + order.number + '></td>';
                    defaultData += '<td> <button class="btn btn-default shopping_frame_details_modification" data-spec_id="'+order.spec_id+'" id="shopping_frame_details_modification">修改</button></td>';
                    defaultData += '<td> <button class="btn btn-default out" data-spec_id="'+order.spec_id+'">删除</button></td></tr>';
                });
                $('table.table tbody#boxInfo').append(defaultData);
                $.each(datas.spec_list, function (i, order) {
                    console.info("头图初始化");
                    console.info("iddd", $("#container_tu0"));
                    newQiniu(fileUploadCompleteCallback, "container_tu" + i, "addImgs_tu" + i, imagetokens().token, 1, "jpg, jpeg, gif, png");
                    function fileUploadCompleteCallback(key, src) {
                        var imageBoxs = '';
                        imageBoxs += '<div class="imgBox"><button type="button" data-name="' + key + '" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
                        imageBoxs += '<img data-key="' + key + '" class="edit-default-img images" src="' + src + '"></div>';
                        $("#container_tu" + i).hide();

                        $("#container_tu" + i).before(imageBoxs);

                        // image = key;
                    }
                });

                $(".shopping_frame_details_modification").click(function () {
                    var spec_id = $(this).data("spec_id");
                    console.info("spec_id", spec_id);

                    var theimage = $(this).parent().parent().find('.images').data('key');
                    console.info("theimage", theimage);
                    var colors = $(this).parent().prev().prev().prev().prev().prev().prev().find('.colors').val();
                    console.info("colors", colors);
                    var weight = $(this).parent().prev().prev().prev().prev().prev().find('.weight').val();
                    var spec = $(this).parent().prev().prev().prev().prev().find('.spec').val();
                    var coin = $(this).parent().prev().prev().prev().find('.coin').val();
                    var point = $(this).parent().prev().prev().find('.point').val();
                    var number = $(this).parent().prev().find('.number').val();

                    if (theimage == undefined || colors == "" || weight == "" || spec == "" || coin == "" || point == "" || number == "") {
                        $("#shpping_frame_details_hint_4").css("display", "inline-block");
                        $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                        $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                    } else if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(weight) || !/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(coin)) {
                        $("#shpping_frame_details_hint_chi_cun1").css("display", "inline-block");
                        $("#shpping_frame_details_hint_4").css("display", "none");
                        $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                    } else if (!/^[0-9]*[1-9][0-9]*$/.test(point) || !/^[0-9]*[1-9][0-9]*$/.test(number)) {
                        $("#shpping_frame_details_hint_chi_cun2").css("display", "inline-block");
                        $("#shpping_frame_details_hint_4").css("display", "none");
                        $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                    } else {
                        $("#shpping_frame_details_hint_4").css("display", "none");
                        $("#shpping_frame_details_hint_chi_cun1").css("display", "none");
                        $("#shpping_frame_details_hint_chi_cun2").css("display", "none");
                        var modification_data = {
                            "spec_id": spec_id,
                            "image": theimage,
                            "color": colors,
                            "weight": parseFloat(weight),
                            "spec": spec,
                            "coin": parseFloat(coin),
                            "point": parseFloat(point),
                            "number": parseFloat(number)
                        };
                        console.info("modification_data", modification_data);
                        $.ajax({
                            type: 'PUT',
                            contentType: 'application/json',
                            url: 'http://' + backend_host + '/web/staff/goods/market/entity/spec?' + token,
                            data: JSON.stringify(modification_data),
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                errorMessage("保存成功");
                                // location.href = "/shopping/frame"
                            },
                            error: function (jqXHR) {
                                console.log(jqXHR.status);
                                errorMessage("保存失败");
                                if (jqXHR.status == 406) {

                                }
                            }

                        })
                    }
                });

                //编辑进来default页面specifications是整个父元素
                $('#specifications').on('mousemove ', '.imgBox', function () {
                    $(this).find('button').css('display', 'block');

                })
                $('#specifications').on('mouseout ', '.imgBox', function () {
                    $(this).find('button').css('display', 'none');
                })
                $('#specifications').on('click ', '.imgBox button', function (e) {
                    e.stopPropagation();
                    var dataName = $(this).attr('data-name');
                    defaultImg = '';
                    $(this).parent().next().css("display", "inline-block");
                    $(this).parent().remove();
                })


                // 新增规格尺寸的父元素
                $('#specifications').on('mousemove ', '.imgBox', function () {
                    $(this).find('button').css('display', 'block');

                })
                $('#specifications').on('mouseout ', '.imgBox', function () {
                    $(this).find('button').css('display', 'none');
                })
                $('#specifications').on('click ', '.imgBox button', function (e) {
                    e.stopPropagation();
                    $(this).parent().remove();
                    $('#container').show();
                });

                $.getJSON("http://" + backend_host + '/web/staff/goods/market/class/collection?' + token + '&with_label=true',
                    function (data) {
                        console.log(data);
                        var defaultType = "";

                        function isChecked(label_id) {
                            //console.info("isChecked", "label_id", label_id);
                            var x = datas.class_label_list.findIndex(function (item) {
                                //console.info("isChecked", "item.label_id", item.label_id);
                                return (item.label_id == label_id);
                            });
                            //console.info("isChecked", "x", x);
                            return x != -1
                        }

                        $.each(data.list, function (i, order) {

                            defaultType += '<div class="father">';
                            defaultType += '<div>' + order.name + '<span class="open">展开</span></div>';
                            defaultType += '<ul class="twocat">';
                            $.each(order.children, function (a, item) {
                                /*$.each(datas.class_label_list, function (a, index) {
                                 console.info("index.is_choose", index.is_choose);
                                 console.info("index.is_choose == true", index.is_choose == true)
                                 if (index.class_id == order.id && index.label_id == item.label_id && index.is_choose == true) {
                                 defaultType +='<li><input type="checkbox" id='+item.label_id+' class='+order.id+' checked="checked">'+item.label_name+'</li>';
                                 } else {
                                 defaultType +='<li><input type="checkbox" id='+item.label_id+' class='+order.id+'>'+item.label_name+'</li>';
                                 }
                                 });*/
                                if (isChecked(item.label_id)) {
                                    defaultType += '<li><input type="checkbox" id=' + item.label_id + ' class=' + order.id + ' checked="checked">' + item.label_name + '</li>';
                                } else {
                                    defaultType += '<li><input type="checkbox" id=' + item.label_id + ' class=' + order.id + '>' + item.label_name + '</li>';
                                }
                                //console.info("datas.class_label_list", JSON.stringify(datas.class_label_list));
                            });
                            /*$.each(order.children, function (a, item) {
                             defaultType +='<li><input type="checkbox" id='+item.label_id+' class='+order.id+'>'+item.label_name+'</li>';
                             })*/
                            defaultType += '</ul></div>';

                        });
                        $('div.category').append(defaultType);
                        $(".father").on('click', 'span', function () {
                            var Edit = $(this).html();
                            console.log(Edit);
                            if (Edit == "展开") {
                                $(this).parent().next().css({
                                    "height": "auto",
                                    'opacity': 1,
                                });
                                $(this).parent().next().children().css("display", "block");
                                $(this).html("收起");

                            } else {
                                $(this).parent().next().css({
                                    "height": "0",
                                    'opacity': 0
                                });
                                console.info("(this)", $(this).parent().next().children());
                                $(this).parent().next().children().css("display", "none");
                                $(this).html("展开");

                            }
                        })

                        $(".father ul.twocat li input").click(function (event) {
                            if (event.currentTarget.checked == true) {
                                var classId = $(this).attr("class");
                                // console.info("classId",classId);
                                var labelId = $(this).attr("id");
                                // console.info("labelId",labelId);
                                var add_data = {
                                    "goods_id": goodsId,
                                    "class_label_list": [{
                                        "class_id": classId,
                                        "label_id": labelId
                                    }]
                                };
                                $.ajax({
                                    type: 'POST',
                                    contentType: 'application/json',
                                    url: 'http://' + backend_host + '/web/staff/goods/market/entity/label?' + token,
                                    data: JSON.stringify(add_data),
                                    dataType: 'json',
                                    success: function (data) {
                                        // console.log(data);
                                        // location.href = "/shopping/frame"
                                    },
                                    error: function (jqXHR) {
                                        console.log(jqXHR.status);
                                        if (jqXHR.status == 406) {

                                        }
                                    }
                                })
                            } else {
                                var labelId_delete = $(this).attr("id");
                                $.ajax({
                                    type: 'DELETE',
                                    contentType: 'application/json',
                                    url: 'http://' + backend_host + '/web/staff/goods/market/entity/label?' + token + "&goods_label_id=" + labelId_delete + "&goods_id=" + goodsId,
                                    data: {},
                                    dataType: 'json',
                                    success: function (data) {
                                        console.info("success");
                                        // console.log(data);
                                        // location.href = "/shopping/frame"
                                    },
                                    error: function (jqXHR) {
                                        console.log(jqXHR.status);
                                        if (jqXHR.status == 406) {

                                        }
                                    }

                                })
                            }
                        })
                    });




                $("#boxInfo").on("click", '.out', function () {
                    var boxInfo_length = $("#boxInfo tr").length;
                    console.info("boxInfo_length", boxInfo_length);
                    console.info("spec_list", datas.spec_list.length);
                    if (datas.spec_list.length == 1){
                        errorMessage("删除失败");
                    } else {
                        $(this).parent().parent().remove();
                        var spec_id = $(this).data("spec_id");
                        console.info("spec_id", spec_id);
                        $.ajax({
                            type: 'DELETE',
                            contentType: 'application/json',
                            url: 'http://' + backend_host + '/web/staff/goods/market/entity/spec?' + token,
                            data: JSON.stringify({
                                "spec_id": spec_id
                            }),
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                errorMessage("删除成功");
                                location=location
                                // location.href = "/shopping/frame"
                            },
                            error: function (jqXHR) {
                                console.log(jqXHR.status);
                                errorMessage("删除失败");
                                if (jqXHR.status == 406) {

                                }
                            }

                        })
                    }
                });

                $("#boxInfo").on("click", '.add_out', function () {
                    var boxInfo_length = $("#boxInfo tr").length;
                    console.info("boxInfo_length", boxInfo_length);
                    $(this).parent().parent().remove();
                });

                $("#delete").click(function () {
                    $.ajax({
                        type: 'DELETE',
                        contentType: 'application/json',
                        url: 'http://' + backend_host + '/web/staff/goods/market/entity?' + token,
                        data: JSON.stringify({
                            "goods_id": goodsId
                        }),
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
                })


                $("#keep").click(function () {
                    var given_id = $("#shopping_frame_details_given_id").val();
                    console.info("编号", given_id)
                    var name = $("#shopping_frame_details_name").val();
                    console.info("标题", name);
                    var manufacturer = $("#shopping_frame_details_manufacturer").val();
                    console.info("厂商", manufacturer);
                    var place = $(".shopping_frame_details_select").find("option:selected").attr("id");
                    console.info("发货地1", place)
                    var postage = $(".shopping-frame-details-template").find("option:selected").attr("id");
                    console.info("postage", postage);

                    for (var c = 0; c < $('.father ul li input').length; c++) {

                        if ($('.father ul li input').eq(c).is(':checked')) {
                            var class_id = $('.father ul li input').eq(c).attr("class");
                            var label_id = $('.father ul li input').eq(c).attr("id");
                            var input_val = true

                            type_list(class_id, label_id, input_val)
                        }
                    }

                    var edit_data = {
                        "id": goodsId,
                        "given_id": parseFloat(given_id),
                        "name": name,
                        "images": image_up_data,
                        // "spec_list": list,
                        "manufacturer": manufacturer,
                        "place": place,
                        // "class_label_list": type_list_data,
                        "postage": postage,
                        "introduce_images": images_down_data
                    }
                    console.info("edit_data", edit_data);

                    $.ajax({
                        type: 'PUT',
                        contentType: 'application/json',
                        url: 'http://' + backend_host + '/web/staff/goods/market/entity?' + token,
                        data: JSON.stringify(edit_data),
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            // location.href = "/shopping/frame"
                        },
                        error: function (jqXHR) {
                            console.log(jqXHR.status);
                            if (jqXHR.status == 406) {

                            }
                        }

                    });


                    list = [];
                    type_list_data = []
                })
            })


    }
});
