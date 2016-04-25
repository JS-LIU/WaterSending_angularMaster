/**
 * Created by 殿麒 on 2016/4/25.
 */
(function(){
    angular.module('myApp')
        .service('VouchermarketingResource',VouchermarketingResource);

    function VouchermarketingResource($resource,$cookieStore,Login){
        var voucher = $resource('vouchermarketing/list',{});

        this.getVoucherMarket = function(shopId){
            var accessInfo = Login.getAccessInfo($cookieStore,false);
            accessInfo.phone_num = "";
            voucher.save({},{
                sign:"",
                accessInfo:accessInfo,
                requestPageInfo:{
                    pageSize:"1",
                    pageNo:"1"
                },
                shopId:shopId
            }).$promise;
        }
    };
}());