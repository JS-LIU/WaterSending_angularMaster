/**
 * Created by 殿麒 on 2016/1/16.
 */

(function(){
    angular.module('huipayAddress',['ngCookies','ngResource','huipayUtil'])
        .service('Address',Address);
    function Address($cookieStore,GetQueryString){

    }
    //  是否修改地址
    Address.prototype.isFixedAddress = function(){

    }
    //  选择地址
    Address.prototype.selectAddress = function(){

    }
    //  删除地址
    Address.prototype.deleteAddress = function(){

    }

}())
