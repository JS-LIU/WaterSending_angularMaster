/**
 * Created by 殿麒 on 2016/5/23.
 */
(function(){
    angular.module('OrderModule',['ngResource','ngCookies'])
        .service('OrderResource',OrderResource)
        .factory('OrderService',OrderService);

    function OrderResource($resource){
        return $resource('order/:operate',
            {operate:'@operate'});
    };

    function OrderService($cookieStore,$resource,OrderResource){
        var order = {
            new:{},
            tradeList:{},
            setOrderNum:{},
            getOrderState:{},
            setCurrentState:{},
            getCurrentState:{},
            completeOrder:{}
        };

        order.new = function(obj){
            return OrderResource.save(
                {operate:'new'},
                obj
            ).$promise;
        };

        order.tradeList = function(obj){
            return OrderResource.save(
                {operate:'tradelist'},
                obj
            ).$promise;
        };

        //  订单状态
        var tradeState = [
            {state:1,name:'付款'},
            {state:2,name:'收货'},
            {state:3,name:'评价'}
        ];
        order.getOrderState = function(){
            return tradeState;
        }
        order.toPay = function(orderInfo){
            var orderInfo = {
                orderId:orderInfo.orderId,
                final_fee:orderInfo.final_fee
            }
            $cookieStore.put('orderId',orderInfo);
            window.location.href = '09-payPage.html';
        };
        order.toConfrimRecive = function(obj){
            var recv = $resource('user/recv',{});
            return recv.save({},obj).$promise;
        };
        order.toCommit = function(){
            console.log('暂时不支持评价');
        }
        var currentState = {};
        order.setCurrentState = function(data){
            currentState = data;
        };
        order.getCurrentState = function(){
            return currentState;
        };



        //  为用上因为付款需要页面跳转 非同一个root;以后可以优化
        var orderNum = {};
        order.setOrderNum = function(data){
            orderNum = data;
        };
        return order;
    };
}());