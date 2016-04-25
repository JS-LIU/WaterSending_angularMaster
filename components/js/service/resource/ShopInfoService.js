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
            shopDetail:{}
        }
        //  最近一家商店信息
        shopInfo.nearestShopInfo = function(obj){
            return ShopInfoResource.save(
                {operate:'orderwater'},
                obj
            ).$promise
        }

        var speShopInfo = {

        }

        shopInfo.setSpeShopInfo = function(obj){
            speShopInfo = obj;
        }

        shopInfo.getSpeShopInfo = function(){
            return speShopInfo;
        }
        return shopInfo;
    }


}());