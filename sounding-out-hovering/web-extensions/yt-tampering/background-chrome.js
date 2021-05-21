function logURL(requestDetails) {
  console.log("Loading: ")
  console.log(requestDetails)
}


function tamper_request_listener(e) {


  if (e.requestBody) {
    // console.log("raw request")
    // console.log(e)
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    // let json = JSON.stringify(e.requestBody.raw[0].bytes)
    /**
     * solution to translate RAW bytes into readable JSON
     * Source of the solution found here:
     * https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
     */
    // console.log(e.requestBody.raw[0].bytes)
    const raw_body = String.fromCharCode.apply(null, new Uint8Array(e.requestBody.raw[0].bytes))
    // console.log('raw body');
    // console.log(raw_body);
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    const json = JSON.parse(raw_body)
    // console.log("it's data Baby!");
    console.log(json)

    /**
     * Send the raw message as kick
     */

    chrome.tabs.query({ url: '*://*.youtube.com/*' }, tabs => {
      // here we can connect to more browser tabs using a loop
      chrome.tabs.sendMessage(tabs[0].id, {json: json}, response => {
        console.log(response.res);
      });
    });

    // if (json['events']) {
    const v_e_g = 'visualElementGestured'
    const c_d = 'clientData'
    const g_t = 'gestureType'
    const interaction = 'INTERACTION_LOGGING_GESTURE_TYPE_HOVER'
    const t_h_d = 'thumbnailHoveredData'
    const forge_video_id = 'sI-UiIuUseY'
    // const gestured = json['events'].map(item => item.hasOwnPropery(v_e_g))
    // console.log(gestured)

    // for (const event of json['events']) {

    //   Object.keys(event).forEach(key => {
    //     if (key === v_e_g) {
    //       const item = event[key]
    //       if (item[g_t] === interaction) {
    //         // console.log('tampered')
    //         let data = item[c_d]
    //         data = data[t_h_d]
    //         console.log("posting a message!");
    //         console.log(item)
    //         chrome.tabs.query({ url: '*://*.youtube.com/*' }, tabs => {
    //           // here we can connect to more browser tabs using a loop
    //           chrome.tabs.sendMessage(tabs[0].id, { item, midi_channel: 1, hover: true }, response => {
    //             console.log(response.res);
    //           });
    //         });

    //         console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    //         // console.log(data)
    //         // console.log(data['videoId'])
    //         // data['videoId'] = forge_video_id
    //         // console.log(data['videoId'])
    //         // this works
    //       }
    //     }
    //   }
    //   )
    // }
    // }
    /**
     * need to check whther the tamperng below really works
     */
    // console.log(json)
    // const converted_body = JSON.stringify(json)
    // const buf = new ArrayBuffer(converted_body.length * 2); // 2 bytes for each char
    // var bufView = new Uint8Array(buf);
    // for (var i = 0, strLen = converted_body.length; i < strLen; i++) {
    //   bufView[i] = converted_body.charCodeAt(i);
    // }
    // requestBody.raw[0].bytes = buf // tamper request body? will it work like this?
    // console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
  }
}

function tamper_header_listener(e) {


  if (e.method === 'POST') {
    console.log("raw header")
    console.log(e)
    console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
    console.log('HEADER URL!')
    console.log(e.url)
    console.log('//////////////////////////////////////////////\n//////////////////////////////////////////////');
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

chrome.webRequest.onBeforeRequest.addListener(
  tamper_request_listener,
  { urls: ["<all_urls>"] },
  ["blocking", "requestBody"]
);

// chrome.webRequest.onBeforeSendHeaders.addListener(
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