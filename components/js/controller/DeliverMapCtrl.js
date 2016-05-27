/**
 * Created by 殿麒 on 2016/4/15.
 */
(function(){
    angular.module('myApp')
        .controller('DeliverMapCtrl',DeliverMapCtrl);

    function DeliverMapCtrl($scope,
                            $q,
                            Map,
                            OperateAddressService){

        //  地图样式
        $scope.mapStyle = {
            position:"absolute",
            top:'44px',
            bottom:'220px'
        }

        //  展示地图
        Map.show();
        $scope.keywords = "";


        var titleMsg = OperateAddressService.getOperateAddress();

        //  地址信息
        var addressInfo = titleMsg.addressInfo;


        //  是否存在地址信息（如果有信息则为修改地址）
        if(addressInfo.districtAddress){                //  修改地址
            //  搜索当前名字所在地点并给出提示（跳转到searchAfterEnterPrompt方法）
            $scope.keywords = addressInfo.address;
        }else{                          //  新建地址
            //  当前位置（浏览器定位）
            Map.browserLocation($q).then(function(lnglatObj){
                var lnglatXY = [lnglatObj.position.lng,lnglatObj.position.lat];

                return Map.getLocationName($q,lnglatXY);
            }).then(function(locationNameObj){
                $scope.keywords = locationNameObj.locationName;
            });
        }

        //  获取移动后位置(高德地图bug暂时不用了)
        //Map.moveendLocation(function(lnglatXY){
        //
        //    //  获得当前地址名字
        //    Map.getLocationName($q,lnglatXY).then(function(locationNameObj){
        //        $scope.keywords = locationNameObj.locationName;
        //    });
        //});

        //  输入框中输入新的地址
        $scope.$watch("keywords",function(){
            Map.searchAfterEnterPrompt($q,"",$scope.keywords)
                .then(function(locationInfoArr){
                    $scope.locationInfoArr = locationInfoArr;
                    var lnglatXY = [locationInfoArr[0].location.lng,
                        locationInfoArr[0].location.lat];
                    Map.setMapCenter(lnglatXY);
                });
        });
        console.log(titleMsg);

        //  列表中 选择新的地址
        $scope.setNewLnglat = function(location){
            addressInfo.position_x = location.location.lng;
            addressInfo.position_y = location.location.lat;
            addressInfo.districtAddress = location.district;
            addressInfo.address = location.name;


            //  保存选择的地址信息
            OperateAddressService.setOperateAddress();
        };


        //  地图中心的标记(地图高度 = 地图距离底部220px + 头部44px)
        $scope.mapCenterMarker = {
            top:parseFloat(document.body.clientHeight - 264) / 2 - 30 + 'px'
        };
        //  设置列表框样式
        $scope.searchAddressList = {
            marginTop:'-1px',
            position:'absolute',
            top:parseFloat(document.body.clientHeight - 220)+'px',
            height:'220px',
            overflow:'hidden',
        };
    }
}());