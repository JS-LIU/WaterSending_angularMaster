/**
 * Created by 殿麒 on 2016/3/4.
 */
(function(){
    angular.module('huipayMap',[])
        .service('HuipayMap',HuipayMap);

    function HuipayMap(map){
        if(map instanceof Function){
            this.map = new map();
            return this.map;
        }
    }

}());