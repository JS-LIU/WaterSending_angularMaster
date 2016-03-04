/**
 * Created by 殿麒 on 2016/3/4.
 */
(function(){
    angular.module('huipayMap_Autonavi',[])
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

    /*
    *   浏览器定位
    *   代码来源：http://lbs.amap.com/api/javascript-api/example/location/browser-location/
    * */

    AutonaviMap.prototype.browserLocation = function($q){
        console.log($q);
        //var geolocation;
        //var defer=$q.defer();                               //声明延后执行
        //
        //this.map.plugin('AMap.Geolocation', function() {
        //    geolocation = new AMap.Geolocation({
        //        enableHighAccuracy: true,                   //是否使用高精度定位，默认:true
        //        timeout: 10000,                             //超过10秒后停止定位，默认：无穷大
        //        buttonOffset: new AMap.Pixel(10, 20),       //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        //        zoomToAccuracy: true,                       //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        //        buttonPosition:'RB'
        //    });
        //    map.addControl(geolocation);
        //    geolocation.getCurrentPosition();
        //    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        //    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        //});
        //
        ////解析定位结果
        //function onComplete(data) {
        //    defer.resolve(data);
        //    //this.getLng = data.position.getLng();
        //    //this.getLat = data.position.getLat();
        //}
        ////解析定位错误信息
        //function onError(data) {
        //    alert('定位失败：为了互联网的进步请您开启3G/4G网络');
        //}
        //return defer.promise;
    }
}());