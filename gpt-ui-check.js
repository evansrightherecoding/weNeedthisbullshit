/***

Thanks to & modified from 
1. https://gist.githubusercontent.com/Hyseen/b06e911a41036ebc36acf04ddebe7b9a/raw/nf_check.js
2. https://github.com/AtlantisGawrGura/Quantumult-X-Scripts/blob/main/media.js
3. https://github.com/CoiaPrant/MediaUnlock_Test/blob/main/check.sh
3. https://github.com/Netflixxp/chatGPT/blob/main/chat.sh

For Quantumult-X 598+ ONLY!!

2023-02-14

- 支持 ChatGPT 检测

[task_local]

event-interaction https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/streaming-ui-check.js, tag=流媒体-解锁查询, img-url=checkmark.seal.system, enabled=true

@XIAO_KOP

**/

const BASE_URL = 'https://www.netflix.com/title/';
const BASE_URL_YTB = "https://www.youtube.com/premium";
const BASE_URL_DISNEY = 'https://www.disneyplus.com';
const BASE_URL_Dazn = "https://startup.core.indazn.com/misl/v5/Startup";
const BASE_URL_Param = "https://www.paramountplus.com/"
const FILM_ID = 81280792
const BASE_URL_Discovery_token = "https://us1-prod-direct.discoveryplus.com/token?deviceId=d1a4a5d25212400d1e6985984604d740&realm=go&shortlived=true"
const BASE_URL_Discovery = "https://us1-prod-direct.discoveryplus.com/users/me"
const BASE_URL_GPT = 'https://chat.openai.com/'
const Region_URL_GPT = 'https://chat.openai.com/cdn-cgi/trace'

const link = { "media-url": "https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/img/southpark/7.png" } 
const policy_name = "Netflix" //填入你的 netflix 策略组名

const arrow = " ➟ "

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'

// 即将登陆
const STATUS_COMING = 2
// 支持解锁
const STATUS_AVAILABLE = 1
// 不支持解锁
const STATUS_NOT_AVAILABLE = 0
// 检测超时
const STATUS_TIMEOUT = -1
// 检测异常
const STATUS_ERROR = -2

var opts = {
  policy: $environment.params
};

var opts1 = {
  policy: $environment.params,
  redirection: false
};


var flags = new Map([[ "AC" , "🇦🇨" ] ,["AE","🇦🇪"], [ "AF" , "🇦🇫" ] , [ "AI" , "🇦🇮" ] , [ "AL" , "🇦🇱" ] , [ "AM" , "🇦🇲" ] , [ "AQ" , "🇦🇶" ] , [ "AR" , "🇦🇷" ] , [ "AS" , "🇦🇸" ] , [ "AT" , "🇦🇹" ] , [ "AU" , "🇦🇺" ] , [ "AW" , "🇦🇼" ] , [ "AX" , "🇦🇽" ] , [ "AZ" , "🇦🇿" ] , ["BA", "🇧🇦"], [ "BB" , "🇧🇧" ] , [ "BD" , "🇧🇩" ] , [ "BE" , "🇧🇪" ] , [ "BF" , "🇧🇫" ] , [ "BG" , "🇧🇬" ] , [ "BH" , "🇧🇭" ] , [ "BI" , "🇧🇮" ] , [ "BJ" , "🇧🇯" ] , [ "BM" , "🇧🇲" ] , [ "BN" , "🇧🇳" ] , [ "BO" , "🇧🇴" ] , [ "BR" , "🇧🇷" ] , [ "BS" , "🇧🇸" ] , [ "BT" , "🇧🇹" ] , [ "BV" , "🇧🇻" ] , [ "BW" , "🇧🇼" ] , [ "BY" , "🇧🇾" ] , [ "BZ" , "🇧🇿" ] , [ "CA" , "🇨🇦" ] , [ "CF" , "🇨🇫" ] , [ "CH" , "🇨🇭" ] , [ "CK" , "🇨🇰" ] , [ "CL" , "🇨🇱" ] , [ "CM" , "🇨🇲" ] , [ "CN" , "🇨🇳" ] , [ "CO" , "🇨🇴" ] , [ "CP" , "🇨🇵" ] , [ "CR" , "🇨🇷" ] , [ "CU" , "🇨🇺" ] , [ "CV" , "🇨🇻" ] , [ "CW" , "🇨🇼" ] , [ "CX" , "🇨🇽" ] , [ "CY" , "🇨🇾" ] , [ "CZ" , "🇨🇿" ] , [ "DE" , "🇩🇪" ] , [ "DG" , "🇩🇬" ] , [ "DJ" , "🇩🇯" ] , [ "DK" , "🇩🇰" ] , [ "DM" , "🇩🇲" ] , [ "DO" , "🇩🇴" ] , [ "DZ" , "🇩🇿" ] , [ "EA" , "🇪🇦" ] , [ "EC" , "🇪🇨" ] , [ "EE" , "🇪🇪" ] , [ "EG" , "🇪🇬" ] , [ "EH" , "🇪🇭" ] , [ "ER" , "🇪🇷" ] , [ "ES" , "🇪🇸" ] , [ "ET" , "🇪🇹" ] , [ "EU" , "🇪🇺" ] , [ "FI" , "🇫🇮" ] , [ "FJ" , "🇫🇯" ] , [ "FK" , "🇫🇰" ] , [ "FM" , "🇫🇲" ] , [ "FO" , "🇫" ] , [ "FR" , "🇫🇷" ] , [ "GA" , "🇬🇦" ] , [ "GB" , "🇬🇧" ] , [ "HK" , "🇭🇰" ] ,["HU","🇭🇺"], [ "ID" , "🇮🇩" ] , [ "IE" , "🇮🇪" ] , [ "IL" , "🇮🇱" ] , [ "IM" , "🇮🇲" ] , [ "IN" , "🇮🇳" ] , [ "IS" , "🇮🇸" ] , [ "IT" , "🇮🇹" ] , [ "JP" , "🇯🇵" ] , [ "KR" , "🇰🇷" ] , [ "LU" , "🇱🇺" ] , [ "MO" , "🇲🇴" ] , [ "MX" , "🇲🇽" ] , [ "MY" , "🇲🇾" ] , [ "NL" , "🇳🇱" ] , [ "PH" , "🇵🇭" ] , [ "RO" , "🇷🇴" ] , [ "RS" , "🇷🇸" ] , [ "RU" , "🇷🇺" ] , [ "RW" , "🇷🇼" ] , [ "SA" , "🇸🇦" ] , [ "SB" , "🇧" ] , [ "SC" , "🇸🇨" ] , [ "SD" , "🇸🇩" ] , [ "SE" , "🇸🇪" ] , [ "SG" , "🇸🇬" ] , [ "TH" , "🇹🇭" ] , [ "TN" , "🇹🇳" ] , [ "TO" , "🇹🇴" ] , [ "TR" , "🇹🇷" ] , [ "TV" , "🇹🇻" ] , [ "TW" , "🇹🇼" ] , [ "UK" , "🇬🇧" ] , [ "UM" , "🇺🇲" ] , [ "US" , "🇺🇸" ] , [ "UY" , "🇺🇾" ] , [ "UZ" , "🇺🇿" ] , [ "VA" , "🇻🇦" ] , [ "VE" , "🇻🇪" ] , [ "VG" , "🇻🇬" ] , [ "VI" , "🇻🇮" ] , [ "VN" , "🇻🇳" ] , [ "ZA" , "🇿🇦"]])

let result = {
  "title": '    📺  流媒体服务查询',
  "ChatGPT" : "<b>ChatGPT: </b>检测失败，请重试 ❗️"
  //"Google": "Google 定位: 检测失败，请重试"

}
const message = {
  action: "get_policy_state",
  content: $environment.params
};

;(async () => {
 // testYTB()
 // testDazn()
 // testParam()
  //let [{ region, status }] = await Promise.all([testDisneyPlus(),testNf(FILM_ID),testDiscovery(),testChatGPT()])
  let [{ region, status }] = await Promise.all([testChatGPT()])
  // console.log("NetFlix Result:"+result["Netflix"])
  // console.log(`testDisneyPlus: region=${region}, status=${status}`)
  // if (status==STATUS_COMING) {
  //   //console.log(1)
  //   result["Disney"] = "<b>Disneyᐩ:</b> 即将登陆 ➟ "+'⟦'+flags.get(region.toUpperCase())+"⟧ ⚠️"
  // } else if (status==STATUS_AVAILABLE){
  //   //console.log(2)
  //   result["Disney"] = "<b>Disneyᐩ:</b> 支持 ➟ "+'⟦'+flags.get(region.toUpperCase())+"⟧ 🎉"
  //   console.log(result["Disney"])
  // } else if (status==STATUS_NOT_AVAILABLE) {
  //   //console.log(3)
  //   result["Disney"] = "<b>Disneyᐩ:</b> 未支持 🚫 "
  // } else if (status==STATUS_TIMEOUT) {
  //   result["Disney"] = "<b>Disneyᐩ:</b> 检测超时 🚦 "
  // }

  let content = "------------------------------"+"</br>"+([result["ChatGPT"]]).join("</br></br>")
  content = content + "</br>------------------------------</br>"+"<font color=#CD5C5C >"+"<b>节点</b> ➟ " + $environment.params+ "</font>"
  content =`<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + content + `</p>`
//  cnt = `<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` +'----------------------</br></br>'+result["Disney"]+'</br></br>----------------------</br>'+$environment.params + `</p>`
$configuration.sendMessage(message).then(resolve => {
    if (resolve.error) {
      console.log(resolve.error);
      $done()
    }
    if (resolve.ret) {
      let output=JSON.stringify(resolve.ret[message.content])? JSON.stringify(resolve.ret[message.content]).replace(/\"|\[|\]/g,"").replace(/\,/g," ➟ ") : $environment.params
      let content = "--------------------------------------</br>"+([result["ChatGPT"]]).join("</br></br>")
      content = content + "</br>--------------------------------------</br>"+"<font color=#CD5C5C>"+"<b>节点</b> ➟ " + output+ "</font>"
      content =`<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + content + `</p>`
      //$notify(typeof(output),output)
      console.log(output);
      $done({"title":result["title"],"htmlMessage":content})
      
    }
    //$done();|
  }, reject => {
    // Normally will never happen.
    $done();
  });  
  //$done({"title":result["title"],"htmlMessage":content})
})()
.finally(() => {
  
  $configuration.sendMessage(message).then(resolve => {
    if (resolve.error) {
      console.log(resolve.error);
      $done()
    }
    if (resolve.ret) {
      let output=JSON.stringify(resolve.ret[message.content])? JSON.stringify(resolve.ret[message.content]).replace(/\"|\[|\]/g,"").replace(/\,/g," ➟ ") : $environment.params
      let content = "--------------------------------------</br>"+([result["ChatGPT"]]).join("</br></br>")
      content = content + "</br>--------------------------------------</br>"+"<font color=#CD5C5C>"+"<b>节点</b> ➟ " + output+ "</font>"
      content =`<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + content + `</p>`
      //$notify(typeof(output),output)
      console.log(output);
      $done({"title":result["title"],"htmlMessage":content})
      
    }
    //$done();|
  }, reject => {
    // Normally will never happen.
    $done();
  }); 
  
    $done({"title":result["title"],"htmlMessage":`<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">`+'----------------------</br></br>'+"🚥 检测异常"+'</br></br>----------------------</br>'+ output + `</p>`})
}
  );

function timeout(delay = 5000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Timeout')
    }, delay)
  })
}


// openai test

support_countryCodes=["T1","XX","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BD","BB","BE","BZ","BJ","BT","BA","BW","BR","BG","BF","CV","CA","CL","CO","KM","CR","HR","CY","DK","DJ","DM","DO","EC","SV","EE","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KW","KG","LV","LB","LS","LR","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PE","PH","PL","PT","QA","RO","RW","KN","LC","VC","WS","SM","ST","SN","RS","SC","SL","SG","SK","SI","SB","ZA","ES","LK","SR","SE","CH","TH","TG","TO","TT","TN","TR","TV","UG","AE","US","UY","VU","ZM","BO","BN","CG","CZ","VA","FM","MD","PS","KR","TW","TZ","TL","GB"]

function testChatGPT() {
  return new Promise((resolve, reject) =>{
    let option = {
      url: BASE_URL_GPT,
      opts: opts1,
      timeout: 1500,
    }
    $task.fetch(option).then(response=> {
      let resp = JSON.stringify(response)
      console.log("ChatGPT Main Test")
      let jdg = resp.indexOf("text/plain")
      if(jdg == -1) {
      let option1 = {
        url: Region_URL_GPT,
        opts: opts1,
        timeout: 1500,
      }
      $task.fetch(option1).then(response=> {
        console.log("ChatGPT Region Test")
        let region = response.body.split("loc=")[1].split("\n")[0]
        console.log("ChatGPT Region: "+region)
        let res = support_countryCodes.indexOf(region)
        if (res != -1) {
          result["ChatGPT"] = "<b>ChatGPT: </b>支持 "+arrow+ "⟦"+flags.get(region.toUpperCase())+"⟧ 🎉"
          console.log("支持 ChatGPT")
          resolve("支持 ChatGPT")
          return
        } else {
          result["ChatGPT"] = "<b>ChatGPT: </b>未支持 🚫"
          console.log("不支持 ChatGPT")
          resolve("不支持 ChatGPT")
          return
        }
      }, reason => {
        console.log("Check-Error"+reason)
        resolve("ChatGPT failed")
      })
    } else {
      result["ChatGPT"] = "<b>ChatGPT: </b>未支持 🚫"
      console.log("不支持 ChatGPT")
      resolve("不支持 ChatGPT")
    }
    }, reason => {
      console.log("ChatGPT-Error"+reason)
      resolve("ChatGPT failed")
    })})}