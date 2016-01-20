/**
 * Created by 殿麒 on 2016/1/13.
 */
(function(){
    angular.module('huipayOrder',['ngResource','ngCookies','huipayLogIn'])
        .factory('Order',Order)

    function Order($resource,$q,$cookieStore){
        var createOrder = function(obj){
            var defer = $q.defer();
            var waterTicketesOrder = $resource('http://114.251.53.22/huipaywater/ticketorder/new',{});
            waterTicketesOrder.save({},obj,function(data){
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
                        if(canUseWaterTicketesData[i].cardTicketId == goodsList[j].id){
                            goodsList[j].waterTicketes = canUseWaterTicketesData[i];
                            var waterTicketesNum = canUseWaterTicketesData[i].totalCount;
                            var dif = waterTicketesNum - canUseWaterTicketesData[i].num;
                            var waterTicketesMoney = canUseWaterTicketesData[i]
                            if(dif > 0){
                                goodsList[j].waterTicketesNum = canUseWaterTicketesData[i].num;
                            }else{
                                goodsList[j].waterTicketesNum = waterTicketesNum
                            }

                        }
                    }
                }
                return goodsList;
            });
            return getWaterTicketes;
        }

        return {
            createOrder: createOrder,
            saveCookies: saveCookies,
            getOrderGoodsList: orderGoodsList,
            showOrderGoodsList: showOrderGoodsList
        }
    }
}())