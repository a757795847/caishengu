(function ($) {
    var province = ['香港特别行政区','澳门特别行政区','北京市','上海市','天津市','重庆市','台湾省','广东省','江苏省','山东省','浙江省','河南省','四川省',
        '河北省','湖北省','湖南省','辽宁省','福建省','安徽省','陕西省','内蒙古自治区','广西壮族自治区','江西省','黑龙江省','吉林省','云南省','山西省',
        '贵州省','新疆维吾尔自治区','甘肃省','海南省','宁夏回族自治区','西藏自治区','青海省','西藏自治区'];
    var mailTbody = '';
    for(var i=0;i<province.length;i++){
        mailTbody += '<tr><th>'+province[i]+'</th><th><input type="text" value="10">元</th><th><input type="text" value="5">元</th></tr>'
    }
    $('#mailTbody').html(mailTbody);
})(jQuery)