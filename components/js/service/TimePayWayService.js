/**
 * Created by 殿麒 on 2016/1/27.
 */

(function(){
    angular.module('myApp')
        .service('SendTimeService',SendTimeService);
        //.service('PayWayService',PayWayService);


    function SendTimeService(){
        this.data = new Date();

        this.setTimeArr = function(arr,init,end){
            for(var i = init;i < end;i++){
                arr.push({
                    opt:i,
                    id:""
                });
            }
        }
    };
    SendTimeService.prototype.getInitHoursArr = function(){
        var hours = [];
        var initH = this.data.getHours();
        var endH = 24;
        this.setTimeArr(hours,initH,endH);
        return hours;
    };
    SendTimeService.prototype.getEndHours = function(hour){
        hour += 2;
        if(hour > 23){
            hour -= 23;
        }
        return hour;
    }
    SendTimeService.prototype.getMinArr = function(){
        var mins = [];
        var initM = this.data.getMinutes();
        var endM = 60;
        this.setTimeArr(mins,initM,endM);
        return mins;
    };

    //function PayWayService(){
    //    this.paywayArr = ['在线付款','货到付款'];
    //}
    //PayWayService.prototype.SetPayWay = function(){
    //    var optionArr = [];
    //    for(var i = 0;i < this.paywayArr.length;i++){
    //        optionArr.push({
    //            opt: this.paywayArr[i],
    //            id: i
    //        });
    //    }
    //    return optionArr;
    //}

}());
