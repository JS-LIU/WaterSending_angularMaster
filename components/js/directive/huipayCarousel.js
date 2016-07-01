/**
 * Created by 殿麒 on 2016/2/29.
 */
(function(){
    angular.module('huipayUI')
        .directive('huipayCarousel',function($interval,GetMainCarouselImgs){
            var carouselObj = {
                restrict:'EA',
                templateUrl:'appTemplate/mainCarousel.html',
                replace:'true',
                link:carousel
            }
            return carouselObj

            function carousel(scope){
                //var screenW = document.body.clientWidth;
                GetMainCarouselImgs.then(function(data){
                    var addsImgs = [{image:'components/images/home_banner_empty_bg@2x.png',title:'全国' + data.waterStationCount + '水站'}];
                        //addsImgs = data.activitys,    //    活动图片
                    scope.num = 0;
                    $interval(function() {
                        scope.num++;
                        if(scope.num == addsImgs.length){
                            scope.num = 0;
                        }
                    }, 7000);
                    scope.adsImgs = addsImgs;
                    scope.carouselStyle = {
                        position: "absolute",
                        top: '44px',
                        bottom: '160px',
                        zIndex:1
                    }
                });
            }
        })
}());