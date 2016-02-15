/**
 * Created by 殿麒 on 2016/2/15.
 */
(function(){
    angular.module('cashOnDelivery',['ngCookies'])
        .controller('cashOnDeliverCtrl',cashOnDeliverCtrl);

    function cashOnDeliverCtrl($scope,$cookieStore){
        var cashMoney = $cookieStore.get('orderId').final_fee;
        $scope.cashMoney = cashMoney;
    }
}());