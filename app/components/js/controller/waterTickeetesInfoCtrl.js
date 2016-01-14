/**
 * Created by 殿麒 on 2016/1/13.
 */
(function(){
    angular.module('myWaterTicketes')
        .controller('WaterTicketesInfoCtrl',WaterTicketesInfoCtrl);
    function WaterTicketesInfoCtrl($scope,GetWaterTicketesInfo){
        GetWaterTicketesInfo.then(function(data){
            $scope.waterTicketesInfo = data;

        });
    }
}())