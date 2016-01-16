/**
 * Created by 殿麒 on 2016/1/16.
 */
(function(){
    angular.module('huipayUtil',[])
        .service('GetQueryString',GetQueryString);
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
}())
