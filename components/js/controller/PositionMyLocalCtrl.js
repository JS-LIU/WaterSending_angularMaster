/**
 * Created by 殿麒 on 2016/3/3.
 */
(function(){
    //  首页【定位】
    angular.module('myApp')
        .controller('PositionMyLocalCtrl',PositionMyLocalCtrl);
    function PositionMyLocalCtrl($scope,$q,HuipayMap,AutonaviMap){
        $scope.showMap = true;
        $scope.showCarousel = !$scope.showMap;

        //  地图
        var map = HuipayMap(AutonaviMap);

        //  地图样式
        $scope.mapStyle = map.style();

        //  浏览器定位
        map.browserLocation($q).then(function(data){
            console.log(data);
            //  获取附近商店位置
        });

        //  获取移动后位置
        map.getCurrentLocation(function(center){
            console.log(center);
            //  获取附近商店位置
        });

        //  地图中心的标记
        $scope.mapCenterMarker = {
            bottom:parseFloat($scope.mapStyle.height) / 2 + 18 + 'px'
        }

    }
}());