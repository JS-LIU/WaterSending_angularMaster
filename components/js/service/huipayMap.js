/**
 * Created by 殿麒 on 2016/3/4.
 */
(function(){
    angular.module('huipayMap',['ngResource'])
        .provider('Map',Map);

    //  地图适配器
    function Map(){
        //var map = arguments[0];
        //var self = this;
        //self.newMap = arguments[0];
        //self.show = map.style();
        //self.browserLocation = map.browserLocation($q);
        //self.moveendLocation = map.mapmove();
        //self.getLocationName = map.regeocoder($q);
        //self.searchAfterEnterPrompt = map.searchAfterEnterPrompt();
        var defMap;
        //  对外接口
        var huipayMapApi = {
            show:{},                    //  展示地图
            style:{},                   //  设置地图样式
            browserLocation:{},         //  使用浏览器定位
            getLocationName:{},         //  地理位置反编译（坐标-地址）
            moveendLocation:{},         //  地图移动后获取坐标
            searchAfterEnterPrompt:{},  //
        };

        this.setMap = function(map){
            defMap = map;
        };
        this.$get = function($resource,$q){

            function huipayMapSingle(){
                if(typeof defMap != 'object'){
                    defMap = new defMap;
                }
            }

            huipayMapApi.show = function(){
                if(typeof defMap != 'object'){
                    defMap = new defMap;
                }else{
                    defMap = new defMap.constructor;
                }
            };
            huipayMapApi.setStyle = function(){
                //huipayMapSingle()
                return defMap.style();
            };
            huipayMapApi.browserLocation = function($q){
                //huipayMapSingle()
                return defMap.browserLocation($q);
            }
            huipayMapApi.getLocationName = function($q,lnglatXY){
                //huipayMapSingle()
                return defMap.regeocoder($q,lnglatXY);
            }
            huipayMapApi.moveendLocation = function(func){
                //huipayMapSingle()
                return defMap.mapmove(func);
            }
            huipayMapApi.searchAfterEnterPrompt = function($q,keywords){
                huipayMapSingle();
                return defMap.searchAfterEnterPrompt($q,keywords);
            }
            return huipayMapApi;
        };

    }
}());