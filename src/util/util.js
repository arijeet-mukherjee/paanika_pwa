import axios from "axios";

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length){
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
}
const util ={

    baseUrl : "http://admin.paanika.com/api/client/",

    imageUrl : 'http://admin.paanika.com/gallary/',

    clientsecret : "sk_1234",
    
    clientid : "1234",

    generateString : (length)=>{
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    },

    header :{
        'clientsecret': 'sk_1234', 
        'clientid': '1234',
        'Access-Control-Allow-Origin': '*'
    },

    pillNames : ['CATEGORIES', 'SAREE', 'DRESS', 'DUPATTA'],

    apiCall : async (method, baseUrl, endurl, header, key , value)=>{
        var formdata = new FormData();
        if(key && value){
            formdata.append(key,value);
        }
        var config = {
            method: method,
            url: baseUrl+endurl,
            headers: header,
            data : formdata ? formdata : ''
        };
        return new Promise((resolve,reject)=>{
            axios(config)
            .then(
            response => response.data 
            )
            .then((data)=>{
            resolve(data);
            //setIsLoading(false);
            })
            .catch(function (error) {
            reject(error);
            });
        });
    },
}

export default util;