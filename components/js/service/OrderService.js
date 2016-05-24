/**
 * Created by 殿麒 on 2016/5/23.
 */
(function(){
    angular.module('myApp')
        .service('OrderResource',OrderResource)
        .factory('OrderService',OrderService);

    function OrderResource($resource){
        return $resource('order/:operate',
            {operate:'@operate'});
    };

    function OrderService(OrderResource){
        var order = {
            new:{},
            setOrderNum:{}
        };

        order.new = function(obj){
            return OrderResource.save(
                {operate:'new'},
                obj
            ).$promise;
        };
        var orderNum = {};
        order.setOrderNum = function(data){
            orderNum = data;
        };
        return order;
    };


}());