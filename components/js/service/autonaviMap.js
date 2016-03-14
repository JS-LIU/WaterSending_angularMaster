/**
 * Created by 殿麒 on 2016/3/11.
 */
(function(){
    angular.module('huipayMap')
        .service('AutonaviMap',AutonaviMap);

    /*
     *   绘制地图
     *   代码来源：http://lbs.amap.com/api/javascript-api/example/map/map-show/
     * */
    function AutonaviMap(){
        this.map = new AMap.Map('container', {
            resizeEnable: true
        });
    }

    //  地图样式
    AutonaviMap.prototype.style = function(){
        return {
            height:document.body.clientWidth * 17 / 18 + 'px',
        }
    }
    /*
     *   浏览器定位
     *   代码来源：http://lbs.amap.com/api/javascript-api/example/location/browser-location/
     * */

    AutonaviMap.prototype.browserLocation = function($q){
        var geolocation;
        var defer=$q.defer();                               //声明延后执行
        var map = this.map;
        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,                   //是否使用高精度定位，默认:true
                timeout: 10000,                             //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),       //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,                       //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });

        //  解析定位结果
        function onComplete(data) {
            defer.resolve(data);
            //this.getLng = data.position.getLng();
            //this.getLat = data.position.getLat();
        }
        //  解析定位错误信息
        function onError(data) {
            alert('定位失败：为了互联网的进步请您开启3G/4G网络');
        }
        return defer.promise;
    }

    /*
     *   获取拖拽后的地理位置      moveend事件
     *   代码来源：http://lbs.amap.com/api/javascript-api/example/map/get-current-administrative-region/
     *   地图中心经纬度           map.getCenter()
     * */

    AutonaviMap.prototype.mapmove = function(){
        var map = this.map;

        return function(func){
            map.on('moveend',function(){

                //  解析定位结果（地图中心经纬度）
                var center = [map.getCenter().lat,map.getCenter().lng];
                func(center);
            });
        }
    }


    /*
     *   点标记
     *   代码来源：http://lbs.amap.com/api/javascript-api/example/marker/marker-content/
     * */

    AutonaviMap.prototype.addMarker = function(marker,po){
        var marker = new AMap.Marker({
            icon: marker,
            position: po
        });
        marker.setMap(map);
    }

    /*
     *   清除点标记
     * */
    AutonaviMap.prototype.clearMarker = function (){
        var map = this.map;

        map.clearMap();
    }
}());