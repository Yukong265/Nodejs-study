const CryptoJS = require("crypto-js");
const request = require("request");
const make_verify_number = require("../utils/make_random");
const dotenv = require("dotenv");

const verifyKey = make_verify_number();

dotenv.config();

module.exports = function send_message(phone_number) {
  let user_phone_number = phone_number;
  console.log(user_phone_number);
  let resultCode = 404;
  const date = Date.now().toString();
  const uri = process.env.SERVICE_ID;
  const secretKey = process.env.NCP_SECRET_KEY;
  const accessKey = process.env.NCP_KEY;
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
  const url2 = `/sms/v2/services/${uri}/messages`;
  console.log(secretKey);
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);
  request(
    {
      method: method,
      json: true,
      uri: url,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": date,
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-signature-v2": signature,
      },
      body: {
        type: "SMS",
        countryCode: "82",
        from: process.env.PHONENUMBER,
        content: `인증번호는 [${verifyKey}] 입니다`,
        messages: [{ to: `${user_phone_number}` }],
      },
    },
    function (err, res, html) {
      if (err) console.error(err);
      else {
        console.log(html);  
      }
    }
  );
  return verifyKey;
};