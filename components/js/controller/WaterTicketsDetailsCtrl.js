/**
 * Created by 殿麒 on 2016/5/9.
 */
(function(){
    angular.module('myApp')
        .controller('WaterTicketsDetailsCtrl',WaterTicketsDetailsCtrl);


    function WaterTicketsDetailsCtrl($scope,WaterTicketsService){
        $scope.waterTicketDetail = WaterTicketsService.getWaterTicketInfo();
    };
}());