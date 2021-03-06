/**
 * Created by liudq on 16/4/7.
 */
(function(){
    //  首页【定位】
    angular.module('myApp')
        .controller('PositionMyLocalCtrl',PositionMyLocalCtrl);
    function PositionMyLocalCtrl($scope,
                                 $q,
                                 $localStorage,
                                 $cookieStore,
                                 Map,
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
        var defndata;
        //  未登录的accessInfo;
        var noLogaccessInfo = Login.getAccessInfo($cookieStore,false);
        noLogaccessInfo.phone_num = "";

        //  监听【重新选择/移动】地址
        $scope.$watch('addressInfo',function(){
            var addressInfo = $scope.addressInfo;
            var lnglatXY = $scope.addressInfo.lnglatXY;
            //  城市
            Map.getLocationName($q,lnglatXY).then(function(locationNameObj){
                $scope.city = locationNameObj.city;
                addressInfo.district = locationNameObj.district;
                return  ChangeLocation.setAllCities();
            }).then(function(data){
                var cities = data.cities;
                var city = ChangeLocation.getThisCity(cities,$scope.city);
                addressInfo.city = $scope.city;
                addressInfo.cityId = city.id;
            });
            //  控制台 打印当前地址
            console.log(addressInfo);
            //  减少请求发起次数
            if($scope.addressInfo.city){
                var positionInfo = {
                    position_x:addressInfo.lnglatXY[0],
                    position_y:addressInfo.lnglatXY[1],
                    districtId:addressInfo.cityId,
                    addressInfo:addressInfo.name
                };
                var postshopList = {
                    accessInfo:noLogaccessInfo,
                    requestPageInfo: {
                        pageSize:10,
                        pageNo:1
                    },
                    sign:'',
                    x_dpi:'640',
                    positionInfo:positionInfo
                };
                //  获取附近店铺位置
                GetNearShopService.getShopList(postshopList)
                    .then(function(data){
                        var shopList = data.shopList;
                        //  绘制附近店铺位置
                        GetNearShopService.showShopInMap(shopList,
                            "components/images/icon_location_blue@2x.png");
                });
            }
            AddressListener.updataLocation(addressInfo);
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
            Map.setMapCenter($scope.addressInfo.lnglatXY);  //  在地图中标记出重新选择的位置
        }else{
            //  请求默认地址
            var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
            accessInfo.phone_num = "";
            var postdefnAddressData = {
                sign:"",
                accessInfo:accessInfo
            };
            DelieveryAddressService.getDefnAddress(postdefnAddressData)
                .then(function success(data){
                    //  是否有默认地址
                    if(data.isDefault){
                        defndata = data;
                        console.log(data);
                        //  显示默认地址
                        var lnglatXY = [data.position_x,data.position_y];
                        $scope.addressInfo.lnglatXY = lnglatXY;
                        $scope.addressInfo.name = data.fullAddress;
                        $scope.addressInfo.cityId = data.cityId;
                        $scope.addressInfo.addressId = data.addressId;
                        //  当前地址名字
                        Map.getLocationName($q,lnglatXY).then(function(data){
                            $scope.addressInfo.city = data.city;
                            //  获取城市列表
                            ChangeLocation.setAllCities();
                        });
                        Map.setMapCenter($scope.addressInfo.lnglatXY);
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
        };

        //  获取移动后位置
        Map.moveendLocation(function(lnglatXY){
            if(defndata &&(lnglatXY[0] == defndata.position_x || lnglatXY[1] == defndata.position_y)){
                $scope.locationName = defndata.fullAddress;
                $scope.addressInfo.lnglatXY = [defndata.position_x,defndata.position_y];
                $scope.addressInfo.name = defndata.fullAddress;
            }else{
                //  获得当前地址名字
                Map.getLocationName($q,lnglatXY).then(function(locationNameObj){
                    $scope.locationName = locationNameObj.locationName;
                    $scope.addressInfo.lnglatXY = lnglatXY;
                    $scope.addressInfo.name = locationNameObj.locationName;
                    $scope.addressInfo.addressId = locationNameObj.addressId;
                    $scope.addressInfo.district = locationNameObj.district;
                });
            }
        });
        $cookieStore.put('lastPage','#/');


        //  地图中心的标记(地图高度 = 地图距离底部160px + 头部44px)
        $scope.mapCenterMarker = {
            top:parseFloat(document.body.clientHeight - 204) / 2 - 30 + 'px'
        }


        //  切换地图
        $scope.showMap = true;

        $scope.cutMap = function(){

            $scope.showMap = !$scope.showMap;

        };
    }
}());