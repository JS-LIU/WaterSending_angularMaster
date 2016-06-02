/**
 * Created by 殿麒 on 2016/4/25.
 */
(function(){
    angular.module('myApp')
        .service('VouchermarketingResource',VouchermarketingResource);

    function VouchermarketingResource($resource,$cookieStore,Login){
        var voucherMarket = $resource('vouchermarketing/:operate',{operate:'@operate'});
        var voucher = $resource('voucher/:operate',{operate:'@operate'})

        var accessInfo = Login.getAccessInfo($cookieStore,false);
        var accessInfoLogin = Login.getAccessInfo($cookieStore,Login.isLogIn());
        accessInfo.phone_num = "";

        this.getVoucherMarket = function(shopId){
            return voucherMarket.save({operate:'list'},{
                sign:"",
                accessInfo:accessInfo,
                requestPageInfo:{
                    pageSize:"1",
                    pageNo:"1"
                },
                shopId:shopId
            }).$promise;
        };
        this.getVoucher = function(activityId){
            return voucher.save({operate:'new'},{
                sign:"",
                accessInfo:accessInfoLogin,
                activityId:activityId
            }).$promise;
        }
    };
}());