/**
 * Created by 殿麒 on 2016/4/26.
 */
(function(){
    angular.module('huipayUI')
        .directive('huipayWhenscrolled',function(){
            var scrolled = {
                restrict:'EA',
                priority:1000,
                template:'<ul ng-transclude></ul>',
                transclude:true,
                replace:'true',
                link:listbox
            }
            function listbox(scope,ele,attr){
                ele.bind('scroll',function(){
                    if(ele.offsetHeight + ele.scrollTop >= ele.scrollHeight){
                        scope.$apply(attr.huipayWhenscrolled);
                    }
                });
            }

            return scrolled;
        });


}());
