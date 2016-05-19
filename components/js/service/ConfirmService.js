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
        }
        this.getNearestShopPosition = function(data){
            var shopInfoArr =  data.confimOrderInfos;
            var lnglatXY = [shopInfoArr[0].xAxis, shopInfoArr[0].yAxis];
            return lnglatXY;
        }
    }
}());