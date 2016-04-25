/**
 * Created by 殿麒 on 2016/3/8.
 */
(function(){
    angular.module('myApp')
        .factory('GetNearShopService',GetNearShopService);
    function GetNearShopService($resource,
                                $cookieStore,
                                Login,
                                Map){
        var getNearShop = $resource('shopList/shop');

        var nearShop = {
            getShopList:{},
            showShopInMap:{},
            nearestShop:{}
        }

        //  获取店铺列表
        nearShop.getShopList = function(addressInfo,func){
            return getNearShop.save({
                accessInfo:Login.getAccessInfo($cookieStore,false),
                requestPageInfo: {
                    pageSize:5,
                    pageNo:1
                },
                sign:'',
                x_dpi:'640',
                positionInfo:addressInfo
            },function(data){
                func(data);
            });
        }

        //  附近店铺展示到地图
        nearShop.showShopInMap = function(arr,icon){
            Map.clearMarker();
            for(var i = 0;i < arr.length;i++){
                var poArr = [arr[i].xAxis,arr[i].yAxis];
                Map.addMarker(icon,poArr);
            }
        }

        var nearestShop = $resource('shop/orderwater');
        //  最近的店铺
        nearShop.nearestShop = function(obj){
            return nearestShop.save({},obj).$promise;
        }


        return nearShop;
    }
}());