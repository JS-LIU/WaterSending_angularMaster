/**
 * Created by 殿麒 on 2016/1/12.
 */
(function(){
    angular.module('myApp')
        .service('GetWaterTicketesList',function($rootScope,$resource,$cookieStore,$q,Login){
            var defer = $q.defer();
            var requestPageInfo = {
                pageSize:5,
                pageNo:1
            }
            var waterTicketesList = $resource('cardticket/list',{});

            waterTicketesList.save({},{
                accessInfo:Login.getAccessInfo($cookieStore,false),
                requestPageInfo:requestPageInfo,
                sign:'sign',
                positionInfo:$rootScope.LNGLAT,
            },function(data){
                defer.resolve(data);
            });
            return defer.promise;
        })
}())