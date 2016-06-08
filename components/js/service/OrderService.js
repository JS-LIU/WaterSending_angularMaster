/**
 * Created by 殿麒 on 2016/5/23.
 */
(function(){
    angular.module('OrderModule',['ngResource'])
        .service('OrderResource',OrderResource)
        .factory('OrderService',OrderService);

    function OrderResource($resource){
        return $resource('order/:operate',
            {operate:'@operate'});
    };

    function OrderService(OrderResource){
        var order = {
            new:{},
            tradeList:{},
            setOrderNum:{},
            getOrderState:{}
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
            {state:1,name:'待付款'},
            {state:2,name:'待收获'},
            {state:3,name:'待评价'},
            {state:5,name:'退货'}
        ];
        order.getOrderState = function(){
            return tradeState;
        }


        //  为用上因为付款需要页面跳转 非同一个root;以后可以优化
        var orderNum = {};
        order.setOrderNum = function(data){
            orderNum = data;
        };
        return order;
    };
}());