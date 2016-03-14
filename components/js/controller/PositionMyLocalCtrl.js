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

        //  浏览器定位
        Map.browserLocation.then(function(data){
            console.log(data);
            //  获取附近商店位置
        });

        //  获取移动后位置
        Map.moveendLocation(function(data){
            console.log(data);
        })

        //  地图中心的标记
        $scope.mapCenterMarker = {
            bottom:parseFloat($scope.mapStyle.height) / 2 + 18 + 'px'
        }

    }
}());