/**
 * Created by 殿麒 on 2016/1/14.
 */
(function(){
    angular.module('myWaterTicketes')
        .controller('WaterTicketesDetails',WaterTicketesDetails);
    function WaterTicketesDetails($scope,$cookieStore){
        //  水票详情
        $scope.waterTicketesDetails = JSON.parse(sessionStorage.waterTicketesDetails);
        $scope.buyWaterTicketes = function(item){
            $cookieStore.put('ticketesInfo',item);
            console.log($cookieStore.get('ticketesInfo'));
            window.location.href = 'buyWaterTicketes.html';
        }
    }
}());