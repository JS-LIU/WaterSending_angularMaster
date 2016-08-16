/**
 * Created by 殿麒 on 2016/5/3.
 */
(function(){
    angular.module('huipayUI')
        .directive('huipayFooterShopping',function footer(){
            var footerObj = {
                restrict:'EA',
                priority:1000,
                templateUrl:'appTemplate/shoppingFooter.html',
                replace:'true',
                link:shoppingfooter
            }
            function shoppingfooter(scope){
                var title = [
                    {name:'电话',pic:'components/images/icon_call@2x.png',background:'#4a5156',isPic:'true'},
                    {name:'收藏',pic:'components/images/btn_collect@2x.png',background:'#4a5156',isPic:'true'},
                    {name:'购物车',pic:'components/images/tab_icon_gouwuche_nor@2x.png',url:'#/goodsCartList',background:'#4a5156',isPic:'true'},
                    {name:'去结算',url:'#/goodsCartList',background:'#f12f2f',isPic:'false',lineHeight:'49px',fontSize:'20px'}
                ];

                //  底部选项
                var footerStyle = function(arr){
                    var width = 100 / arr.length;
                    for(var i = 0,len = arr.length; i < len;i++ ){
                        var obj = {
                            title: arr[i].name,
                            tagsStyle:{
                                width:width+'%',
                                background:arr[i].background,
                                fontSize:arr[i].fontSize,
                                lineHeight:arr[i].lineHeight
                            },
                            pic:arr[i].pic,
                            url:arr[i].url,
                            isPic:arr[i].pic
                        }
                        arr[i] = obj;
                    }
                    return arr;
                }
                scope.tags = footerStyle(title);
            }
            return footerObj;
        });
}());