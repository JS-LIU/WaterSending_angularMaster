/**
 * Created by 殿麒 on 2016/1/7.
 */
(function(){
    angular.module('buyWaterTicketes',['ngCookies'])
        .controller('WaterTicketesCtrl',WaterTicketesCtrl);

    function WaterTicketesCtrl($scope,WaterTicketes){
        $scope.ticketesInfo = WaterTicketes.info;
    }
}());