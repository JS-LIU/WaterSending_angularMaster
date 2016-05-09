/**
 * Created by 殿麒 on 2016/5/9.
 */
(function(){
    angular.module('myApp')
        .controller('WaterTicketsDetailsCtrl',WaterTicketsDetailsCtrl);


    function WaterTicketsDetailsCtrl($scope,WaterTicketsService){
        $scope.waterTicketDetail = WaterTicketsService.getWaterTicketInfo();
        //  得到选中的优惠策略
        $scope.whichDiscountWay =  WaterTicketsService.getSpeDiscontWay($scope.waterTicketDetail.preferentialStrategyModels);

        $scope.ischooseDiscountWay = true;
        if($scope.whichDiscountWay){
            $scope.ischooseDiscountWay = false;
        }
    };
}());