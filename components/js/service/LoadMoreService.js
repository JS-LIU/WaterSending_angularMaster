/**
 * Created by 殿麒 on 2016/4/26.
 */
(function(){
    angular.module('myApp')
        .factory('LoadMoreService',LoadMore)

    function LoadMore(){
        var load = {
            getMore:{}
        }

        load.getMore = function(currentPage,totlePage,func){
            currentPage++;
            if(currentPage < totlePage){
                func();
            }
        }



        return load;
    }

}());