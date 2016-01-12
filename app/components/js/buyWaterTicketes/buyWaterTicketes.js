/**
 * Created by 殿麒 on 2016/1/7.
 */

(function(){
    angular.module('buyWaterTicketes',[])
        .controller('waterTicketesCtrl',waterTicketesCtrl());

    function waterTicketesCtrl($scope,WaterTicketesInfo){
        console.log(WaterTicketesInfo);
        $scope.ticketesInfo = WaterTicketesInfo;
        console.log($scope.ticketesInfo);

    }
}());