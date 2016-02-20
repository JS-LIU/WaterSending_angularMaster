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

        var preferentialStrategyId,                     //  优惠策略
            buyWaterTicketesNum;                        //  购买水票总张数
        //  选择套餐类型
        $scope.chooseWaterTicketes = function(item,items){
            var perPrice = WaterTicketes.info.price;
            var ticketesNumber = item.requireCount;
            //  水票总价
            $scope.totalMoney = WaterTicketes.calcTotleMoney(perPrice,ticketesNumber);
            preferentialStrategyId = item.id;
            buyWaterTicketesNum = ticketesNumber + item.giveCount;
            console.log(items);
            for(var i = 0 ;i < items.length; i++){
                items[i].isSelect = false;
            }
            item.isSelect = true;

        }

        //  确认支付
        $scope.createOrder = function(){
            if(Login.isLogIn){

                var data = {
                    accessInfo:Login.getAccessInfo($cookieStore,true),
                    preferentialStrategyId:preferentialStrategyId,
                    cardTicketId:WaterTicketes.info.id,
                    shopId:WaterTicketes.info.shopId,
                    total_fee:$scope.totalMoney * 100,
                    sign:'sign',
                    description:'',
                    comment:'',
                    itemNum:buyWaterTicketesNum
                }
                Order.createOrder(data,'ticketorder').then(function(data){
                    Order.saveCookies(data);
                    window.location.href = '09-payPage.html'
                })
            }else{
                window.location.href = '07-log.html'
            }
        }
    }
}());