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

                    var addsImgs = [{image:'components/images/wb.png',title:'fuckyou'}],
                        //addsImgs = data.activitys,    //    活动图片
                        //  默认图片
                        definedImg = {
                            image:'components/images/xuanchuan.png',
                            title:'全国' + data.waterStationCount + '水站',
                        };
                    //  加入默认图片
                    addsImgs.unshift(definedImg);
                    scope.num = 0;
                    $interval(function() {
                        scope.num++;
                        if(scope.num == addsImgs.length){
                            scope.num = 0;
                        }
                    }, 3000);
                    scope.adsImgs = addsImgs;
                    scope.carouselStyle = {
                        height:document.body.clientWidth * 17 / 18 + 'px',
                        overflow:'hidden'
                    }
                });
            }
        })
}());