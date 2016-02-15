/**
 * Created by 殿麒 on 2016/1/6.
 */

(function(){
    angular.module('myApp')
        .controller('WaterTicktesCtrl',WaterTicktesCtrl);
    function WaterTicktesCtrl($scope,GetWaterTicketesList,WaterTicketes){

        GetWaterTicketesList.then(function(data){
            //  水票信息
            $scope.waterTicketesInfo = data['cardtickets'];
        });

        //  点击水票
        $scope.saveCookies = function(item){
            WaterTicketes.saveCookies(item);
            window.location.href = 'buyWaterTicketes.html';
        }
    }
}());


