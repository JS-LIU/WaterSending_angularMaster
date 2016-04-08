/**
 * Created by 殿麒 on 2016/3/8.
 */
(function(){
    angular.module('myApp')
        .service('GetNearShopService',GetNearShopService);
    function GetNearShopService($resource,
                                $q,
                                $localStorage,
                                $cookieStore,
                                Login){
        var defer = $q.defer();
        var getNearShop = $resource('shopList/shop');

        this.shopList = function(){

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
                return defer.promise;
            });
            //  获取附近商店
        }
    }
}());