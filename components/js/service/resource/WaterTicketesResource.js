/**
 * Created by 殿麒 on 2016/1/13.
 */
(function(){
    angular.module('WaterTickets',['ngResource'])
        .factory('WaterTicketsResource',WaterTicketsResource)
        .factory('WaterTicketsService',WaterTicketsService);


    function WaterTicketsResource($resource){

        var watertickets = {
            locationWaterTickets:{},
            myWaterTickets:{}
        };


        watertickets.locationWaterTickets = function(){
            return $resource('cardticket/:operate',
                {operate:'@operate'});
        };

        watertickets.myWaterTickets = function(){
            return $resource('usercardticket/:operate',
                {operate:'@operate'});
        };
        return watertickets;
    };

    function WaterTicketsService(WaterTicketsResource){
        var waterTickets = {
            waterTicketsList:{},
            waterTicketsDetail:{},
            myWaterTicketsList:{},
            setWaterTicketInfo:{},
            getWaterTicketInfo:{}
        };


        waterTickets.waterTicketsList = function(obj){
            return WaterTicketsResource.locationWaterTickets().save(
                {operate:'list'},
                obj
            ).$promise;
        };

        waterTickets.waterTicketsDetail = function(obj){
            return WaterTicketsResource.locationWaterTickets().save(
                {operate:'detail'},
                obj
            ).$promise;
        };
        waterTickets.myWaterTicketsList = function(obj){
            return WaterTicketsResource.myWaterTicketsList.save(
                {operate:'list'},
                obj
            ).$promise;
        };
        var waterTicketInfo = {};


        waterTickets.setWaterTicketInfo = function(data){
            waterTicketInfo = data;
        };
        waterTickets.getWaterTicketInfo = function(){
            return waterTicketInfo;
        };
        return waterTickets;
    };
}());