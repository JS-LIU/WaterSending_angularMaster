/**
 * Created by liudq on 16/4/7.
 */
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
                                 DelieveryAddressService,
                                 GetNearShopService){
        $scope.showMap = true;                              //  是否显示地图
        $scope.showCarousel = !$scope.showMap;              //  是否显示轮播图
        $scope.mapStyle = {                                 //  地图大小
            position:"absolute",
            top:'44px',
            bottom:'160px'
        }
        $scope.addressInfo = $localStorage.addressInfo;     //  是否重新选择过地址

        //  监听【重新选择/移动】地址
        $scope.$watch('addressInfo',function(){
            AddressListener.updataLocation($scope.addressInfo);

            //  控制台 打印当前地址
            console.log($scope.addressInfo);

            //  减少请求发起次数
            if($scope.addressInfo.city){
                var positionInfo = {
                    position_x:$scope.addressInfo.lnglatXY[0],
                    position_y:$scope.addressInfo.lnglatXY[1],
                    districtId:$scope.addressInfo.cityId,
                    addressInfo:$scope.addressInfo.name
                }
                //  获取附近店铺位置
                GetNearShopService.getShopList(positionInfo,function(data){
                    var shopList = data.shopList;
                    //  绘制附近店铺位置
                    GetNearShopService.showShopInMap(shopList,
                        "components/images/icon_location_blue@2x.png");
                });
            }
        },true);
        //  展示地图
        Map.show();

        /**
         *  由于程序bug 如果没有当前城市则认为刚打开APP
         *  应该判断$scope.addressInfo是否为空对象
         *  是否是首次进入APP
         *
          */
        if($scope.addressInfo.city){
            console.log(1);
            Map.setMapCenter($scope.addressInfo.lnglatXY);  //  在地图中标记出重新选择的位置
        }else{
            console.log(2);
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
                        var lnglatXY = [data.position_x,data.position_y];
                        $scope.addressInfo.lnglatXY = lnglatXY;
                        $scope.addressInfo.name = data.fullAddress;
                        $scope.addressInfo.cityId = data.cityId;
                        //  当前地址名字
                        Map.getLocationName($q,lnglatXY).then(function(data){
                            $scope.addressInfo.city = data.city;
                            //  获取城市列表
                            ChangeLocation.setAllCities();
                        });

                    }else{
                        //  浏览器定位
                        return Map.browserLocation($q);
                    }
                },function error(error){
                    console.error(error);
                    //  未登录
                    return Map.browserLocation($q);
                }).then(function(lnglatObj){
                if(lnglatObj){
                    //  显示正在定位对话框
                    var lnglatXY = [lnglatObj.position.lng,lnglatObj.position.lat];
                    $scope.addressInfo.lnglatXY = lnglatXY;
                }
                //  获得当前地址名字
                return  Map.getLocationName($q,lnglatXY);
            }).then(function(locationNameObj){
                if(locationNameObj){
                    $scope.addressInfo.name = locationNameObj.locationName;
                    $scope.city = locationNameObj.city;
                }
                //  获取城市列表
                return  ChangeLocation.setAllCities();
            }).then(function(data){
                var cities = data.cities;
                var city = ChangeLocation.getThisCity(cities,$scope.city);
                $scope.addressInfo.city = city.label;
                $scope.addressInfo.cityId = city.id;
            });
        }

        //  获取移动后位置
        Map.moveendLocation(function(lnglatXY){
            //  获得当前地址名字
            Map.getLocationName($q,lnglatXY).then(function(locationNameObj){
                $scope.locationName = locationNameObj.locationName;

                $scope.addressInfo.lnglatXY = lnglatXY;
                $scope.addressInfo.name = locationNameObj.locationName
            });
        });

        //  地图中心的标记(地图高度 = 地图距离底部160px + 头部44px)
        $scope.mapCenterMarker = {
            top:parseFloat(document.body.clientHeight - 204) / 2 - 30 + 'px'
        }
    }
}());