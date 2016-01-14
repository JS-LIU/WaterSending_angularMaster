/**
 * Created by 殿麒 on 2016/1/7.
 */

(function(){
    angular.module('buyWaterTicketes')
        .factory('WaterTicketes',WaterTicketes);
    function WaterTicketes($cookieStore){
        var info = $cookieStore.get('ticketesInfo');

        var totleMoney = function(perPrice,number){
            return perPrice * number;
        }

        return {
            info: info,
            calcTotleMoney:totleMoney
        }
    }
}())