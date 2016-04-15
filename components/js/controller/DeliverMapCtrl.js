/**
 * Created by 殿麒 on 2016/4/15.
 */
(function(){
    angular.module('myApp')
        .controller('DeliverMapCtrl',DeliverMapCtrl);

    function DeliverMapCtrl($scope,$q,Map,AddressListener){
        $scope.mapStyle = {                                 //  地图大小
            position:"absolute",
            top:'44px',
            bottom:'300px'
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

        $scope.$watch("keywords",function(){
            Map.searchAfterEnterPrompt($q,"",$scope.keywords)
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


        //  地图中心的标记(地图高度 = 地图距离底部300px + 头部44px)
        $scope.mapCenterMarker = {
            top:parseFloat(document.body.clientHeight - 344) / 2 - 30 + 'px'
        }
    }
}());