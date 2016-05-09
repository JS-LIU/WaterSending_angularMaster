/**
 * Created by 殿麒 on 2016/5/9.
 */
(function(){
    angular.module('myApp')
        .controller('WaterTicketsDisCountWay',WaterTicketsDisCountWay);
    function WaterTicketsDisCountWay($scope,WaterTicketsService){
        $scope.waterTicketDetail = WaterTicketsService.getWaterTicketInfo();

        //  选择指定类型
        $scope.selectDiscontWay = function(discountWay){
            WaterTicketsService.chooseDiscountWay(
                $scope.waterTicketDetail.preferentialStrategyModels,discountWay);
        }

        //  选定指定类型
        $scope.choosediscountWay = function(){
            WaterTicketsService.setWaterTicketInfo($scope.waterTicketDetail);
        }
    }
}())