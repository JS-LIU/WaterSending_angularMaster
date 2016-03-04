/**
 * Created by 殿麒 on 2016/3/3.
 */
(function(){
    //  首页【定位】
    angular.module('myApp')
        .controller('PositionMyLocalCtrl',PositionMyLocalCtrl);
    function PositionMyLocalCtrl($scope){
        $scope.showMap = true;
        $scope.showCarousel = !$scope.showMap;

    }
}());