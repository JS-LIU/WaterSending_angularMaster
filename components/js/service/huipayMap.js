/**
 * Created by 殿麒 on 2016/3/4.
 */
(function(){
    angular.module('huipayMap',['ngResource'])
        .provider('Map',Map);

    //  地图适配器
    function Map(){
        var defMap;
        //  对外接口
        var huipayMapApi = {
            show:{},                    //  展示地图
            style:{},                   //  设置地图样式
            browserLocation:{},         //  使用浏览器定位
            getLocationName:{},         //  地理位置反编译（坐标-地址）
            moveendLocation:{},         //  地图移动后获取坐标
            searchAfterEnterPrompt:{},  //
            setMapCenter:{}             //  设置地图中心点
        };

        this.setMap = function(map){
            defMap = map;
        };
        this.$get = function(){

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
            huipayMapApi.searchAfterEnterPrompt = function($q,city,keywords){
                huipayMapSingle();
                return defMap.searchAfterEnterPrompt($q,city,keywords);
            }
            huipayMapApi.setMapCenter = function(av){
                if(Object.prototype.toString.call(av) === '[object Array]'){
                    return defMap.setCenter(av);
                }else{
                    return defMap.setCity(av);
                }

            }
            return huipayMapApi;
        };

    }
}());