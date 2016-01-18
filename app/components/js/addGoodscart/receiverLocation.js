/**
 * Created by 殿麒 on 2015/10/11.
 */
purchase.controller('receiverLocation',function($scope,$rootScope,$resource,$q,$location,$cookieStore,$swipe,Address,Login){
    //  是否为修改地址
    var isFixed = Address.isFixedAddress(); //  修改地址返回true 新增返回false；

    //  是否隐藏【新增】按钮 新增为false
    $scope.addAddress = isFixed;

    //  修改/新增 后返回的页面
    $scope.lastPage = Address.backPage(isFixed);

    Address.getAllAddress($cookieStore,$resource,$q,Login).then(function(data){
        //  【收货地址】是否【可送达】 的显示
        Address.isCandeliver(isFixed,data);
        //  地址列表
        $scope.myAddress = data;
        //  【确认订单】页面的默认地址显示
        $scope.show_address = Address.hasDefaultAddress(data);
        var defaultAddress = Address.defaultAddress(data);


        $rootScope.RECIEVENAME = defaultAddress.recieve_name;
        $rootScope.RECEIVERPHONE = defaultAddress.phone_num;
        $rootScope.RECEIVERADDRESS = defaultAddress.fullAddress;
    });


    $scope.modiAddress = function(){
        return false;
    }

    //  删除地址
    $scope.delAddress = function(item,e){
        Address.deleteAddress(item,e);
    }
    //  选择地址
    $scope.selAddress = function(item){
        Address.selectAddress($rootScope,item);
    }
});