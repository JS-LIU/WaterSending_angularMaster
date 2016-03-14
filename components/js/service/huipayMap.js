/**
 * Created by 殿麒 on 2016/3/4.
 */
(function(){
    angular.module('huipayMap',[])
        .service('Map',Map);

    //  地图适配器
    function Map(AutonaviMap,$q){
        var map = arguments[0];
        var self = this;
        self.show = map.style();
        self.browserLocation = map.browserLocation($q);
        self.moveendLocation = map.mapmove();
        self.getLocationName = map.regeocoder($q);
    }
}());