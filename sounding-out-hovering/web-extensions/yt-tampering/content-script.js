let midi_out = null // <= needs to be removed
let tracker = null




///~~~ HERE SET THE VALUE FOR THE CORRECT MIDI DRIVER ~~~///
///~~~ LOOK in the console and check which are the ports to connect to your midi device  ~~~///
const midi_out_port = 2
const midi_in_port = 2

// const nodes = document.querySelectorAll("ytd-rich-grid-media")
// console.log(nodes)
// const video_ids = []
// for (const t of nodes) {
//   if (t['__data'] !== undefined) {
//     const random_idx = Math.floor(Math.random() * videos.length)
//     video_ids.push(t['__data']['data']['videoId'])
//     // console.log(t['__data']['data']['videoId'])
//   }
// }

// console.log(video_ids)


WebMidi.enable(err => {

  if (err) {
    console.log("WebMidi could not be enabled.", err)
  } else {
    console.log("WebMidi enabled!")
    console.log('///~~~ MIDI OUT ~~~///')
    console.log(WebMidi.outputs)

    console.log('///~~~ MIDI IN ~~~///')
    console.log(WebMidi.inputs)
    console.log(
      `%c      ///~~~~~~~  IMPORTANT  ~~~~~~~///*
      |* check the above midi ports    *
      |* and set them at the beginning *
      |* of content-script.js          *`,
      'font-weight: bold; background-color: #000; color:fff'
    )
    // CHANGE THIS POSSIBLE BUG 🐛
    // midi_out = WebMidi.outputs[1]
    tracker = new Tracker(4, WebMidi.outputs[midi_out_port], WebMidi.inputs[midi_in_port], Tone)
    // tracker.init_tracker(185)
    //INITIALIZE P5 SKETCH
    // const myp5 = new p5(s)
  }

})

chrome.runtime.onMessage.addListener(
  (request, sender, send_response) => {
    if (request['midi_out'] !== undefined) {
      // hadle midi port selection
      console.log('received midi port info')
      console.log(request);

      // tracker.init_tracker(185)
      // WebMidi.inputs[1].addListener('clock', 'all', tracker.step_tracker)
    } else {
      if (tracker.initialized) {
        read_data(request)
        // chrome.runtime.sendMessage({message: 'data', data: request}, response => {
        //   console.log(response.res);
        // })
      }
    }
    send_response({ res: "item received" })
  }
)

function read_data(request) {
  const data = request['json']

  if (is_ads_data(data)) {
    console.log('///~~~PLAY ADVERTISERS!~~~///')
    console.log(data)
    tracker.add_note(2, tracker.new_note('E4', random_127_value()))
    tracker.play_note('E4', 127)

  } else {

    const events = data['events']
    /**
     *  VISUAL ELEMENT STATE CHANGED EVENTS
     */
    const VESC_events = events.filter(item => return_inner_event(item).event_name === yt_events_names.VESC)
    // console.log(`///~~~${yt_events_names.VESC}~~~///`)
    // console.log(VESC_events)
    compute_percussions_pattern(VESC_events)
    /////////////////////////////////////////////
    const gesture_events = events.filter(item => return_inner_event(item).event_name === yt_events_names.VEG)
    // console.log(`///~~~${yt_events_names.VEG}~~~///`)
    // console.log(gesture_events)
    if (gesture_events.length > 0) {
      compute_main_voice_pattern(gesture_events)
    }
    const VES_events = events.filter(item => return_inner_event(item).event_name === yt_events_names.VES)
    // console.log(`///~~~${yt_events_names.VES}~~~///`)
    // console.log(VES_events)
    const VEA_events = events.filter(item => return_inner_event(item).event_name === yt_events_names.VEA)
    // console.log(`///~~~${yt_events_names.VEA}~~~///`)
    // console.log(VEA_events)
    // for (const event of events) {
    //   const inner_event = return_inner_event(event)
    //   // console.log(inner_event)
    //   let computed_velocity = 0
    //   switch (inner_event.event_name) {
    //     case yt_events_names.VEG:
    //       if (inner_event.event['gestureType'] === interaction_HOVER) {
    //         // if HOVER do this
    //         // console.log('HOVER')
    //         ///~~~USE THIS FOR GRANULAR SYNTH IN THE FUTURE~~~///
    //         const video_id = inner_event.event[c_d][t_h_d]['videoId']
    //         /////////////////////////////////////////////////////
    //         const duration = parseInt(inner_event.event[c_d][t_h_d]['durationHoveredMs'])
    //         computed_velocity = (duration / 1000) * 127
    //         tracker.add_note(0, tracker.new_note('C4', computed_velocity))
    //       } else {
    //         // if CLICK do that
    //         // console.log('CLICK')
    //         // console.log(inner_event)
    //         tracker.add_note(1, tracker.new_note('D4', radom_127_value()))
    //       }
    //       break;
    //     case yt_events_names.FHB:
    //       const f_a_m = parseInt(inner_event.event['firstActivityMs'])
    //       const l_e_d_m = parseInt(inner_event.event['lastEventDeltaMs'])
    //       computed_velocity = (Math.abs(f_a_m * l_e_d_m) * 127) % 127
    //       tracker.add_note(2, tracker.new_note('E4', computed_velocity))
    //       break;
    //     case yt_events_names.VES:
    //       tracker.add_note(2, tracker.new_note('F4', radom_127_value()))
    //       break;
    //     case yt_events_names.VESC:
    //       // console.log(inner_event.event)
    //       const grid_data = inner_event.event['clientData']['gridData']
    //       const col = parseInt(grid_data['veColumnCoordinate'])
    //       const row = parseInt(grid_data['veRowCoordinate'])
    //       computed_velocity = Math.abs((col * 32) - row) % 127
    //       tracker.add_note(4, tracker.new_note('G4', computed_velocity))
    //       break;
    //     case yt_events_names.VEA:
    //       tracker.add_note(5, tracker.new_note('A4', radom_127_value()))
    //       break;
    //     default:
    //       // console.log(inner_event)
    //       tracker.add_note(6, tracker.new_note('B4', radom_127_value()))
    //   }
    // }
  }
}

function compute_percussions_pattern(events) {
  let max = 0
  for (const event of events) {
    const inner_event = return_inner_event(event)
    // const grid_data = inner_event.event['clientData']['gridData']
    // const col = parseInt(grid_data['veColumnCoordinate'])
    // const row = parseInt(grid_data['veRowCoordinate'])
    // if(col > 5){
    //   console.log(inner_event)
    // }
    if (inner_event.event['clientData']['gridData']['gridColumnCount'] !== undefined) {
      // console.log('//~~columnn count~~//')
      // console.log(inner_event.event['clientData']['gridData']['gridColumnCount'])
      max = inner_event.event['clientData']['gridData']['gridColumnCount']
      console.log('///~~~ MAKE percussions PATTERN ~~~///')
      console.log(euclidean_pattern(max * 8, 128))
      tracker.make_pattern(1, 'D4', euclidean_pattern(max * 8, 128))
      break
    }
  }
}

function compute_main_voice_pattern(events) {

  const v_e_g = 'visualElementGestured'
  const c_d = 'clientData'
  const g_t = 'gestureType'
  const interaction_HOVER = 'INTERACTION_LOGGING_GESTURE_TYPE_HOVER'
  const interaction_CLICK = 'INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK'
  const t_h_d = 'thumbnailHoveredData'
  const forge_video_id = 'sI-UiIuUseY'
  let steps = events.length
  const computed_velocity = []
  for (const event of events) {
    const inner_event = return_inner_event(event)
    /////////////////////////////////////////////////////
    if (inner_event.event[g_t] === interaction_CLICK) {
      // computed_velocity.push(127)
      console.log('///~~~PLAY A CLICK~~~///')
      tracker.add_note(2, tracker.new_note('E4', 127))
      tracker.play_note('E4', 127)
      steps--
    } else {

      // const video_id = inner_event.event[c_d][t_h_d]['videoId'
      const duration = parseInt(inner_event.event[c_d][t_h_d]['durationHoveredMs'])
      computed_velocity.push(Math.floor((duration / 3000) * 127))
    }
    // tracker.add_note(0, tracker.new_note('C4', computed_velocity))
  }
  if (steps > 0) {
    console.log('///~~~ MAKE MAIN VOICE PATTERN ~~~///')
    console.log(euclidean_pattern(steps * 4, 128))
    tracker.make_pattern(0, 'C4', euclidean_pattern(steps * 4, 128), computed_velocity)
  }
}


/**
 * Code from: https://github.com/dbkaplun/euclidean-rhythm
 * @param {Number} triggers 
 * @param {Number} total_steps 
 */
function euclidean_pattern(triggers, total_steps) {
  let groups = [];
  for (let i = 0; i < total_steps; i++) groups.push([Number(i < triggers)]);

  let l;
  while (l = groups.length - 1) {
    let start = 0, first = groups[0];
    while (start < l && compare_arrays(first, groups[start])) start++;
    if (start === l) break;

    let end = l, last = groups[l];
    while (end > 0 && compare_arrays(last, groups[end])) end--;
    if (end === 0) break;

    let count = Math.min(start, l - end);
    groups = groups
      .slice(0, count)
      .map(function (group, i) { return group.concat(groups[l - i]); })
      .concat(groups.slice(count, -count));
  }
  return [].concat.apply([], groups);
};

function compare_arrays(a, b) {
  // TODO: optimize
  return JSON.stringify(a) === JSON.stringify(b);
};


/**
 * DEBUGGING PURPOSE
 */

function debug_midi_sc_connection() {
  console.log('playing a note')
  midi_out.playNote('C4', 1)
    .stopNote('C4', 1, { time: '+1000' })
}

function debug_midi_sc_connection_channel() {
  console.log('playing a note')
  midi_out.playNote('C3', 4)
    .stopNote('C3', 4, { time: '+100' })
}

// setInterval(debug_midi_sc_connection, 2500)
// setInterval(debug_midi_sc_connection_channel, 5000)







// function interceptData() {
//   console.log('intercepting started...');
//   let xhrOverrideScript = document.createElement('script');
//   xhrOverrideScript.type = 'text/javascript';
//   xhrOverrideScript.innerHTML = `
//     (function() {
//       var XHR = XMLHttpRequest.prototype;
//       var send = XHR.send;
//       var open = XHR.open;
//       console.log('send', send)
//       XHR.open = function(method, url) {
//           this.url = url; // the request url
//           return open.apply(this, arguments);
//       }
//       XHR.send = function() {
//           this.addEventListener('loadstart', function() {
//             console.log('intercept data', this)
//               if (this.url.includes('<url-you-want-to-intercept>')) {
//                   var dataDOMElement = document.createElement('div');
//                   dataDOMElement.id = '__interceptedData';
//                   dataDOMElement.innerText = this.response;
//                   dataDOMElement.style.height = 0;
//                   dataDOMElement.style.overflow = 'hidden';
//                   //document.body.appendChild(dataDOMElement);
//               }               
//           });
//           return send.apply(this, arguments);
//       };
//     })();
//     `
//   // document.head.prepend(xhrOverrideScript);
//   document.body.appendChild(xhrOverrideScript);
// }


// interceptData()

// // function checkForDOM() {
// //   if (document.body && document.head) {
// //     interceptData();
// //   } else {
// //     window.requestIdleCallback(checkForDOM);
// //   }
// // }
// // window.requestIdleCallback(checkForDOM);