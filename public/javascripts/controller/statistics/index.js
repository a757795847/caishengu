(function($){
    $('#userDate').daterangepicker()
    $('#goodsDate').daterangepicker()

    //$('#consumeAction').css('width',$('#consumeAction').clientWidth);
    var myChartSex = echarts.init(document.getElementById('sex'));
    var myChartAge = echarts.init(document.getElementById('age'));
    var myChartMap = echarts.init(document.getElementById('map'));
    var myChartCity = echarts.init(document.getElementById('city'));
    var optionSex = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['男性','女性']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:1, name:'男性'},{value:0, name:'女性'}
                ]
            }
        ]
    };


    // 使用刚指定的配置项和数据显示图表。


    var optionAge = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: '3%',
            left: '3%',
            right: '2%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'人数',
                type:'bar',
                barWidth: '70%',
            }
        ]
    };


    var convertData = function (data,datas) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = datas[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        console.log(res);
        return res;
    };

    var optionMap = {
        title: {
            text: '全国主要城市用户数量',
            subtext: 'The number of users',
            left: 'center'
        },
        tooltip : {
            trigger: 'item'
        },
        bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
                styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#999999'
                    }
                }]
            }
        },
        series : [
            {
                name: '人数',
                type: 'scatter',
                coordinateSystem: 'bmap',
                // data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'purple'
                    }
                }
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                // data: convertData(data.sort(function (a, b) {
                //     return b.value - a.value;
                // }).slice(0, 6)),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'purple',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
    };


    var optionCity = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: '3%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'人数',
                type:'bar',
                barWidth: '70%',
                data:[20, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    myChartCity.setOption(optionCity);

    var widthAction = document.getElementById('user').clientWidth;
    var widthDate = document.getElementById('sex').clientWidth
    // $('#action').css('width',widthAction);
    $('#onDate').css('width',widthDate);
    $('#inDate').css('width',widthDate);
    $('#commercial').css('width',widthAction);
   


    var myChartOnDate = echarts.init(document.getElementById('onDate'));
    var myChartInDate = echarts.init(document.getElementById('inDate'));
    var myChartCommercial = echarts.init(document.getElementById('commercial'));

    var optionOnDate = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: '3%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['1~4', '4~8', '8~12', '12~16', '16~20', '20~24'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'人数',
                type:'bar',
                barWidth: '70%',
                data:[20, 52, 200, 334, 390, 330]
            }
        ]
    };
    myChartOnDate.setOption(optionOnDate);

    var optionInDate = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: '3%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['1~4', '4~8', '8~12', '12~16', '16~20', '20~24'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'人数',
                type:'bar',
                barWidth: '70%',
                data:[20, 52, 200, 334, 390, 330]
            }
        ]
    };
    myChartInDate.setOption(optionInDate);

    var optionCommercial = {
        title: {
            text: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['在线商城','虚拟商城']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'在线商城',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90]
            },
            {
                name:'虚拟商城',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290]
            }
        ]
    };
    myChartCommercial.setOption(optionCommercial);
    
    function absolutely(num,total) {
        return parseInt(num/total*1000)/10 +'%';
    }
    $.ajax({
        type: 'GET',
        url: 'http://' + backend_host + '/web/staff/statistic/user/gender?'+ token,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('#totalUser').html(data.registered_num);
            $('#male').html(data.male+' &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+ absolutely(data.male,data.registered_num));
            $('#female').html(data.female+' &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+ absolutely(data.female,data.registered_num));
            optionSex.series[0].data = [{value:data.male, name:'男性'},{value:data.female, name:'女性'}];
            myChartSex.setOption(optionSex);
        },
        error: function (jqXHR) {
            if (jqXHR.status == 406) {

            }
        }
    })

    $.ajax({
        type: 'GET',
        url: 'http://' + backend_host + '/web/staff/statistic/user/age?'+ token,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            optionAge.xAxis[0].data = data.dataAxis;
            optionAge.series[0].data = data.data;
            myChartAge.setOption(optionAge);
        },
        error: function (jqXHR) {
            if (jqXHR.status == 406) {

            }
        }
    })

    $.ajax({
        type: 'GET',
        url: 'http://' + backend_host + '/web/staff/statistic/user/district?'+ token,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            optionMap.series[0].data = convertData(data.data , data.district_list);
            optionMap.series[1].data = convertData(data.data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 5) , data.district_list);

            myChartMap.setOption(optionMap);
        },
        error: function (jqXHR) {
            if (jqXHR.status == 406) {

            }
        }
    })


})(jQuery)