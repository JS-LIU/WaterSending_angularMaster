/**
 * Created by 殿麒 on 2016/6/2.
 */
(function(){
    angular.module('huipayUI')
        .directive('huipaySimpleDialog',function(){
            return{
                restrict:'EA',
                template:'<div ng-transclude class="pr cfff tc" ng-style="simpleDialogStyle" ></div>',
                transclude:true,
                priority:1000,
                replace:true,
                link:simpleDialog,
                controller:SimpleDialogCtrl
            }
            function SimpleDialogCtrl($scope,$timeout){

                $scope.$watch('isShowSimpleDialog',function(){
                    if($scope.isShowSimpleDialog){
                        console.log($scope);
                        $timeout(function(){
                            $scope.isShowSimpleDialog = false;
                        },1600);
                    }
                })
            };
            function simpleDialog(scope,ele,attr){
                scope.simpleDialogStyle = {
                    position:'fixed',
                    left:'50%',
                    marginLeft:'-75px',
                    width:'150px',
                    height:'40px',
                    bottom:'55px',
                    background:'#000',
                    opacity:'0.9',
                    borderRadius:'3px',
                    zIndex:'99',
                    lineHeight:'40px'
                };
                scope.isShowSimpleDialog = false;
            };
        });
}());