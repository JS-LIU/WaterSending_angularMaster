/**
 * Created by 殿麒 on 2016/1/6.
 */

(function(){
    angular.module('myApp')
        .controller('WaterTicktesCtrl',WaterTicktesCtrl);
    function WaterTicktesCtrl($scope,GetWaterTicketesList){

        GetWaterTicketesList.then(function(data){
            $scope.waterTicketesInfo = data['cardtickets'];
        })
    }
}());


