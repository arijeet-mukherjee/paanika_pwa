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

    baseUrl : "https://instaworksbyarijeet.games/public/api/",

    imageUrl : 'https://instaworksbyarijeet.games/',

    generateString : (length)=>{
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    },

    header :{
        'consumer_secret': '8464dfefecf7f555d49cce041116bbd5', 
        'consumer-key': '85614bbbcb0cb1bf0494983ea67b3a85', 
        'consumer-device-id': generateString(14), 
        'consumer-nonce': generateString(14), 
        'Access-Control-Allow-Origin': '*',            
        'consumer-ip': '1.1.1.1'
    },

    pillNames : ['CATEGORIES', 'STYLE', 'ARTSY', 'PRINTED', 'DESIGNER', 'FABRICS/M', 'BOUTIQUE']
}

export default util;