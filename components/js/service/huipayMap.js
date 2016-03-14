/**
 * Created by 殿麒 on 2016/3/4.
 */
(function(){
    angular.module('huipayMap',[])
        .service('Map',Map);

    function Map(AutonaviMap,$q){
        var map = arguments[0];
        this.show = map.style();
        this.browserLocation = map.browserLocation($q);

        this.moveendLocation = map.mapmove();
    }
}());