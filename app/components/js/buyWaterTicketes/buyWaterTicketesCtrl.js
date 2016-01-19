/**
 * Created by 殿麒 on 2016/1/7.
 */
(function(){
    angular.module('buyWaterTicketes',['ngCookies','huipayLogIn','huipayOrder'])
        .controller('WaterTicketesCtrl',WaterTicketesCtrl);


    function WaterTicketesCtrl($scope,$cookieStore,WaterTicketes,Login,Order){
        //  水票信息
        WaterTicketes.getInfoDetails.then(function(info){
            $scope.ticketesInfo = info.cardTicketBasicInfo;
        })

        $scope.isSelected = false;
        var preferentialStrategyId;
        //  选择套餐类型
        $scope.chooseWaterTicketes = function(item){
            var perPrice = WaterTicketes.info.price;
            var ticketesNumber = item.requireCount;

            //  水票总价
            $scope.totalMoney = WaterTicketes.calcTotleMoney(perPrice,ticketesNumber);
            preferentialStrategyId = item.id
        }

        //  确认支付
        $scope.createOrder = function(){
            if(Login.isLogIn){

                var data = {
                    accessInfo:Login.getAccessInfo($cookieStore),
                    preferentialStrategyId:preferentialStrategyId,
                    cardTicketId:WaterTicketes.info.id,
                    shopId:WaterTicketes.info.shopId,
                    total_fee:$scope.totalMoney * 100,
                    sign:'sign',
                    description:'',
                    comment:''
                }
                Order.createOrder(data).then(function(data){
                    Order.saveCookies(data);
                    window.location.href = '09-payPage.html'
                })
            }else{
                window.location.href = '07-log.html'
            }
        }
    }
}());