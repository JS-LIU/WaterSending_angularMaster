/**
 * Created by 殿麒 on 2016/1/13.
 */
(function(){
    angular.module('huipayOrder',['ngResource','ngCookies','huipayLogIn'])
        .factory('Order',Order)

    function Order($resource,$q,$cookieStore){
        var createOrder = function(obj,url){
            var defer = $q.defer();
            var order = $resource('http://114.251.53.22/huipaywater/' + url + '/:orderCtrl',{orderCtrl:'@ctrl'});
            order.save({ctrl:'new'},obj,function(data){
                defer.resolve(data);
            });
            return defer.promise;
        }
        var saveCookies = function(data){
            $cookieStore.put('orderId',data)
        }

        var orderGoodsList = function($cookieStore){
            return $cookieStore.get('order_goodslist');
        }
        function GetWaterTicketesInfo($resource,$q,$cookieStore,Login){
            var defer = $q.defer();
            var GetWaterTicketesInfo = $resource('http://114.251.53.22/huipaywater/usercardticket/list',{});
            var requestPageInfo = {
                "pageSize": 100,
                "pageNo": 1
            }
            GetWaterTicketesInfo.save({},{
                accessInfo:Login.getAccessInfo($cookieStore,true),
                requestPageInfo:requestPageInfo,
                sign:'sign'
            },function(data){
                defer.resolve(data);
            });
            return defer.promise;
        }

        var showOrderGoodsList = function($resource,$q,$cookieStore,Login){
            var getWaterTicketes = GetWaterTicketesInfo($resource,$q,$cookieStore,Login).then(function(data){
                var canUseWaterTicketesData = data.hascardTicket;
                var goodsList = orderGoodsList($cookieStore);
                for(var i = 0,waterTicketesLen = canUseWaterTicketesData.length; i < waterTicketesLen;i++){
                    for(var j = 0, productLen = goodsList.length; j < productLen;j++ ){
                        if(canUseWaterTicketesData[i].id == goodsList[j].cardTicketId){
                            var waterTicketesNum = canUseWaterTicketesData[i].totalCount;
                            var dif = waterTicketesNum - goodsList[j].num;
                            if(dif > 0){
                                goodsList[j].waterTicketesNum = goodsList[j].num;
                            }else{
                                goodsList[j].waterTicketesNum = waterTicketesNum;
                            }
                        }
                    }
                }
                return goodsList;
            });
            return getWaterTicketes;
        }

        var OrderTotle = function(data){

            var totleMoney = 0,reduceMoney = 0,totleNum = 0;
            for(var i = 0,len = data.length; i < len;i++){
                totleMoney += (data[i].num * data[i].price);
                reduceMoney += (data[i].waterTicketesNum||0 * data[i].price);
                totleNum += data[i].num
            }
            return {
                getPracticalMoney:totleMoney - reduceMoney,
                getNum:totleNum
            }
        }

        return {
            createOrder: createOrder,
            saveCookies: saveCookies,
            getOrderGoodsList: orderGoodsList,
            showOrderGoodsList: showOrderGoodsList,
            orderTotle: OrderTotle
        }
    }
}())