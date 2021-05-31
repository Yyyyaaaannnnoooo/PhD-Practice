function logURL(requestDetails) {
  console.log("Loading: ")
  console.log(requestDetails)
}


function tamper_request_listener(e) {

  // console.log('///~~~ raw request ~~~///')
  console.log(e)
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
        console.log('///~~~ next  ~~~///');
        send_message(yt_ids.next, json)
      }
      if (e.url.includes('player?')) {
        // This handle the request to get new videos
        console.log('///~~~ player ~~~///');
        send_message(yt_ids.player, json)
      }
      if (e.url.includes('log_event?')) {
        console.log('///~~~ log event ~~~///');
        send_message(yt_ids.log, json)
      }
      if (e.url.includes('edit_playlist?')) {
        console.log('///~~~ playlist ~~~///');
        send_message(yt_ids.playlist, json)
      }
    }
  }
  // console.log("raw request")

  // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  // let json = JSON.stringify(e.requestBody.raw[0].bytes)
  /**
   * solution to translate RAW bytes into readable JSON
   * Source of the solution found here:
   * https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
   */
  // console.log(e.requestBody.raw[0].bytes)
  // if (!!e.requestBody.formData) {
  //   console.log('///~~~ ad ~~~///');
  //   console.log(e)
  // } else {
  //   const raw_body = String.fromCharCode.apply(null, new Uint8Array(e.requestBody.raw[0].bytes))
  //   // console.log('raw body');
  //   // console.log(raw_body);
  //   // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  //   const json = JSON.parse(raw_body)
  //   // console.log("it's data Baby!");
  //   // console.log(json)



  //   // if (json['events']) {
  //   const v_e_g = 'visualElementGestured'
  //   const c_d = 'clientData'
  //   const g_t = 'gestureType'
  //   const interaction = 'INTERACTION_LOGGING_GESTURE_TYPE_HOVER'
  //   const t_h_d = 'thumbnailHoveredData'
  //   const forge_video_id = 'sI-UiIuUseY'
  //   // const gestured = json['events'].map(item => item.hasOwnPropery(v_e_g))
  //   // console.log(gestured)

  //   // for (const event of json['events']) {

  //   //   Object.keys(event).forEach(key => {
  //   //     if (key === v_e_g) {
  //   //       const item = event[key]
  //   //       if (item[g_t] === interaction) {
  //   //         // console.log('tampered')
  //   //         let data = item[c_d]
  //   //         data = data[t_h_d]
  //   //         console.log("posting a message!");
  //   //         console.log(item)
  //   //         chrome.tabs.query({ url: '*://*.youtube.com/*' }, tabs => {
  //   //           // here we can connect to more browser tabs using a loop
  //   //           chrome.tabs.sendMessage(tabs[0].id, { item, midi_channel: 1, hover: true }, response => {
  //   //             console.log(response.res);
  //   //           });
  //   //         });

  //   //         console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  //   //         // console.log(data)
  //   //         // console.log(data['videoId'])
  //   //         // data['videoId'] = forge_video_id
  //   //         // console.log(data['videoId'])
  //   //         // this works
  //   //       }
  //   //     }
  //   //   }
  //   //   )
  //   // }
  //   // }
  //   /**
  //    * need to check whther the tamperng below really works
  //    */
  //   // console.log(json)
  //   // const converted_body = JSON.stringify(json)
  //   // const buf = new ArrayBuffer(converted_body.length * 2); // 2 bytes for each char
  //   // var bufView = new Uint8Array(buf);
  //   // for (var i = 0, strLen = converted_body.length; i < strLen; i++) {
  //   //   bufView[i] = converted_body.charCodeAt(i);
  //   // }
  //   // requestBody.raw[0].bytes = buf // tamper request body? will it work like this?
  //   // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  // }

}

function tamper_header_listener(e) {

  if (e.url.includes('watchtime?')) {
    console.log("///~~~ watchtime ~~~///")
    console.log(e)
    console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    console.log('HEADER URL!')
    // console.log(e.url)
    send_message(yt_ids.watchtime, getParamsFromUrl(e.url))
    console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  }
  if (e.url.includes('qoe?')) {
    console.log("///~~~ qoe ~~~///")
    console.log(e)
    console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    console.log('HEADER URL!')
    // console.log(e.url)
    send_message(yt_ids.qoe, getParamsFromUrl(e.url))
    console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  }
  if (e.url.includes('search?')) {
    console.log("///~~~ search ~~~///")
    console.log(e)
    console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    console.log('HEADER URL!')
    send_message(yt_ids.search, getParamsFromUrl(e.url))
    console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
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
  chrome.tabs.query({ url: '*://*.youtube.com/*' }, tabs => {
    // here we can connect to more browser tabs using a loop
    chrome.tabs.sendMessage(tabs[0].id, { id: _id, data: _data }, response => {
      console.log(response.res);
    });
  });
}

chrome.runtime.onMessageExternal.addListener(
  (request, sender, send_response) => {
    console.log(request)
    send_response({ res: "item received" }
    );
  })

chrome.webRequest.onBeforeRequest.addListener(
  tamper_request_listener,
  { urls: ["<all_urls>"] },
  ["blocking", "requestBody"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  tamper_header_listener,
  { urls: ["<all_urls>"] },
  // ["requestHeaders", "blocking", "extraHeaders"]
  ["requestHeaders", "blocking"]
);

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