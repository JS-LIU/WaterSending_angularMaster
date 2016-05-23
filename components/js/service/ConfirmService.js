/**
 * Created by 殿麒 on 2016/5/17.
 */
(function(){
    angular.module('myApp')
        .service('ConfirmService',ConfirmService);

    function ConfirmService($resource){
        var getConfirmOrder = $resource('confim/order',{});

        this.saveGoodsCart = function(obj){
            return getConfirmOrder.save({},obj).$promise;
        }
        var orderInfo = {};
        this.setOrderInfo = function(data){
            orderInfo = data;
        };
        this.getOrderInfo = function(){
            return orderInfo;
        };
        this.getFirstShopPosition = function(data){
            var shopInfoArr =  data.confimOrderInfos;
            var lnglatXY = [shopInfoArr[0].xAxis, shopInfoArr[0].yAxis];
            return lnglatXY;
        };
        this.fixedOrderInfo = function(){
            var orderItems = [];
            for(var i = 0;i < orderInfo.confimOrderInfos.length;i++){
                for(var j = 0;j < orderInfo.confimOrderInfos[i].orderItems.length;j++){
                    //for(var prop in orderInfo.confimOrderInfos[i].orderItems[j]){
                    //    if(orderInfo.confimOrderInfos[i].orderItems[j][prop] == null){
                    //        orderInfo.confimOrderInfos[i].orderItems[j][prop] = "";
                    //    }
                    //}
                    orderItems.push(orderInfo.confimOrderInfos[i].orderItems[j]);
                }
            };
            return orderItems;
        };

    };
}());