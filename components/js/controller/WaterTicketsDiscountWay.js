/**
 * Created by 殿麒 on 2016/5/9.
 */
(function(){
    angular.module('myApp')
        .controller('WaterTicketsDisCountWay',WaterTicketsDisCountWay);
    function WaterTicketsDisCountWay($scope,
                                     $cookieStore,
                                     WaterTicketsService,
                                     Login){

        var waterTicketDetail = WaterTicketsService.getWaterTicketInfo();

        //  有没有打折信息
        if(waterTicketDetail.preferentialStrategyModels){
            $scope.waterTicketDetail = waterTicketDetail;
        }else{
            WaterTicketsService.waterTicketsDetail({
                accessInfo:Login.getAccessInfo($cookieStore,false),
                cardTicketId:waterTicketDetail.productId,
                sign:''
            }).then(function(data){
                var waterTicketInfo = data.cardTicketBasicInfo;
                WaterTicketsService.fixedWaterTicketsDiscountWay(waterTicketInfo.preferentialStrategyModels);
                $scope.waterTicketDetail = waterTicketInfo;
            });
        }


        //  选择指定类型
        $scope.selectDiscontWay = function(discountWay){
            WaterTicketsService.chooseDiscountWay(
                $scope.waterTicketDetail.preferentialStrategyModels,discountWay);
        };

        //  选定指定类型
        $scope.choosediscountWay = function(){
            WaterTicketsService.setWaterTicketInfo($scope.waterTicketDetail);
        }
    }
}());