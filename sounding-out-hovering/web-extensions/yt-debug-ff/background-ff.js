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
        // // This handle the request to get new videos
        console.log('///~~~ next ~~~///')
        console.log(json)
        // send_message(yt_ids.next, json)
        console.log('///~~~~~~~~~~~~///')
      }
      if (e.url.includes('player?')) {
        // // This handle the request to get new videos
        // console.log('///~~~ player ~~~///');
        // console.log(json)
        send_message(yt_ids.player, json)
        // console.log('///~~~~~~~~~~~~///')
      }

      if (e.url.includes('browse?')) {
        // // This handle the request to get new videos
        // console.log('///~~~ browse ~~~///');
        // console.log(json)
        send_message(yt_ids.browse, json)
        // console.log('///~~~~~~~~~~~~///')
      }
      if (e.url.includes('log_event?')) {
        console.log('///~~~ log event ~~~///')
        console.log(json)
        // // let vel = json['events'].length
        // // console.log(vel)
        // // if (vel > 127) {
        // //   vel = 127
        // // }
        send_message(yt_ids.log, json)
        // console.log('///~~~~~~~~~~~~///')
      }
      if (e.url.includes('edit_playlist?')) {
        // console.log('///~~~ playlist ~~~///');
        // send_message(yt_ids.playlist, json)
      }
    }
  }

}
let prev_fexp = null
function comapre_fexp(fexp) {
  console.log(fexp)
  if (prev_fexp === null) {
    prev_fexp = fexp
    console.log('set prev fexp first time', prev_fexp)
    return fexp[0]
  }

  for (let i = 0; i < fexp.length; i++) {
    const prev_el = prev_fexp[i]
    const curr_el = fexp[i]
    if (curr_el !== prev_el) {
      console.log('///~~~ found diff in fexp ~~~///')
      console.log(curr_el)
      prev_fexp = fexp
      return curr_el
    } else {
      console.log('same fexp');
    }
  }
}

function tamper_header_listener(e) {

  if (e.url.includes('watchtime?')) {
    // console.log("///~~~ watchtime ~~~///")
    const json = get_params_from_url(e.url)
    send_message(yt_ids.watchtime, json)
    // console.log(json)
    // console.log('///~~~~~~~~~~~~///')
  }
  if (e.url.includes('qoe?')) {
    console.log("///~~~ qoe ~~~///")

    const json = get_params_from_url(e.url)
    // console.log(json['docid'])
    // console.log(json)
    // curr_fexp = json['fexp'].split('%2C')

    // comapre_fexp(json['cpn'].split(''))
    send_message(yt_ids.qoe, json)
    // console.log('///~~~~~~~~~~~~///')
  }
  if (e.url.includes('search?')) {
    // console.log("///~~~ search ~~~///")

    const json = get_params_from_url(e.url)
    send_message(yt_ids.search, json)
    // console.log(json)
    // console.log('///~~~~~~~~~~~~///')
  }
}





/**
 * 
 * @param {String} url 
 * @returns Object containig the parameters of the request
 */
function get_params_from_url(url) {
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
 * Send the raw message over network to a server
 */

function send_message(id, data) {
  // console.log('sending message')
  // browser.tabs.query({ url: '*://*.youtube.com/*' }, tabs => {
  //   // here we can connect to more browser tabs using a loop
  //   browser.tabs.sendMessage(tabs[0].id, { id: _id, data: _data }, response => {
  //     console.log(response.res);
  //   });
  // });
  fetch('http://127.0.0.1:3000/log-point',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, data })
    })
    .then(response => response.json())
    // .then(result => { console.log('Success:', result); })
    .catch(error => { console.error('Error:', error); });
}

// background.js

function handleMessage(request, sender, sendResponse) {
  console.log(request)
  function logTabs(tabs) {

    const creating = browser.tabs.create({
      url: 'https://www.youtube.com' + request['url'],
      active: true,

    });
    creating.then(onCreated, onError)

    // console.log(tabs)
    // const removing = browser.tabs.remove([tabs[4].id, tabs[5].id]);
    // removing.then(onRemoved, onError);
  }
  // setTimeout(() => {
  //   const querying = browser.tabs.query({ currentWindow: true })
  //   querying.then(logTabs, onError)
  // }, 5000)
}

browser.runtime.onMessage.addListener(handleMessage);


let created_tab_id = 0

function onCreated(tab) {
  console.log(`Created new tab: ${tab.id}`)
  created_tab_id = tab.id
  setTimeout(() => {
    const removing = browser.tabs.remove(tab.id);
    removing.then(onRemoved, onError)
  }, 60000)
}

function onError(error) {
  console.log(`Error: ${error}`)
}

function onRemoved(tab) {
  console.log(`Removed tab: `, tab.id)
}
