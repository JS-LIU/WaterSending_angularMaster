/**
 * Created by 殿麒 on 2016/1/13.
 */
(function(){
    angular.module('huipayOrder',['ngResource','ngCookies','huipayLogIn'])
        .factory('Order',Order)

    function Order($resource,$q,$cookieStore){
        var createOrder = function(obj,url){
            var defer = $q.defer();
            var order = $resource('http://114.251.53.22/huipaywater/' + url + '/new');
            order.save({},obj,function(data){
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
            var getOrderList = GetWaterTicketesInfo($resource,$q,$cookieStore,Login).then(function(data){
                var canUseWaterTicketesData = data.hascardTicket;
                var goodsList = orderGoodsList($cookieStore);
                var orderItems = [];
                for(var i = 0,productLen = goodsList.length ; i < productLen ;i++){
                    console.log(goodsList[i]);
                    var obj = {

                        productId:goodsList[i].productId,
                        productType:'1',
                        itemNum:goodsList[i].num,
                        itemPrice:goodsList[i].price,
                        itemInfo:goodsList[i].title,
                        big_image:goodsList[i].big_image
                    }
                    orderItems.push(obj);
                    for(var j = 0, waterTicketesLen = canUseWaterTicketesData.length; j < waterTicketesLen;j++ ){
                        if(goodsList[i].cardTicketId == canUseWaterTicketesData[j].id){
                            var waterTicketesNum = canUseWaterTicketesData[j].totalCount;
                            var dif = waterTicketesNum - goodsList[i].num;
                            if(dif > 0){
                                var amount = goodsList[i].num;
                            }else{
                                var amount = waterTicketesNum;
                            }
                            orderItems[i].serviceItem = {
                                service_type:'19',
                                amount:amount,
                                service_id:canUseWaterTicketesData[j].id
                            }
                        }
                    }
                }
                return orderItems;
            });
            return getOrderList;
        }

        var OrderTotle = function(data){

            var totleMoney = 0,reduceMoney = 0,totleNum = 0;
            for(var i = 0,len = data.length; i < len;i++){
                totleMoney += (data[i].itemNum * data[i].itemPrice);
                if(data[i].serviceItem){
                    reduceMoney += (data[i].serviceItem.amount * data[i].price);
                }
                totleNum += data[i].itemNum
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