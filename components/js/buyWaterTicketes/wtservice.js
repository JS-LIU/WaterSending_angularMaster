/**
 * Created by 殿麒 on 2016/1/7.
 */

(function(){
    angular.module('buyWaterTicketes')
        .factory('WaterTicketes',WaterTicketes);
    function WaterTicketes($cookieStore,$resource,$q,Login){
        var defer = $q.defer();
        var info = $cookieStore.get('ticketesInfo');
        var getInfoDetails = $resource('cardticket/detail',{});
        getInfoDetails.save({},{
            accessInfo:Login.getAccessInfo($cookieStore,false),
            sign:'sign',
            cardTicketId:info.id
        },function(data){
            defer.resolve(data);
        })

        var totleMoney = function(perPrice,number){
            return perPrice * number;
        }

        return {
            info: info,
            calcTotleMoney:totleMoney,
            getInfoDetails:defer.promise
        }
    }
}());