/**
 * Created by 殿麒 on 2016/3/3.
 */
(function(){
    angular.module('myApp')
        .controller('PositionMyLocalCtrl',PositionMyLocalCtrl);
    function PositionMyLocalCtrl($scope,$interval,GetMainCarouselImgs){
        GetMainCarouselImgs.then(function(data){

            var addsImgs = data.activitys,    //    活动图片
            //  默认图片
                definedImg = {
                    image:'components/images/xuanchuan.png',
                    title:'全国' + data.waterStationCount + '水站',
                };
            //  加入默认图片
            addsImgs.unshift(definedImg);
            $scope.num = 0;
            $interval(function() {
                $scope.num++;
                if($scope.num == addsImgs.length){
                    $scope.num = 0;
                }
            }, 3000);
            $scope.adsImgs = addsImgs;
            $scope.carouselStyle = {
                height:document.body.clientWidth * 17 / 18 + 'px'
            }
        });
    }
}());