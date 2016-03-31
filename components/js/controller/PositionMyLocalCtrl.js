/**
 * Created by 殿麒 on 2016/3/3.
 */
(function(){
    //  首页【定位】
    angular.module('myApp')
        .controller('PositionMyLocalCtrl',PositionMyLocalCtrl);
    function PositionMyLocalCtrl($scope,$q,Map,$localStorage,ChangeLocation,AddressListener){
        $scope.showMap = true;
        $scope.showCarousel = !$scope.showMap;

        Map.show();


        $scope.addressInfo = $localStorage.addressInfo;

        //  监听定位是否发生变化
        $scope.$watch('addressInfo',function(){
            AddressListener.updataLocation($scope.addressInfo);
        });

        //  拿到当前地址经纬度
        //  地图样式
        $scope.mapStyle = Map.setStyle();
        //  请求【默认位置】


        if($scope.addressInfo.lnglatXY){
            Map.setCenter($scope.addressInfo.lnglatXY);
        }else{
            //  浏览器定位
            Map.browserLocation($q).then(function(lnglatObj){
                //  显示正在定位对话框

                var lnglatXY = [lnglatObj.position.lng,lnglatObj.position.lat];     //  当前经纬度


                //  获得当前地址名字
                Map.getLocationName($q,lnglatXY).then(function(locationNameObj){
                    $scope.locationName = locationNameObj.locationName;

                    $scope.addressInfo = {
                        lnglatXY:lnglatXY,
                        name:locationNameObj.locationName
                    }

                    //  获取城市列表
                    ChangeLocation.setAllCities().then(function(data){
                        var cities = data.cities;
                        $scope.huipayCity = ChangeLocation.getThisCity(cities,locationNameObj.city);
                    });
                });
                //  获取附近商店位置


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