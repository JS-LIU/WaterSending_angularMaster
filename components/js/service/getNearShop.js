/**
 * Created by 殿麒 on 2016/3/8.
 */
(function(){
    angular.module('myApp')
        .factory('GetNearShopService',GetNearShopService);
    function GetNearShopService($resource,
                                Map){
        var getNearShop = $resource('shopList/shop');

        var nearShop = {
            getShopList:{},
            showShopInMap:{}
        }

        //  获取店铺列表
        nearShop.getShopList = function(obj){
            return getNearShop.save({},obj).$promise;
        }

        //  附近店铺展示到地图
        nearShop.showShopInMap = function(arr,icon){
            Map.clearMarker();
            for(var i = 0;i < arr.length;i++){
                var poArr = [arr[i].xAxis,arr[i].yAxis];
                Map.addMarker(icon,poArr);
            }
        }

        return nearShop;
    }
}());