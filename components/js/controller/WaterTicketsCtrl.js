/**
 * Created by 殿麒 on 2016/5/6.
 */
(function(){
    angular.module('myApp')
        .controller('WaterTicketsCtrl',WaterTicketsCtrl);
    function WaterTicketsCtrl($scope,
                              $cookieStore,
                              $localStorage,
                              Login,
                              WaterTicketsService){

        var accessInfo = Login.getAccessInfo($cookieStore,false);
        var requestPageInfo = {
            pageSize: 10,
            pageNo: 1
        };
        var positionInfo = {
            position_x:$localStorage.addressInfo.lnglatXY[0],
            position_y:$localStorage.addressInfo.lnglatXY[1],
            districtId:$localStorage.addressInfo.cityId,
            phoneCode:""
        }

        WaterTicketsService.waterTicketsList({
            accessInfo:accessInfo,
            requestPageInfo:requestPageInfo,
            positionInfo:positionInfo
        }).then(function(data){
            console.log(data);
        });

    }
}());