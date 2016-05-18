/**
 * Created by 殿麒 on 2016/5/17.
 */
(function(){
    angular.module('myApp')
        .service('ConfirmService',ConfirmService);

    function ConfirmService($resource){
        var confim = $resource('confim/order ',{});

        this.saveGoodsCart = function(obj){
            return confim.save({},obj).$promise;
        }
        var orderInfo = {};
        this.setOrderInfo = function(data){
            orderInfo = data;
        };
        this.getOrderInfo = function(){
            return orderInfo;
        }
        this.getNearestShopPosition = function(orderInfo){
            var shopInfoArr =  data.confimOrderInfos;
            var lnglat = [shopInfoArr[1][xAxis], shopInfoArr[1][yAxis]];
            return lnglat;

        }
    }
}());