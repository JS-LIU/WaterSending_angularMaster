/**
 * Created by 殿麒 on 2016/1/7.
 */

(function(){
    angular.module('buyWaterTicketes')
        .service('WaterTicketesInfo',WaterTicketesInfo);
    function WaterTicketesInfo(){
        return localStorage.cartickets;
    }
}())