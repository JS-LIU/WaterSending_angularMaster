/**
 * Created by 殿麒 on 2016/5/6.
 */
(function(){
    angular.module('myApp')
        .controller('WaterTicketsCtrl',WaterTicketsCtrl);
    function WaterTicketsCtrl($scope,
                              $cookieStore,
                              $localStorage,
                              Login,
                              WaterTicketsService){
        $scope.addressInfo = $localStorage.addressInfo;


        var accessInfo = Login.getAccessInfo($cookieStore,false);
        var requestPageInfo = {
            pageSize: 10,
            pageNo: 1
        };
        var positionInfo = {
            position_x:$scope.addressInfo.lnglatXY[0],
            position_y:$scope.addressInfo.lnglatXY[1],
            districtId:$scope.addressInfo.cityId,
            phoneCode:""
        }

        WaterTicketsService.waterTicketsList({
            accessInfo:accessInfo,
            requestPageInfo:requestPageInfo,
            positionInfo:positionInfo,
            sign:''
        }).then(function(data){
            console.log(data);
            $scope.waterTicketesInfo = data.cardtickets;
        });


        $scope.setTicketInfo = function(waterticket){
            WaterTicketsService.fixedWaterTicketsDiscountWay(waterticket.preferentialStrategyModels);
            WaterTicketsService.setWaterTicketInfo(waterticket);
        };
    }
}());