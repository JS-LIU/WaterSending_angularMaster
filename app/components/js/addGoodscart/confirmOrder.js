/**
 * Created by 殿麒 on 2015/11/7.
 */
purchase.controller('confirmOrder',function($rootScope,$scope,$cookieStore,purchasePost,getAccessInfo){

    //  生成订单
    $scope.confirmOrder = function(){
        var shopId = $cookieStore.get('shopInfo').shopId;
        var order_list = $cookieStore.get('order_goodslist');
        var orderItem = [];

        for(var i = 0,len  = order_list.length; i < len;i++){
            var item = {
                productId:order_list[i].productId,
                productType:1,
                itemNum:order_list[i].num,
                itemPrice:order_list[i].price,
                itemInfo:''
            };
            orderItem.push(item);
        }
        var data = {
            accessInfo:getAccessInfo.loginAccessInfo(),
            shopId:shopId,
            addressId:$rootScope.DEFAULTADDRESS.addressId,
            total_fee:$scope.totleMoney,
            orderItems:orderItem,
            sign:'sign',
            description:'',
            comment:''
        }

        var path = 'order/new';
        purchasePost.postData(data,path).success(function(data){
            $cookieStore.put('orderId',data);
            window.location.href = "09-payPage.html";
        });
    }
    var shopInfo = $cookieStore.get('shopInfo');
    var order_goodslist = $cookieStore.get('order_goodslist');


    var totleNum = 0;
    var totleMoney = 0;
    $scope.shopName = $cookieStore.get('shopInfo').merchantName;
    $scope.order_goodslist = order_goodslist;
    for(var i = 0,len = order_goodslist.length;i < len; i++){
        totleNum += parseInt(order_goodslist[i].num);
        totleMoney += parseInt(order_goodslist[i].num * order_goodslist[i].price);
    }
    $scope.totleNum = totleNum;
    $scope.totleMoney = totleMoney;
});
