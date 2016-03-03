/**
 * Created by 殿麒 on 2016/2/29.
 */
(function(){
    angular.module('myApp')
        .service('GetMainCarouselImgs',GetMainCarouselImgs);
    function GetMainCarouselImgs($resource,$q,$cookieStore,Login){
        var data = {
            x_dpi:640,
            sign:'sign',
            city_id:850019,  //  临时定北京
            accessInfo:Login.getAccessInfo($cookieStore,false)
        }

        var defer = $q.defer();
        var GetMainCarouselImgs = $resource('act/:list',{list:'actList'});
        GetMainCarouselImgs.save({},data,function(data){
            defer.resolve(data);
        });
        return defer.promise;
    }
}());