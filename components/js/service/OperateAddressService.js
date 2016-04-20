/**
 * Created by 殿麒 on 2016/4/12.
 */
(function(){
    angular.module('myApp')
        .factory('OperateAddressService',OperateAddressService);

    function OperateAddressService(){
        var operateAddress = {
            creatPage:{}
        }

        var titleMsg = {
            operate:{state:"",title:""},
            addressType:{},
            addressInfo:{}
        };
        var addressTypeArr = [{name:'普通地址',addressType:0},
            {name:'家庭地址',addressType:1},
            {name:'公司地址',addressType:2}];
        operateAddress.creatPage = function(addressType,addressInfo){

            for(var i = 0; i < addressTypeArr.length;i++){
                if(addressTypeArr[i].addressType == addressType){
                    titleMsg.addressType = addressTypeArr[i];
                }
            }
            if(arguments[1] == undefined){
                titleMsg.operate = {
                    state:'0',
                    title:'新建'
                };
            }else{
                titleMsg.operate = {
                    state:'1',
                    title:'编辑'
                };
                //  存储编辑地址信息
                titleMsg.addressInfo = addressInfo;
            }
            return titleMsg;
        }


        return {
            operateAddress:operateAddress,
            getOperateAddress:function(){
                return titleMsg;
            },
            setOperateAddress:function(obj){
                for(var prop in obj){
                    titleMsg[prop] = obj[prop];
                }
            },
            getFullAddress:function(str1,str2){
                var j = 0;
                for(var i = 0;i < str1.length;i++){
                    if(str1[i] == str2[i]){
                        j++;
                    }else{
                        break;
                    }
                }
                var str = str2.substring(j);
                return str1+str;
            }
        };
    }
}());