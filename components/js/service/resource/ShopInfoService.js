/**
 * Created by 殿麒 on 2016/4/25.
 */
(function(){
    angular.module('myApp')
        .service('ShopInfoResource',ShopInfoResource)
        .factory('ShopInfoService',ShopInfoService);

    function ShopInfoResource($resource){
        return $resource('shop/:operate',
            {operate:'@operate'});
    }

    function ShopInfoService(ShopInfoResource){
        var shopInfo = {
            nearestShopInfo:{},
            setSpeShopInfo:{},
            getSpeShopInfo:{},
            shopDetail:{},
            productList:{}
        }
        var speShopInfo = {}
        //  最近一家商店信息
        shopInfo.nearestShopInfo = function(obj){
            return ShopInfoResource.save(
                {operate:'orderwater'},
                obj
            ).$promise
        }

        shopInfo.setSpeShopInfo = function(obj){
            speShopInfo = obj;
        }

        shopInfo.getSpeShopInfo = function(){
            return speShopInfo;
        }

        shopInfo.productList = function(obj){
            return ShopInfoResource.save(
                {operate:'productList'},
                obj
            ).$promise
        }

        return shopInfo;
    }


}());