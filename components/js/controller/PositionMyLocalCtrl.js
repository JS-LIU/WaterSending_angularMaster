/**
 * Created by 殿麒 on 2016/3/3.
 */
(function(){
    //  首页【定位】
    angular.module('myApp')
        .controller('PositionMyLocalCtrl',PositionMyLocalCtrl);
    function PositionMyLocalCtrl($scope,Map){
        $scope.showMap = true;
        $scope.showCarousel = !$scope.showMap;

        //  地图样式
        $scope.mapStyle = Map.show;

        //  请求【默认位置】

        //  浏览器定位
        Map.browserLocation.then(function(lnglatObj){
            //  显示正在定位对话框


            var lnglatXY = [lnglatObj.position.lng,lnglatObj.position.lat];     //  当前经纬度

            //  获得当前地址名字
            Map.getLocationName(lnglatXY).then(function(locationName){

                $scope.locationName = locationName;
            });

            //  获取附近商店位置

        })


        //  获取移动后位置
        Map.moveendLocation(function(lnglatXY){
            console.log(lnglatXY);
            //  获得当前地址名字
            Map.getLocationName(lnglatXY).then(function(locationName){
                console.log(locationName);
                $scope.locationName = locationName;
            });
            //  获取附近商店的位置
        });


        //  地图中心的标记
        $scope.mapCenterMarker = {
            bottom:parseFloat($scope.mapStyle.height) / 2 + 18 + 'px'
        }

    }
}());