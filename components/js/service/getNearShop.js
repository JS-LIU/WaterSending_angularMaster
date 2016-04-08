/**
 * Created by 殿麒 on 2016/3/8.
 */
(function(){
    angular.module('myApp')
        .factory('GetNearShopService',GetNearShopService);
    function GetNearShopService($resource,
                                $q,
                                $localStorage,
                                $cookieStore,
                                Login,
                                Map){
        var defer = $q.defer();
        var getNearShop = $resource('shopList/shop');

        var nearShop = {
            getShopList:defer.promise,
            showShopInMap:{}
        }

        //  获取店铺列表
            nearShop.getShopList = function(){

            return getNearShop.save({
                accessInfo:Login.getAccessInfo($cookieStore,false),
                requestPageInfo: {
                    pageSize:5,
                    pageNo:1
                },
                sign:'',
                x_dpi:'640',
                positionInfo:{
                    position_x:$localStorage.addressInfo.lnglatXY[0],
                    position_y:$localStorage.addressInfo.lnglatXY[1],
                    districtId:$localStorage.addressInfo.cityId,
                    addressInfo:$localStorage.addressInfo.name
                }
            },function(data){
                defer.resolve(data);
            });
            //  获取附近商店
        }

        //  附近店铺展示到地图
        nearShop.showShopInMap = function(arr,icon){
            Map.clearMaker();
            console.log(arr);
            for(var i = 0;i < arr.length;i++){
                var poArr = [arr[i].xAxis,arr[i].yAxis];
                Map.addMarker(icon,poArr);
            }
        }
        //

        return nearShop;
    }
}());