/**
 * Created by 殿麒 on 2016/3/15.
 */
(function(){
    //  首页【定位】
    angular.module('myApp')
        .controller('SearchLocationCtrl',SearchLocationCtrl);

    function SearchLocationCtrl($scope,
                                $q,
                                $localStorage,
                                Map,
                                AddressListener){
        $scope.keywords = "";
        var city = $localStorage.addressInfo.city;
        $scope.$watch("keywords",function(){
            Map.searchAfterEnterPrompt($q,city,$scope.keywords)
                .then(function(locationInfoArr){
                    $scope.locationInfoArr = locationInfoArr;
                });
        });


        $scope.setNewLnglat = function(location){

            var nowLocation = {
                lnglatXY:[location.location.lng,location.location.lat],
                name:location.name
            }
            AddressListener.updataLocation(nowLocation);
        }
    }
}());