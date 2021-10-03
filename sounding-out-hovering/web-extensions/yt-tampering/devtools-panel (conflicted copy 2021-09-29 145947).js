const ID = 'lkccpljndkjcmbkbikhkfionihkllpmb' // Mac 2016
// const ID = 'likacmeclfhieiomplbbhpfigcalhfei'

/**
Handle errors from the injected script.
Errors may come from evaluating the JavaScript itself
or from the devtools framework.
See https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow/eval#Return_value
*/
function handleError(error) {
  if (error.isError) {
    console.log(`Devtools error: ${error.code}`);
  } else {
    console.log(`JavaScript error: ${error.value}`);
  }
}

/**
Handle the result of evaluating the script.
If there was an error, call handleError.
*/
function handleResult(result) {
  console.log(result)
  if (result[1]) {
    handleError(result[1]);
  }
  // else{
  //   document.querySelector('.editable').innerText = 'COde INjeCTed!'
  // }
}

/**
Handle the result of evaluating the jQuery test script.
Log the result of the test, or
if there was an error, call handleError.
*/
function handlejQueryResult(result) {
  if (result[0] !== undefined) {
    console.log(`jQuery: ${result[0]}`);
  } else if (result[1]) {
    handleError(result[1]);
  }
}
/**
When the user clicks the 'jquery' button,
evaluate the jQuery script.
*/
// const checkjQuery = "typeof jQuery != 'undefined'";
// document.getElementById("button_jquery").addEventListener("click", () => {
//   chrome.devtools.inspectedWindow.eval(checkjQuery)
//     .then(handlejQueryResult);
// });   
/**
When the user clicks each of the first three buttons,
evaluate the corresponding script.
*/
// const evalString = "$0.style.backgroundColor = 'red'";
// document.getElementById("button_background").addEventListener("click", () => {
//   chrome.devtools.inspectedWindow.eval(evalString)
//     .then(handleResult);
// });

// const inspectString = "console.log(document.querySelector('h1'))"


// document.getElementById("submit").addEventListener("click", () => {
//   // const code = document.querySelector('.editable').innerText
//   // console.log(code)
//   // chrome.devtools.inspectedWindow.eval(code)
//   //   .then(handleResult);
//   const ID = 'likacmeclfhieiomplbbhpfigcalhfei'
//   chrome.runtime.sendMessage(ID, 
//     { msg: 'devtools ready' },
//     response => console.log(response.res)
//   )
// })





const code_to_inject = `/**
 * 
 * @param {String} _id 
 * @param {Object} _data 
 * @param {Boolean} _record 
 * @param {Number} _trig
 */
function __send_message(_id, _data, _trig, _record) {
  // this below is the extension ID
  // const ID = 'likacmeclfhieiomplbbhpfigcalhfei'
  const ID = ${ID}
  const data = {
    val: _data,
    trig: _trig,
    record: !!_record
  }
  chrome.runtime.sendMessage(ID, { id: _id, data}, response => {
    console.log(response.res);
  })
}`
// const ID = 'lkccpljndkjcmbkbikhkfionihkllpmb' // Mac 2016
// const ID = 'likacmeclfhieiomplbbhpfigcalhfei'
window.onload = () => {
  chrome.devtools.inspectedWindow.eval(code_to_inject,
    (result, is_exception) => {
      if (is_exception) {
        console.log("Could not load the code")
      } else {
        document.querySelector('.editable').innerText = 'COde INjeCTed!'
      }
    }
  )
  // console.log('we get to this line?');
  send_message('devtools', { ready: true })
  chrome.runtime.sendMessage(ID, { msg: 'devtools ready' }, response => {
    console.log(response.res);
  })
}

// from who do I receive this message?
chrome.runtime.onMessage.addListener(
  (request, sender, response) => {
    if (request['id'] === 'midi') {
      console.log('midi loaded!')
      console.log(request)
      response({ res: "item received" })
      for (let i = 0; i < request['out'].length; i++) {
        const out = request['out'][i]
        const div = document.createElement('div')
        div.setAttribute('class', 'btn')
        div.setAttribute('id', out.name)
        div.textContent = out.name
        div.addEventListener('click', (e) => {
          const midi_out = parseInt(e.target.id)
          console.log(midi_out)

          send_message('midi_out', { midi_out })
          update_page()
        })
        document.querySelector('.container').appendChild(div)
      }
    }
  }
)

function update_page() {
  const container = document.querySelector('.container')
  const title = document.querySelector('.title')
  title.textContent = 'What to do next?'
  container.innerHTML = 'now that the midi device has been chosen navigate to <br>the network panel. In there you can set some log points<br>that can trigger a midi note. <br>Resources about log points can be found at<br><span class="clipboard">"https://developer.mozilla.org/en-US/docs/Tools/Debugger/Set_a_logpoint" </span><br>for example go to the sources tab and search for this js file<br>"/s/desktop/79946f8f/jsbin/desktop_polymer.vflset/desktop_polymer.js"<br>once there hit <span class="clipboard">cmd + f</span> and search for "b.durationHoveredMs"<br>set there a log point and copy the following as message<br><span class="clipboard">__send_message("log_point", {"hover":  b.durationHoveredMs}, 0, false),`hovering for ${b.durationHoveredMs}`</span><br>this will do two things, first will send a midi note C4 message on channel 1, and will log the hovering information to the console.<br>the hovering information sent over is the data that youtube collects and sends as log_messages back to its server. so to trigger such note you will need to hover a video thumbnail<br><br>__send_message(id, data, trig,record)<br><span class="highlight">id</span> = an identifier so that content script can filter it against other messages. for now it functions only with "log_point", additional might be added in the future<br><span class="highlight">data</span> = an object containing values to be translated into midi values. this needs to be better implemented in the future, because it works only with hovering information for the moment<br><span class="highlight">trig</span> = integer between 0 and 7 to paly or record a note between C3 => C4. trigs here are to be intended to trigger a percussion<br><span class="highlight">record</span> = boolean set to true will record the trig into the built in step sequencer<br>'
}



function send_message(_id, _data) {
  chrome.tabs.query({ url: '*://*.youtube.com/*' }, tabs => {
    // here we can connect to more browser tabs using a loop
    chrome.tabs.sendMessage(tabs[0].id, { id: _id, data: _data }, response => {
      console.log(response.res);
    });
  });
}

// __send_message('log_point', 'hovered val', 1, false)
// __send_message('log_point', {"hover": b.durationHoveredMs}, 0, false), `hovering for ${b.durationHoveredMs}`

/**
When the user clicks the 'message' button,
send a message to the background script.
*/
// const scriptToAttach = "document.body.innerHTML = 'Hi from the devtools';";
// document.getElementById("button_message").addEventListener("click", () => {
//   chrome.runtime.sendMessage({
//     tabId: chrome.devtools.inspectedWindow.tabId,
//     script: scriptToAttach
//   });
// });
