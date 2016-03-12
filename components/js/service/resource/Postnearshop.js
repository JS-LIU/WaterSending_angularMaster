/**
 * Created by 殿麒 on 2016/3/8.
 */
(function(){
    angular.module('myApp')
        .service('Postnearshop',Postnearshop);
    function Postnearshop($resource,$q,$cookieStore,Login){
        var defer = $q.defer();
        var getnearShop = $resource('shopList/shop');

        //  获取附近商店
        getnearShop.save({
            accessInfo:Login.getAccessInfo($cookieStore,false),
            requestPageInfo: {
                pageSize:5,
                pageNo:1
            },
            sign:'',
            x_dpi:'640',
            positionInfo:$cookieStore.get(''),
        },function(){

        })
    }
}());