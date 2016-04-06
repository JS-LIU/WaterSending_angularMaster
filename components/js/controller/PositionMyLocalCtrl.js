/**
 * Created by 殿麒 on 2016/3/3.
 */
(function(){
    //  首页【定位】
    angular.module('myApp')
        .controller('PositionMyLocalCtrl',PositionMyLocalCtrl);
    function PositionMyLocalCtrl($scope,
                                 $q,
                                 $localStorage,
                                 Map,
                                 $cookieStore,
                                 Login,
                                 ChangeLocation,
                                 AddressListener,
                                 DelieveryAddressService){
        $scope.showMap = true;                              //  是否显示地图
        $scope.showCarousel = !$scope.showMap;              //  是否显示轮播图
        $scope.mapStyle = {                                 //  地图大小
            position:"relative",
            height:document.body.clientWidth * 17 / 18 + 'px'
        }
        $scope.addressInfo = $localStorage.addressInfo;     //  是否重新选择过地址

        //  监听【重新选择】地址
        $scope.$watch('addressInfo',function(){
            AddressListener.updataLocation($scope.addressInfo);
        });

        //  展示地图
        Map.show();

        //  监听定位是否发生变化
        if(false){                                          //  重新选择地址
            Map.setMapCenter($scope.addressInfo.lnglatXY);  //  在地图中标记出重新选择的位置
            //  请求附近商铺

        }else{
            //  请求默认地址
            var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
            accessInfo.phone_num = "";
            var postdefnAddressData = {
                sign:"",
                accessInfo:accessInfo
            }
            DelieveryAddressService.getDefnAddress(postdefnAddressData)
                .then(function success(data){
                    //  是否有默认地址
                    if(data.isDefault){
                        //  显示默认地址
                        //  城市
                    }else{
                        //  浏览器定位
                        return Map.browserLocation($q);
                    }
                },function error(error){
                    //  未登录
                    Map.browserLocation($q);
                    console.error(error);
                }).then(function(lnglatObj){
                //  显示正在定位对话框

                var lnglatXY = [lnglatObj.position.lng,lnglatObj.position.lat];

                $scope.addressInfo.lnglatXY = lnglatXY;
                //  获得当前地址名字
                return  Map.getLocationName($q,lnglatXY);
                //  获取附近商店位置
            }).then(function(locationNameObj){
                $scope.locationName = locationNameObj.locationName;
                $scope.addressInfo.name = locationNameObj.locationName;
                $scope.addressInfo.city = locationNameObj.city;
                //  获取城市列表
                return  ChangeLocation.setAllCities();
            }).then(function(data){
                var cities = data.cities;
                $scope.huipayCity = ChangeLocation.getThisCity(cities,$scope.addressInfo.city);
            });
        }

        //  获取移动后位置
        Map.moveendLocation(function(lnglatXY){
            //  获得当前地址名字
            Map.getLocationName($q,lnglatXY).then(function(locationNameObj){
                $scope.locationName = locationNameObj.locationName;

                $scope.addressInfo = {
                    lnglatXY:lnglatXY,
                    name:locationNameObj.locationName
                }
            });
            //  获取附近商店的位置
        });

        //  地图中心的标记
        $scope.mapCenterMarker = {
            bottom:parseFloat($scope.mapStyle.height) / 2 + 18 + 'px'
        }
    }
}());