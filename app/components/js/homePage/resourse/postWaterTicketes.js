/**
 * Created by 殿麒 on 2016/1/12.
 */
(function(){
    angular.module('myApp')
        .service('GetWaterTicketesList',function($rootScope,$resource,$q,getAccessInfo){
            var defer = $q.defer();
            var requestPageInfo = {
                pageSize:5,
                pageNo:1
            }
            var positionInfo = {
                position_x: "116.405285",
                position_y: "39.904989",
                addressInfo: "北京市东城区东华门街道公安部",
                districtId: "850019"
            }
            //  这个接口后台写的不好
            var waterTicketesList = $resource('http://114.251.53.22/huipaywater/cardticket/list',{});

            waterTicketesList.save({},{
                accessInfo:getAccessInfo.accessInfo,
                requestPageInfo:requestPageInfo,
                sign:'sign',
                //positionInfo:$rootScope.LNGLAT
                positionInfo:positionInfo
            },function(data){
                defer.resolve(data);
            });
            return defer.promise;
        })
}())