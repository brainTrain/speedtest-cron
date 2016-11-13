import myAjax from './my-ajax';

let dood = 'youz';
console.log('dood', dood);

myAjax((http) => {
    console.log(JSON.parse(http.response)); 
}, 'logs/speedtest.json', 'GET');
