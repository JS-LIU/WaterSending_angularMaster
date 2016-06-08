/**
 * Created by liudq on 16/6/5.
 */
(function(){
    angular.module('myApp')
        .controller('NoPayCtrl',NoPayCtrl);

    function NoPayCtrl($scope,
                       $cookieStore,
                       Login,
                       OrderService){
        var accessInfo = Login.getAccessInfo($cookieStore,true);
        accessInfo.phone_num = '';
        $scope.state = OrderService.getCurrentState();

        OrderService.tradeList({
            sign:'',
            accessInfo:accessInfo,
            requestPageInfo:{
                pageSize:50,
                pageNo:1
            },
            clientOrderState:$scope.state.state
        }).then(function(data){
            console.log(data);
            $scope.tradeOrderList = data.tradeOrderList;
            $scope.toComplete = function(tradeOrder){
                if($scope.state.state == 1){
                    OrderService.toPay(tradeOrder);
                }else if($scope.state.state == 2){
                    OrderService.toConfrimRecive({
                        orderId:tradeOrder.orderId,
                        sign:'',
                        accessInfo:accessInfo
                    }).then(function(){
                        console.log('成功');
                    });
                }
            }
        });
    };
}());
