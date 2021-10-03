console.log('content-script loaded!');
// const ID = 'lkccpljndkjcmbkbikhkfionihkllpmb' // mac 2016
const ID = 'likacmeclfhieiomplbbhpfigcalhfei'

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
let midi_out_port = 2
let midi_in_port = 2
let myp5 = null

// console.log('///~~~ INITIALIZE P5 SKETCH ~~~///')
// const myp5 = new p5(s)


// WebMidi.enable(err => {

//   if (err) {
//     console.log("WebMidi could not be enabled.", err)
//   } else {
//     console.log("%cWebMidi enabled!", 'font-weight: bold; background-color: #000; color:fff')
//     console.log('///~~~ MIDI OUT ~~~///')
//     console.log(WebMidi.outputs)

//     console.log('///~~~ MIDI IN ~~~///')
//     console.log(WebMidi.inputs)
//     console.log(
//       `%c      ///~~~~~~~  IMPORTANT  ~~~~~~~///*
//       |* check the above midi ports    *
//       |* and set them at the beginning *
//       |* of content-script.js          *`,
//       'font-weight: bold; background-color: #000; color:fff'
//     )
//     // const ID = 'likacmeclfhieiomplbbhpfigcalhfei'
//     // browser.runtime.sendMessage(ID, { id: 'midi', in: WebMidi.inputs, out: WebMidi.outputs }, response => console.log(response.res))

//     // tracker = new Tracker(6, WebMidi.outputs[midi_out_port], WebMidi.inputs[midi_in_port], Tone)
//     // tracker.init_tracker(165)
//   }

// })

/**
 * Listener waiting for messages coming from the background script
 * and from the popup script
 * @param {*} request 
 * @param {*} sender 
 * @param {*} send_response 
 */
browser.runtime.onMessage.addListener(

  (request, sender, send_response) => {
    console.log('message received')
    read_data(request)
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
       * 2. watchtime
       * 3. user-intent base.js line 83158
       *  - it seems to calculate the time between the start of advertising and you pressing skip ad
       * 4. freshness?
       */
      break
    case yt_ids.playlist:
      /**
       * this handles the user interaction with the add to playlist 
       * function
       */
      // tracker.play_note(trigs[0].note, 127, trigs[0].midi_ch)
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
      break
    case yt_ids.watchtime:

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
      break
    case yt_ids.qoe:

      /**
       * Here you should take advantage of the user_intent field.
       * the user intent appears in the qoe? header when it is fired the second time.
       * Values of the user_intent might oscillate between 0 and 1, but I witnessed also higher values above 1.
       * The name suggests that it might be tha claculation of how much the user really wanted to look at the
       * video, but further investigation in the code was not helpful in determining that.
       * Nevertheless it should be used as a value to determine the velocity of this note below
       */
      break
    case yt_ids.search:

      /**
       * This bit takes in consideration the search bar.
       * very time you type a request is sent to the server to 
       * return a list of possible completion of what youy might search.
       * 
       */
      break
  }
  
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