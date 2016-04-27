/**
 * Created by 殿麒 on 2016/4/27.
 */
(function(){
    angular.module('myApp')
        .directive('huipayClassify',function(){
            var classify = {
                restrict:'EA',
                priority:1000,
                templateUrl:'appTemplate/classifyBox.html',
                replace:'true',
                link:classifybox
            }

            function classifybox(scope,ele,attr){
                var width = document.body.clientWidth - 44;
                var title = [
                    {name:'推荐'},
                    {name:'销量'},
                    {name:'新品'},
                    {name:'价格'}
                ];

                var len = title.length;
                scope.myStyle = {
                    width:width / len + 'px'
                }

                scope.tags = title;
            }
            return classify;
        });
}());