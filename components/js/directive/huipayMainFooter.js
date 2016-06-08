/**
 * Created by 殿麒 on 2016/2/24.
 */
(function(){
    angular.module('huipayUI')
        .directive('huipayMainFooter',function footer(){
            var footerObj = {
                restrict:'EA',
                priority:1000,
                templateUrl:'appTemplate/mainFooter.html',
                replace:'true',
                link:footer,
                controller:skip
            }
            return footerObj;
            function skip($scope,$cookieStore, Login){
                console.log(Login.isLogIn());
                $scope.$watch('tags',function(){
                    if(!Login.isLogIn()){
                        $scope.tags[2].url = '07-log.html#/';
                        $cookieStore.put('lastPage','06-main.html#/');
                    }
                });
            }
            function footer(scope){
                var title = [
                    {name:'订水',pic:'components/images/tab_icon_dingshui_nor@2x.png',url:'#/'},
                    //{name:'水票',pic:'components/images/tab_icon_shuipiao_nor@2x.png',url:'#/waterTickets'},
                    {name:'购物车',pic:'components/images/tab_icon_gouwuche_nor@2x.png',url:'#/goodsCartList'},
                    {name:'我的',pic:'components/images/tab_icon_me_nor@2x.png',url:'#/my'}
                ];

                //  底部选项
                var footerStyle = function(arr){
                    var width = 100 / arr.length;
                    for(var i = 0,len = arr.length; i < len;i++ ){
                        var obj = {
                            title: arr[i].name,
                            tagsStyle:{width:width+'%'},
                            pic:arr[i].pic,
                            url:arr[i].url
                        }
                        arr[i] = obj;
                    }
                    return arr;
                }
                scope.tags = footerStyle(title);
            }
        })
}());