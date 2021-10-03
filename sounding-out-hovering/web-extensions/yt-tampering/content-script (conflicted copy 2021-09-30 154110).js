// Mac 2016
const ID = 'lkccpljndkjcmbkbikhkfionihkllpmb'
//-------------------//
// Mac 2012
// const ID = 'likacmeclfhieiomplbbhpfigcalhfei'

let tracker = null

// this should be moved inside the tracker as a static function...
const trigs = [
  { note: 'C4', midi_ch: 1, track: 0 },
  { note: 'D4', midi_ch: 1, track: 1 },
  { note: 'E4', midi_ch: 1, track: 2 },
  { note: 'F4', midi_ch: 1, track: 3 },
  { note: 'G4', midi_ch: 1, track: 4 },
  { note: 'A4', midi_ch: 1, track: 5 },
  { note: 'B4', midi_ch: 1, track: 6 },
  { note: 'C5', midi_ch: 1, track: 7 }
]

///~~~ HERE SET THE VALUE FOR THE CORRECT MIDI DRIVER ~~~///
///~~~ LOOK in the console and check which are the ports to connect to your midi device  ~~~///
let midi_out_port = 1
let midi_in_port = 1
let myp5 = null

// console.log('///~~~ INITIALIZE P5 SKETCH ~~~///')
// const myp5 = new p5(s)


WebMidi.enable(err => {

  if (err) {
    console.log("WebMidi could not be enabled.", err)
  } else {
    console.log("%cWebMidi enabled!", 'font-weight: bold; background-color: #000; color:fff')
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
    // const ID = 'likacmeclfhieiomplbbhpfigcalhfei'
    // chrome.runtime.sendMessage(ID, { id: 'midi', in: WebMidi.inputs, out: WebMidi.outputs }, response => console.log(response.res))

    // tracker = new Tracker(6, WebMidi.outputs[midi_out_port], WebMidi.inputs[midi_in_port], Tone)
    // tracker.init_tracker(165)
  }

})

/**
 * Listener waiting for messages coming from the background script
 * and from the popup script
 * @param {*} request 
 * @param {*} sender 
 * @param {*} send_response 
 */
chrome.runtime.onMessage.addListener(

  (request, sender, send_response) => {
    // console.log(request)
    if (request['id'] === 'devtools') {
      console.log(request['id'])
      // const ID = 'lkccpljndkjcmbkbikhkfionihkllpmb' // mac 2016
      // const ID = 'likacmeclfhieiomplbbhpfigcalhfei'
      chrome.runtime.sendMessage(ID,
        { id: 'midi', in: WebMidi.inputs, out: WebMidi.outputs },
        response => console.log(response.res)
      )
    } else if (request['id'] === 'midi_out') {
      console.log(request)

      console.log('///~~~ INITIALIZE P5 SKETCH ~~~///')
      myp5 = new p5(s)

      // console.log("%cWebMidi enabled!", 'font-weight: bold; background-color: #000; color:fff')
      console.log('///~~~ MIDI OUT ~~~///')
      midi_out_port = request['data']['midi_out']
      console.log(WebMidi.outputs[midi_out_port])
      console.log('///~~~ MIDI IN ~~~///')
      midi_in_port = request['data']['midi_out']
      console.log(WebMidi.inputs[midi_in_port])


      tracker = new Tracker(6, WebMidi.outputs[midi_out_port], WebMidi.inputs[midi_in_port], Tone)
      tracker.init_tracker(165)

    } else {
      if (tracker !== null) {
        read_data(request)
        // chrome.runtime.sendMessage({message: 'data', data: request}, response => {
        //   console.log(response.res);
        // })
      } else {
        console.log('tracker not loaded')
      }
    }
    // if (request['midi_out'] !== undefined) {
    //   // hadle midi port selection
    //   console.log('received midi port info')
    //   console.log(request);

    //   // tracker.init_tracker(185)
    //   // WebMidi.inputs[1].addListener('clock', 'all', tracker.step_tracker)
    // } else {
    // }
    send_response({ res: 'item received from content script' })
  }
)
/**
 * THis function filters the request to be transformed into musical notes and patterns
 * @param {Object} request 
 */
function read_data(request) {
  console.log(request)
  const data = request['data']
  switch (request['id']) {
    case yt_ids.log_point:
      /**
       * this handles the user interaction with the add to playlist 
       * function
       */
      /**
       * here you ned to add a function that handles various fired logpoints
       * 1. hovering
       * 2. watchtime line 47180 && 47212 EEa(a, b)
       * 3. user-intent base.js line 83158
       *  - it seems to calculate the time between the start of advertising and you pressing skip ad
       * 4. freshness?
       */
      //  tracker.add_note(trigs[2].track, tracker.new_note(trigs[2].note, 127, trigs[2].midi_ch))
      console.log(data);
      tracker.play_note(trigs[0].note, 127, trigs[0].midi_ch)
      break
    case yt_ids.playlist:
      /**
       * this handles the user interaction with the add to playlist 
       * function
       */
      tracker.play_note(trigs[0].note, 127, trigs[0].midi_ch)
      break
    case yt_ids.next:
      /**
       * this compiles the video playlist, the watch next
       */
      break
    case yt_ids.player:
      /**
       * this request handles the video load 
       * given the video that is clicked it returns the video and the youtube player
       */
      // this should clear the tracker
      tracker.clear_tracker()
      break
    case yt_ids.log:
      /**
       * Log events send a ton of information to youtube advertising partners
       * MuBlock blocks such requests becuase the endpoint is external to the domain.
       * neverthelss, the log handles from gestures like clicks and hovering, to the distribution
       * of the videos in the page. as well as logging streaming problems and so on.
       * the latter might be used as sort of hardware profiling system, but also to check whether the 
       * user is a human or a bot.
       * the most interesting part is the logging of hovering information.
       * youtube records every sigle hovering of video thumbnail and sends this information 
       * as log
       */
      const events = request['data']['events']
      tracker.play_note(trigs[0].note, 127, trigs[0].midi_ch)
      /**
       *  this below should compute velocities fto modulate stuff...
       */
      // const VESC_events = events.filter(item => return_inner_event(item).event_name === yt_events_names.VESC)
      // // console.log(`///~~~${yt_events_names.VESC}~~~///`)
      // // console.log(VESC_events)
      // compute_percussions_pattern(VESC_events)
      /////////////////////////////////////////////
      const gesture_events = events.filter(item => return_inner_event(item).event_name === yt_events_names.VEG)
      // console.log(`///~~~${yt_events_names.VEG}~~~///`)
      // console.log(gesture_events)
      if (gesture_events.length > 0) {
        compute_main_voice_pattern(gesture_events)
      }
      break
    case yt_ids.watchtime:
      /**
       * USE THIS TO TRIGGER a BURST ENVELOPE IN VOICE 1
       */

      /**
       * this is the watchtime header.
       * it is cyclical with an average of one request every 40 seconds.
       * nevertheless it starts incrementally first request at video load, than after 1 second,
       *  than after 3, 10, 20 and than 40.
       * it also logs the audio levels, whether the video is muted and whether it is playng or not
       * this should be the header referred in many texts as the way by which youtube 
       * assess the worthyness of a video. that might be the reason by which at the beginning
       * so many requests are made. my assumption is that if the video causes a session end at the beginning 
       * it is more likely to score the video negatively.
       * nevertheless I did not analyze the last watchtime header sent after the video is closed. <= TO DO!
       */

      tracker.play_note(trigs[3].note, 127, trigs[3].midi_ch)
      // tracker.play_note(trigs[1].note, 127, trigs[1].midi_ch)
      let vol = data['volume'].split('%2C')
      vol = vol[vol.length - 1]
      console.log('///~~~ vol ~~~///\n', vol)
      // COMPUTE VELOCITY
      // USE THIS TO SET THE decay of the envelope for this sound
      const computed_velocity_wt = (vol === 0 ? 0 : Math.floor((vol / 100) * 64))
      const modulation = new Array(64).fill(84 - computed_velocity_wt)
      // console.log(modulation)
      const steps = (vol === 0 ? 1 : Math.floor((vol / 100) * 32))

      tracker.make_pattern(trigs[3].track, trigs[3].note, trigs[3].midi_ch, euclidean_pattern(steps, 64), modulation)

      // for (let i = 0; i < 8; i++) {
      //   queue_notes(trigs[3].track, tracker.new_note(trigs[3].note, computed_velocity_wt, trigs[3].midi_ch), i * 150, true)
      // }

      // const state = data['state']
      // console.log('///~~~ state ~~~/// \n', state)
      // if (state === 'paused') {
      //   tracker.pause()
      // } else (
      //   tracker.resume()
      // )
      break
    case yt_ids.qoe:
      /**
       * USE THIS to TRIGGER BURST ENVELOPE ON VOICE 2
       */
      /**
       * Here you should take advantage of the user_intent field.
       * the user intent appears in the qoe? header when it is fired the second time.
       * Values of the user_intent might oscillate between 0 and 1, but I witnessed also higher values above 1.
       * The name suggests that it might be tha claculation of how much the user really wanted to look at the
       * video, but further investigation in the code was not helpful in determining that.
       * Nevertheless it should be used as a value to determine the velocity of this note below
       */

      // tracker.add_note(trigs[2].track, tracker.new_note(trigs[2].note, 127, trigs[2].midi_ch))
      tracker.play_note(trigs[2].note, 127, trigs[2].midi_ch)
      // setTimeout(() => {
      //   tracker.add_note(trigs[2].track, tracker.new_note(trigs[2].note, 1, trigs[2].midi_ch))
      //   tracker.play_note(trigs[2].note, 1, trigs[2].midi_ch)
      // }, 500)
      break
    case yt_ids.search:

      /**
       * This bit takes in consideration the search bar.
       * very time you type a request is sent to the server to 
       * return a list of possible completion of what youy might search.
       * 
       */

      // tracker.add_note(trigs[1].note, 127, trigs[1].midi_ch)
      const query = data['q'].split('')
      console.log(query)
      const value = parseInt(query[query.length - 1])
      console.log(value)

      // USE THIS TO MODULATE WHAT KIND OF SOUND THE PERCUSSION PLAYS
      const computed_velocity_search = isNaN(value) ? 1 : Math.floor(((value + 1) / 10) * 127)
      tracker.add_note(trigs[1].track, tracker.new_note(trigs[1].note, computed_velocity_search, trigs[1].midi_ch))
      break
  }
  // const data = request['json']
  // // console.log(data)
  // if (is_ads_data(data)) {
  //   console.log('///~~~PLAY ADVERTISERS!~~~///')
  //   console.log(data)
  //   tracker.add_note(2, tracker.new_note('E4', random_127_value()))
  //   tracker.play_note('E4', 127)

  // } else {

  //   const events = data['events']
  //   /**
  //    *  VISUAL ELEMENT STATE CHANGED EVENTS
  //    */
  //   const VESC_events = events.filter(item => return_inner_event(item).event_name === yt_events_names.VESC)
  //   // console.log(`///~~~${yt_events_names.VESC}~~~///`)
  //   // console.log(VESC_events)
  //   compute_percussions_pattern(VESC_events)
  //   /////////////////////////////////////////////
  //   const gesture_events = events.filter(item => return_inner_event(item).event_name === yt_events_names.VEG)
  //   // console.log(`///~~~${yt_events_names.VEG}~~~///`)
  //   // console.log(gesture_events)
  //   if (gesture_events.length > 0) {
  //     compute_main_voice_pattern(gesture_events)
  //   }
  //   const VES_events = events.filter(item => return_inner_event(item).event_name === yt_events_names.VES)
  //   // console.log(`///~~~${yt_events_names.VES}~~~///`)
  //   // console.log(VES_events)
  //   const VEA_events = events.filter(item => return_inner_event(item).event_name === yt_events_names.VEA)
  //   console.log(`///~~~${yt_events_names.VEA}~~~///`)
  //   console.log(VEA_events)
  //   for (const event of events) {
  //     const inner_event = return_inner_event(event)
  //     // console.log(inner_event)
  //     let computed_velocity = 0
  //     switch (inner_event.event_name) {
  //       case yt_events_names.VEG:
  //         // if (inner_event.event['gestureType'] === interaction_HOVER) {
  //         //   // if HOVER do this
  //         //   // console.log('HOVER')
  //         //   ///~~~USE THIS FOR GRANULAR SYNTH IN THE FUTURE~~~///
  //         //   // const video_id = inner_event.event[c_d][t_h_d]['videoId']
  //         //   // /////////////////////////////////////////////////////
  //         //   // const duration = parseInt(inner_event.event[c_d][t_h_d]['durationHoveredMs'])
  //         //   // computed_velocity = (duration / 1000) * 127
  //         //   // tracker.add_note(0, tracker.new_note('C4', computed_velocity))
  //         // } else {
  //         //   // if CLICK do that
  //         //   // console.log('CLICK')
  //         //   // console.log(inner_event)
  //         //   // tracker.add_note(1, tracker.new_note('D4', radom_127_value()))
  //         // }
  //         break;
  //       case yt_events_names.FHB:
  //         // const f_a_m = parseInt(inner_event.event['firstActivityMs'])
  //         // const l_e_d_m = parseInt(inner_event.event['lastEventDeltaMs'])
  //         // computed_velocity = (Math.abs(f_a_m * l_e_d_m) * 127) % 127
  //         // tracker.add_note(2, tracker.new_note('E4', computed_velocity))
  //         break;
  //       case yt_events_names.VES:
  //         // tracker.add_note(2, tracker.new_note('F4', radom_127_value()))
  //         break;
  //       case yt_events_names.VESC:
  //         // console.log(inner_event.event)
  //         // const grid_data = inner_event.event['clientData']['gridData']
  //         // const col = parseInt(grid_data['veColumnCoordinate'])
  //         // const row = parseInt(grid_data['veRowCoordinate'])
  //         // computed_velocity = Math.abs((col * 32) - row) % 127
  //         // tracker.add_note(4, tracker.new_note('G4', computed_velocity))
  //         break;
  //       case yt_events_names.VEA:
  //         // tracker.add_note(5, tracker.new_note('A4', radom_127_value()))
  //         break;
  //       default:
  //         console.log(inner_event)
  //       // tracker.add_note(6, tracker.new_note('B4', radom_127_value()))
  //     }
  //   }
  // }
}

/**
 * this function analyzes the events and computes the pattern
 * of notes to be passed to the Tracker.tracker
 * @param {Array} events 
 */
function compute_percussions_pattern(events) {
  let max = 0
  let i = 0
  for (const event of events) {
    const inner_event = return_inner_event(event)
    // const grid_data = inner_event.event['clientData']['gridData']
    // const col = parseInt(grid_data['veColumnCoordinate'])
    // const row = parseInt(grid_data['veRowCoordinate'])
    // if(col > 5){
    //   console.log(inner_event)
    // }
    const grid_data = inner_event.event['clientData']['gridData']
    const col = parseInt(grid_data['veColumnCoordinate']) || 4
    const row = parseInt(grid_data['veRowCoordinate']) || 64
    computed_velocity = Math.abs((col * 32) - row) % 127
    queue_notes(1, tracker.new_note('D4', computed_velocity), i * 300, true)
    // tracker.add_note(4, tracker.new_note('G4', computed_velocity))
    if (inner_event.event['clientData']['gridData']['gridColumnCount'] !== undefined) {
      // this should reset the track
      tracker.clear_track(1)
      // console.log('//~~columnn count~~//')
      // console.log(inner_event.event['clientData']['gridData']['gridColumnCount'])
      // max = inner_event.event['clientData']['gridData']['gridColumnCount']
      // console.log('///~~~ MAKE percussions PATTERN ~~~///')
      // console.log(euclidean_pattern(max * 8, 128))
      // tracker.make_pattern(1, 'D4', euclidean_pattern(max * 8, 128))
      // break
    }

    i++
  }
}

/**
 * this function analyzes the events and computes the pattern
 * of notes to be passed to the Tracker.tracker
 * @param {Array} events 
 */
function compute_main_voice_pattern(events) {

  const v_e_g = 'visualElementGestured'
  const c_d = 'clientData'
  const g_t = 'gestureType'
  const interaction_HOVER = 'INTERACTION_LOGGING_GESTURE_TYPE_HOVER'
  const interaction_CLICK = 'INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK'
  const t_h_d = 'thumbnailHoveredData'
  const forge_video_id = 'sI-UiIuUseY'
  let steps = events.length
  let duration = 0
  // let computed_velocity = 0
  let i = 0
  for (const event of events) {
    const inner_event = return_inner_event(event)
    /////////////////////////////////////////////////////
    if (inner_event.event[g_t] === interaction_CLICK) {
      // computed_velocity.push(127)
      console.log('///~~~PLAY A CLICK~~~///')
      // tracker.add_note(trigs[0].track, tracker.new_note(trigs[0].note, 127, trigs[0].midi_ch))
      tracker.play_note(trigs[0].note, 127, trigs[0].midi_ch)
      // tracker.clear_track(0)
      steps--
    } else {

      // const video_id = inner_event.event[c_d][t_h_d]['videoId'
      duration += parseInt(inner_event.event[c_d][t_h_d]['durationHoveredMs'])

      const computed_velocity = Math.floor((parseInt(inner_event.event[c_d][t_h_d]['durationHoveredMs']) / 3000) * 127)
      queue_notes(trigs[0].track, tracker.new_note(trigs[0].note, computed_velocity, trigs[0].midi_ch), i * 300, true)
    }
    i++
    // tracker.add_note(0, tracker.new_note('C4', computed_velocity))
  }

  // this comoutes a modulation source as a sine wave of values
  // between 0 and the total amount of hovering durations

  const duration_vel = []
  const max_vel = (duration / 15000) * 127
  const inc = (2 * Math.PI) / tracker.track_length
  for (let i = 0; i < 2 * Math.PI; i += inc) {
    duration_vel.push(Math.floor(Math.abs(Math.sin(i) * max_vel)))
  }

  tracker.make_modulation_pattern(trigs[4].track, trigs[4].note, trigs[4].midi_ch, duration_vel)
  // if (steps > 0) {
  //   console.log('///~~~ MAKE MAIN VOICE PATTERN ~~~///')
  //   console.log(euclidean_pattern(steps * 4, 128))
  //   tracker.make_pattern(0, 'C4', euclidean_pattern(steps * 4, 128), computed_velocity)
  // }
}

/**
 * queues the notes and plays them delayed by the `delay` amount
 * @param {Number} track 
 * @param {Object} note created with Tracker.new_note
 * @param {Number} delay milliseconds
 */
function queue_notes(track, note, delay, record) {
  window.setTimeout(() => {
    tracker.play_note(note.note, note.vel)
    if (record) {
      tracker.add_note(track, note)
    }
  }, delay)
}

/**
 * Code from: https://github.com/dbkaplun/euclidean-rhythm
 * creates an euclidean drum pattern given number of trigger and length
 * @param {Number} triggers 
 * @param {Number} pattern_length 
 * @returns 1D array with 1 and zeros as the position of the trigger in the euclidean pattern
 */
function euclidean_pattern(triggers, pattern_length) {
  let groups = [];
  for (let i = 0; i < pattern_length; i++) groups.push([Number(i < triggers)]);

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