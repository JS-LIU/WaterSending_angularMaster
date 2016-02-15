/**
 * Created by 殿麒 on 2016/1/13.
 */
(function(){
    angular.module('myWaterTicketes')
        .controller('WaterTicketesInfoCtrl',WaterTicketesInfoCtrl);
    function WaterTicketesInfoCtrl($scope,GetWaterTicketesInfo){
        //  我的水票
        GetWaterTicketesInfo.then(function(data){
            $scope.waterTicketesInfo = data;
        });

        //  点击水票
        $scope.waterDetails = function(item){
            sessionStorage.waterTicketesDetails = JSON.stringify(item);
        }
    }
}())