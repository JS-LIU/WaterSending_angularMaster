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
                link:footer
            }
            return footerObj;

            function footer(scope){
                var title = [
                    {name:'海豹送水',pic:'components/images/bottom-icon-1-n.png',url:'#/'},
                    {name:'订单',pic:'components/images/bottom-icon-2-n.png',url:'#/order'},
                    {name:'水票',pic:'components/images/bottom-icon-3-n.png',url:'#/waterTickets'},
                    {name:'我的',pic:'components/images/bottom-icon-4-n.png',url:'#/my'}
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

                //  底部操作

            }
        })
}());