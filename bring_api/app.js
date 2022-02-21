const request  = require('request');
//for http communication

const api_url = "https://openapi.naver.com/v1/papago/n2mt";
const client_id = "fU4Vnzc0BgljAVKYihqh";
const client_secret = "Dc2J6H2anE";
const query = "papgo open api translation success!";

const options = {
    url: api_url,
    form: { source: 'en', target: 'ko', text: query},
    headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
    },
};

request.post(options, (error, response, body)=>{
    if(!error && response.statusCode == 200){
        console.log(JSON.parse(body));
    } else {
        console.error(error)
    }
})