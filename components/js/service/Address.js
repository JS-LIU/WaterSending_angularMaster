/**
 * Created by 殿麒 on 2016/1/16.
 */

(function(){
    angular.module('huipayAddress',['ngCookies','ngResource','huipayLogIn'])
        .service('Address',Address);
    function Address($location){
        this.searchUrl = $location.search();
    }
    //  是否修改地址
    Address.prototype.isFixedAddress = function(){
        if(this.searchUrl.fixed == undefined){      //  新增地址
            return false;
        }else{                                      //  修改地址
            return true;
        }
    }
    Address.prototype.getAllAddress = function($cookieStore,$resource,$q,Login){
        var lnglatXY = $cookieStore.get('lnglatXY');
        var positionInfo = {
            districtId:lnglatXY.districtId || '0',
            addressInfo:lnglatXY.addressInfo || '0',
            position_x:lnglatXY.position_x || '0',
            position_y:lnglatXY.position_y || '0'
        }
        var defer = $q.defer();

        var MyAddress = $resource("delieveryAddress/show",{},{
            save:{
                method:'POST',
                isArray:true
            }
        });

        MyAddress.save({},{
            accessInfo:Login.getAccessInfo($cookieStore,true),
            positionInfo:positionInfo,
            sign:'sign'
        },function(data){
            defer.resolve(data);
        });
        return defer.promise;
    }
    //  返回到的页面
    Address.prototype.backPage = function(isFixed){

        if(isFixed){                        //  【修改地址】 保存后返回的页面
            return '06-main.html#/my';
        }else{                              //  【新增地址】 保存后返回的页面
            return '#/confirmOrder';
        }
    }
    //  有没有默认地址
    Address.prototype.hasDefaultAddress = function(data){
        if(data.length > 0){
            return true;
        }else{
            return false;
        }
    }
    //  是否可以送货【标识】的显示
    Address.prototype.isCandeliver = function(isFixed,data){
        if(data.length > 0){
            if(isFixed){                     //  【修改地址】
                for(var i = 0 ;i < data.length;i++){
                    data[i].canDeliever = true;
                    return data[i];
                }
            }
        }
    }

    Address.prototype.defaultAddress = function(data){
        if(data.length > 0){
            for(var i = 0 ;i < data.length;i++){
                if(data[i].canDeliever){
                    return data[i];
                }
            }
        }
    }

    //  选择地址
    Address.prototype.selectAddress = function($rootScope,item){
        $rootScope.DEFAULTADDRESS = item;

        if(this.isFixedAddress()){
            window.location.href="#/modiAddress";
        }else{
            if(item["canDeliever"]){
                window.location.href = "#/confirmOrder";
            }
        }
    }
    //  删除地址
    Address.prototype.deleteAddress = function($resource,$cookieStore,Login,item,e){
        var addressId = item.addressId;
        var data = {
            addressId:addressId,
            sign:'sign',
            accessInfo:Login.getAccessInfo($cookieStore)
        }
        e = e || window.event;
        e.preventDefault();
        $resource('delieveryAddress/delete',data)
    }

}())
