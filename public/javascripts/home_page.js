/**
 * Created by lichen on 17/2/20.
 */
$(function () {
    $.ajax({
        type: 'GET',
        url: "http://" + backend_host + '/web/shop/finance?access_token=bc68993384c8eb7c70e15a897cae0c2f',
        dataType: 'json',
        data:{
            "page":0,
            "limit":5
        },
        success: function (data) {
            console.log(data);
            var tbody = "";

            $.each(data.list,function (i, order){
                    tbody += '<tr><td><p style="height:36px;padding:10px"><span class="lt">' + order.finance_type + '</span><span class="rg">' + order.money + '财神币</span></p>'
                    tbody += '<p style="height:36px;padding:10px"><span class="lt">来源:</span><span class="lt">' + order.from_name + '</span><span class="lt">' + order.from_id + '</span>'
                    tbody += '<span class="rg">' + order.datetime + '</span></p></td></tr>'

            });
            $('#Table').append(tbody);

        }

    });


    function indexAjxa(index,size){
        $.getJSON("http://" + backend_host + '/web/shop/finance?access_token=bc68993384c8eb7c70e15a897cae0c2f',
            {
                "page":index,
                "limit":size
            },
            function (data) {
                var tbody = "";
                $.each(data.list,function (i, order){
                    tbody += '<tr><td><p style="height:36px;padding:10px"><span class="lt">' + order.finance_type + '</span><span class="rg">+' + order.money + '</span></p>'
                    tbody += '<p style="height:36px;padding:10px"><span class="lt">来源:</span><span class="lt">' + order.from_name + '</span><span class="lt">' + order.from_id + '</span>'
                    tbody += '<span class="rg">' + order.datetime + '</span></p></td></tr>'

                });
                $('#Table').html(tbody);
            }
        )
    }


    $("#jqueryPage").pagination({
        count: 10, //总数
        size:5, //每页数量
        index: 1,//当前页
        lrCount: 3,//当前页左右最多显示的数量
        lCount: 1,//最开始预留的数量
        rCount: 1,//最后预留的数量
        callback: function (options) {
            var index = options.index -1;
            var size = options.size;
            indexAjxa(index,size);
            //options.count = 300;
            //return options;
        }
    });

    //日历插件
    $('#home_page_export').click(function(){
        if($('#eacl').is(':hidden')){
            $('#eacl').show();}
        else{$('#eacl').hide();}
    });
    $("#clear").click(function(){
        $("#eacl input").val("");
    });
    $(function () {
        $('#datepicker').datepicker({
            autoclose: true
        });
        $('#Kobe').datepicker({
            autoclose: true
        });
    });

    $("#merchart_history_close").click(function () {
        $("#eacl").css("display", "none");
    });

    $("#comfirm").click(function () {
        var startTime = $("#datepicker").val();
        var endTime = $("#Kobe").val();

        var arr_start = startTime.split("-");
        var starttime = new Date(arr_start[0], arr_start[1], arr_start[2]);
        var starttimes = starttime.getTime();


        var arr_end = endTime.split("-");
        var endtime = new Date(arr_end[0], arr_end[1], arr_end[2]);
        var endtimes = endtime.getTime();


        if (startTime == ""  || endTime == "") {
            $("#home_page_time_message").css("display", "none");
            $("#home_page_message").css("display", "block");
        } else if (starttimes > endtimes) {
            $("#home_page_message").css("display", "none");
            $("#home_page_time_message").css("display", "block");
        } else {
            $("#home_page_message").css("display", "none");
            $("#home_page_time_message").css("display", "none");
            location.href = "http://" + backend_host + '/web/shop/finance/output?&access_token=bc68993384c8eb7c70e15a897cae0c2f' + "&start_date=" + startTime + "&end_date=" + endTime
        }
    });

    $("#verification_btn").click(function () {
        var input_val =  $("#verification_input").val();
        if (input_val == "") {
            $("#verification_message").css("display", "block");
        } else {
            console.info("todo")
        }
    });

});