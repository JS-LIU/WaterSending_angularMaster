/**
 * Created by 殿麒 on 2016/3/3.
 */
(function(){
    //  首页【定位】
    angular.module('myApp')
        .controller('PositionMyLocalCtrl',PositionMyLocalCtrl);
    function PositionMyLocalCtrl($scope,AutonaviMap){
        $scope.showMap = true;
        $scope.showCarousel = !$scope.showMap;

        //  地图
        AutonaviMap.map;
        AutonaviMap.browserLocation();
    }
}());