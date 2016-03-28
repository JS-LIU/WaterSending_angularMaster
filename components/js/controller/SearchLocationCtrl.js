/**
 * Created by 殿麒 on 2016/3/15.
 */
(function(){
    //  首页【定位】
    angular.module('myApp')
        .controller('SearchLocationCtrl',SearchLocationCtrl);

    function SearchLocationCtrl($scope,$q,Map){
        $scope.keywords = "";
        $scope.$watch("keywords",function(){
            Map.searchAfterEnterPrompt($q,$scope.keywords).then(function(locationInfoArr){
                $scope.locationInfoArr = locationInfoArr;
            });
        });
    }
}());