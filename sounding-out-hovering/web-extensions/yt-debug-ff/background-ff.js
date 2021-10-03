console.log(`
%c      ///~~~~~~~  IMPORTANT  ~~~~~~~///*
      |* check that the extension  ID    *
      |* is properly set in              *
      |* devtools-panel.js           *`,
  'font-weight: bold; background-color: #000; color:fff'
)

function logURL(requestDetails) {
  console.log("Loading: ")
  console.log(requestDetails)
}


browser.webRequest.onBeforeRequest.addListener(
  tamper_request_listener,
  { urls: ["<all_urls>"] },
  ["blocking", "requestBody"]
);

browser.webRequest.onBeforeSendHeaders.addListener(
  tamper_header_listener,
  { urls: ["<all_urls>"] },
  // ["requestHeaders", "blocking", "extraHeaders"]
  ["requestHeaders", "blocking"]
);


function tamper_request_listener(e) {

  // console.log('///~~~ raw request ~~~///')
  // console.log(e)
  if (e.method === 'POST') {
    if (!!e.requestBody.raw) {
      /**
       * solution to translate RAW bytes into readable JSON
       * Source of the solution found here:
       * https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
       */
      const raw_body = String.fromCharCode.apply(null, new Uint8Array(e.requestBody.raw[0].bytes))
      const json = JSON.parse(raw_body)


      if (e.url.includes('next?')) {
        // This handle the request to get new videos
        // console.log('///~~~ next  ~~~///');
        send_message(yt_ids.next, json)
      }
      if (e.url.includes('player?')) {
        // This handle the request to get new videos
        // console.log('///~~~ player ~~~///');
        send_message(yt_ids.player, json)
      }
      if (e.url.includes('log_event?')) {
        // console.log('///~~~ log event ~~~///');
        send_message(yt_ids.log, json)
      }
      if (e.url.includes('edit_playlist?')) {
        // console.log('///~~~ playlist ~~~///');
        send_message(yt_ids.playlist, json)
      }
    }
  }

}

function tamper_header_listener(e) {

  if (e.url.includes('watchtime?')) {
    // console.log("///~~~ watchtime ~~~///")
    // console.log(e)
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    // console.log('HEADER URL!')
    // console.log(e.url)
    send_message(yt_ids.watchtime, getParamsFromUrl(e.url))
    console.log(getParamsFromUrl(e.url))
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  }
  if (e.url.includes('qoe?')) {
    // console.log("///~~~ qoe ~~~///")
    // console.log(e)
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    // console.log('HEADER URL!')
    // console.log(e.url)
    send_message(yt_ids.qoe, getParamsFromUrl(e.url))
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  }
  if (e.url.includes('search?')) {
    // console.log("///~~~ search ~~~///")
    // console.log(e)
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    // console.log('HEADER URL!')
    send_message(yt_ids.search, getParamsFromUrl(e.url))
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  }

  if (e.method === 'GET') {

    // // let json = JSON.stringify(e.requestBody.raw[0].bytes)
    // /**
    //  * solution to translate RAW bytes into readable JSON
    //  * Source of the solution found here:
    //  * https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
    //  */
    // const raw_body = String.fromCharCode.apply(null, new Uint8Array(e.requestBody.raw[0].bytes))
    // console.log('raw body');
    // console.log(raw_body);
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    // const json = JSON.parse(raw_body)
    // // function ab2str(buf) {
    // //   return String.fromCharCode.apply(null, new Uint16Array(buf));
    // // }
    // console.log("it's data Baby!");
    // console.log(json);
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  }
}

/**
 * 
 * @param {String} url 
 * @returns Object containig the parameters of the request
 */
function getParamsFromUrl(url) {
  url = decodeURI(url);
  if (typeof url === 'string') {
    let params = url.split('?');
    let eachParamsArr = params[1].split('&');
    let obj = {};
    if (eachParamsArr && eachParamsArr.length) {
      eachParamsArr.map(param => {
        let keyValuePair = param.split('=')
        let key = keyValuePair[0];
        let value = keyValuePair[1];
        obj[key] = value;
      })
    }
    return obj;
  }
}

/**
 * Send the raw message
 */

function send_message(_id, _data) {
  browser.tabs.query({ url: '*://*.youtube.com/*' }, tabs => {
    // here we can connect to more browser tabs using a loop
    browser.tabs.sendMessage(tabs[0].id, { id: _id, data: _data }, response => {
      console.log(response.res);
    });
  });
}
/**
 * This handles the message passing from the log point
 * it should forward it to the content script
 */
// browser.runtime.onMessageExternal.addListener(
//   (request, sender, send_response) => {
//     console.log(request)
//     send_message(request['id'], request['data'])
//     send_response({ res: "item received" }
//     );
//   })

// browser.runtime.onMessage.addListener(
//   (request, sender, send_response) => {
//     if (request['msg'] !== undefined) {
//       console.log(request)

//       browser.webRequest.onBeforeRequest.addListener(
//         tamper_request_listener,
//         { urls: ["<all_urls>"] },
//         ["blocking", "requestBody"]
//       );

//       browser.webRequest.onBeforeSendHeaders.addListener(
//         tamper_header_listener,
//         { urls: ["<all_urls>"] },
//         // ["requestHeaders", "blocking", "extraHeaders"]
//         ["requestHeaders", "blocking"]
//       );
//       // send_message(request, null)
//       send_response({ res: "item received" }
//       )
//     }
//   })

// browser.webRequest.onBeforeRequest.addListener(
//   tamper_request_listener,
//   { urls: ["<all_urls>"] },
//   ["blocking", "requestBody"]
// );

// browser.webRequest.onBeforeSendHeaders.addListener(
//   tamper_header_listener,
//   { urls: ["<all_urls>"] },
//   // ["requestHeaders", "blocking", "extraHeaders"]
//   ["requestHeaders", "blocking"]
// );

function check_tampering(e) {
  console.log('check tampering');
  console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  console.log(e)
  console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
}

// browser.webRequest.onSendHeaders.addListener(
//   check_tampering,
//   { urls: ["<all_urls>"] },
//   ["blocking", "requestBody"]
// )