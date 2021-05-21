let midi_ports = null
WebMidi.enable(err => {

  if (err) {
    console.log("WebMidi could not be enabled.", err)
  } else {
    console.log("WebMidi enabled!")
    console.log(WebMidi.outputs);
    create_menu(WebMidi.outputs)
  }

});
function create_menu(req) {
  midi_ports = req
  let index = 0
  for (const midi_port of req) {
    const btn = document.createElement('div')
    btn.setAttribute('class', 'btn')
    btn.textContent = midi_port['name']
    btn.setAttribute('id', index)
    const parent_div = document.querySelector('div.test')
    parent_div.appendChild(btn)
    btn.addEventListener('click', (e) => {
      // needs to be solved potential bug
      // fix line 220 in content-script
      chrome.tabs.query({ url: '*://*.youtube.com/*' }, tabs => {
        // here we can connect to more browser tabs using a loop
        // using the index might cause bugs🐛
        chrome.tabs.sendMessage(tabs[0].id, { midi_out: index});
      });
    })
    index++
  }
}


chrome.runtime.onMessage.addListener(
  (request, sender, send_response) => {
    const data_div = document.querySelector('.data-div')
    data_div.textContent = JSON.stringify(inner_event.event_name)
    // if (request['message'] == data) {
    //   const data = request['json']
    //   // hadle midi port selection
    //   console.log('received data from background')
    //   const data_div = document.querySelector('.data-div')
    //   if (!is_ads_data(data)) {
    //     const events = data['events']
    //     for (const event of events) {
    //       const inner_event = return_inner_event(event)

    //       data_div.textContent = inner_event.event_name
    //     }
    //     // WebMidi.inputs[1].addListener('clock', 'all', tracker.step_tracker)
    //   }
    // }

    send_response({ res: "item received from popup" })
  }
)


// "default_icon": {                    
//     "16": "images/icon16.png",           
//     "24": "images/icon24.png",
//     "32": "images/icon32.png"
//   },