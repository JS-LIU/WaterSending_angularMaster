/**
 * Created by 殿麒 on 2016/1/13.
 */
(function(){
    angular.module('myWaterTicketes')
        .service('GetWaterTicketesInfo',GetWaterTicketesInfo);
    function GetWaterTicketesInfo($resource,$q,$cookieStore,Login){
        var defer = $q.defer();
        var GetWaterTicketesInfo = $resource('http://114.251.53.22/huipaywater/usercardticket/list',{});
        var requestPageInfo = {
            "pageSize": 100,
            "pageNo": 1
        }
        GetWaterTicketesInfo.save({},{
            accessInfo:Login.getAccessInfo($cookieStore,true),
            requestPageInfo:requestPageInfo,
            sign:'sign'
        },function(data){
            defer.resolve(data);
        });
        return defer.promise;
    }
}())