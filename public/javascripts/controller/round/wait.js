(function($){

    // {
    //     quanzi_id:
    //         string *
    //         圈子id
    //     quanzi_logo:
    //         string *
    //         圈子logo
    //     quanzi_title:
    //         string *
    //         圈子标题
    //     class_name:
    //         string *
    //         圈子类别名称
    //     class_id:
    //         string *
    //         圈子类别id
    //     owner:
    //         string *
    //         圈主
    //     introduction:
    //         string *
    //         圈子简介
    // }

    var data = {
        'quanzi_id' : '123456',
        'quanzi_logo':'/dsfds/fsdf/dsf.jpg',
        'quanzi_title':'Touchjet',
        'class_name':'',
        'class_id':'',
        'owner':'张三',
        'introduction':'哇哇哇哇哇哇'
    };
    $('#quanzi_logo').attr('src',data.quanzi_logo);
    $('#quanziTitle').text(data.quanzi_title);
    $('#owner').text(data.owner);
    $('#introduction').text(data.introduction);



    // $.ajax({
    //     type:'POST',
    //     url:"http://" + backend_host + '/auth/oauth/access_token',
    //     dataType:'json',
    //     success:function(data){
    //
    //     },
    //     error:function(jqXHR){
    //         if(jqXHR.status == 400){
    //
    //         }
    //     }
    // })
})(jQuery)