const midi = require('midi')


const notes = {
  c3: 60,
  d3: 62,
  e3: 64,
  f3: 65,
  g3: 67,
  a3: 69,
  b3: 71,
  c4: 72
}

const NOTE_ON = {
  ch_1: 144,
  ch_2: 145,
  ch_3: 146,
  ch_4: 147,
  ch_5: 148,
  ch_6: 149,
  ch_7: 150,
  ch_8: 151,
  ch_9: 152,
  ch_10: 153,
  ch_11: 154,
  ch_12: 155,
  ch_13: 156,
  ch_14: 157,
  ch_15: 158,
  ch_16: 159,
}
const NOTE_OFF = {
  ch_1: 128,
  ch_2: 129,
  ch_3: 130,
  ch_4: 131,
  ch_5: 132,
  ch_6: 133,
  ch_7: 134,
  ch_8: 135,
  ch_9: 136,
  ch_10: 137,
  ch_11: 138,
  ch_12: 139,
  ch_13: 140,
  ch_14: 141,
  ch_15: 142,
  ch_16: 143,
}

// const NOTE_ON = 144 // 0x90 => 0x9F | 144 => 159
// const NOTE_OFF = 128 // 0x80 => 0x8F | 128 => 143
const CC_CH_1 = 176

// Set up a new output_modular.
const output_modular = new midi.Output();
const output_live = new midi.Output();

let port_modular = 0

let got_midi_outputs = false
// Count the available output_modular ports.
const ports = output_modular.getPortCount();

// Get the name of a specified output_modular port.
for (let i = 0; i < ports; i++) {
  console.log(output_modular.getPortName(i), '\non port number: ', i);
}

const port_live = 0
console.log('sending MIDI to hardware: ' + output_modular.getPortName(port_modular))
// console.log('sending MIDI to software: ' + output_modular.getPortName(port_live))

/**
 * Set midi output to the selected from the log-panel
 * @param {Object} port 
 */
const set_midi_output = (port) => {
  // Open the first available output_modular port.
  port_modular = port['value']
  output_modular.openPort(port_modular)
  got_midi_outputs = true
}

// output_live.openPort(port_live)

// Send a MIDI message.
// Array of 3 values note on/off note as midi representation, velocity 0 => 127
// note ON channel 1 = 144
// note OFF channel 1 = 128
// MIDI notes 60 = C3 
// this will be our clock 163bpm = 1000 * 60 / 163 = 368 Ms

// setInterval(() => {
//   output_modular.sendMessage([144, 72, 127])
//   setTimeout(() => {
//     output_modular.sendMessage([128, 72, 127])
//   }, 75)
// }, 368)

/**
 * the following is our main sequencer
 * will send a note every 1/16 of bar
 * therefore 368ms / 2 = 184
 */
let arp_notes = []
let perc_pattern = []
let qoe_arp_notes = []
let qoe_arp_index = 0
let arp_index = 0
let perc_index = 0
let division = 1
const max_arp_notes = 64

// arpeggios

setInterval(() => {
  if (!!arp_notes[arp_index]) {
    // play_note('g3', 'ch_2', arp_notes[arp_index], 10) // old version
    play_note(arp_notes[arp_index], 'ch_2', 127, 10)
  }
  if (!!qoe_arp_notes[qoe_arp_index]) {
    // play_note('a3', 'ch_6', qoe_arp_notes[arp_index], 10) // old version

    play_note(qoe_arp_notes[qoe_arp_index], 'ch_6', 127, 10)
  }
  // /~~~ COMMENT FROM HERE ~~~///
  if (perc_pattern[perc_index] !== undefined) {
    if (perc_pattern[perc_index] === 1) {

      const random_vel = 80 + Math.floor(Math.random() * 47)
      play_note('f3', 'ch_4', random_vel)
    }
    // else {
    //   const prob = Math.random()
    //   if (prob < 0.5) {
    //     play_note('f3', 'ch_4', random_vel)
    //   }
    // }
  }
  // /~~~ TO HERE ~~~///
  arp_index++
  qoe_arp_index++
  perc_index++
  if (arp_index > max_arp_notes - 1 || arp_index >= arp_notes.length) {
    arp_index = 0
  }
  if (qoe_arp_index > max_arp_notes - 1) {
    qoe_arp_index = 0
  }
  if (perc_index > max_arp_notes - 1) {
    perc_index = 0
  }
}, 184)

/**
 * 
 * @param {Array} arr array of notes 0 - 127 range
 */
function add_notes_to_arp(arr) {
  arp_notes = arr.concat(arp_notes)
  //remove notes if the arp has more than max_arp_notes notes
  if (arp_notes.length > max_arp_notes) {
    arp_notes.splice(max_arp_notes, arp_notes.length - max_arp_notes)
  }
  console.log(arp_notes.length)
  arp_index = 0
}


/**
 * 
 * @param {String} note c3 to c4 no black keys! 
 * @param {Number} velocity 0 => 127
 */
function play_note(note, ch, velocity, sustain) {
  if (got_midi_outputs) {
    const s = !!sustain ? sustain : 75
    // output_modular.sendMessage([NOTE_ON[ch], notes[note], velocity]) // old version
    output_modular.sendMessage([NOTE_ON[ch], note, velocity])
    setTimeout(() => {
      output_modular.sendMessage([NOTE_OFF[ch], notes[note], velocity]) // old version
      output_modular.sendMessage([NOTE_OFF[ch], note, velocity])
    }, s)
  }
}
/**
 * 
 * @param {Number} lfo 
 * @param {Number} delay 
 */
function send_cc(lfo, delay) {
  console.log('  ///~~~ SENDING CC ~~~///');
  output_live.sendMessage([CC_CH_1, 40, lfo])
  output_live.sendMessage([CC_CH_1, 41, delay])
}

// function burst_notes(note, vel_arr, ms) {
//   for (let i = 0; i < vel_arr.length; i++) {
//     const vel = vel_arr[i]
//     setTimeout(() => {
//       play_note(note, vel, ms)
//     }, (i * ms) + 5)
//   }
// }

//UNICODE TABLE
const unicode = require('./UnicodeData.json')


// Close the port when done.
// output_modular.closePort();

const express = require('express')
const body_parser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
//Here we are configuring express to use body-parser as middle-ware.
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());


let transpose = 0
app.post('/log-point', (req, res) => {
  const data = req.body['data']
  const id = req.body['id']
  switch (id) {
    case yt_ids.log:
      /**
       * make different log sound diufferently
       * closing video
       * opening video
       * random log
       * log with gestures
       * etc.
       */
      console.log('///~~~ LOG-POINT ~~~///')
      let vel = data['events'].length
      if (vel > 127) {
        vel = 127
      }
      let num_gestured_events = 0
      let max_vel = 127
      const events_to_percs = []
      for (let i = data['events'].length - 1; i >= 0; i--) {
        const event = data['events'][i]
        if (!!event['finalPayload']) {
          console.log('///~~~///~~~///~~~~///')
          console.log(event)
          console.log('window opened or closed')

          // send_cc(127, 0)
          // events_to_percs.push(55)
          // play_note('f3', 1)
          play_note('e3', 'ch_5', 127)
        } else if (!!event['visualElementGestured']) {
          // if there are visual elemnts getured add them 
          console.log('///~~~ visual element gestured ~~~///')

          // send_cc(0, max_vel--)
          num_gestured_events++
          events_to_percs.push(20)
        } else if (!!event['systemHealthCaptured']) {
          console.log('system health captured');
          // send_cc(64, 64)
          // events_to_percs.push(80)
          play_note('f3', 'ch_4', 127)
        } else {
          // events_to_percs.push(100)
        }

      }
      // create an euclidean pattern for the gestured events
      let triggers = data['events'].length
      if (triggers > 64) {
        triggers = 64
      }
      // const triggers = Math.floor((num_gestured_events / data['events'].length) * max_arp_notes)
      // division = 4 - (Math.floor((num_gestured_events / data['events'].length) * 3))
      // console.log(division)
      console.log(triggers, max_arp_notes)
      if (triggers >= 1) {
        perc_pattern = euclidean_pattern(triggers, max_arp_notes)
      }
      console.log('///~~~ current euclidean pattern ~~~///')
      console.log(perc_pattern)
      //play a series of kick drums
      // burst_notes('f3', events_to_percs, 250)

      // play_note('f3', 75)
      // send_cc(0, 127)
      break;
    case yt_ids.log_point:
      console.log('///~~~ log point from debugger ~~~///')
      const ms = !!data['ms'] ? data['ms'] : 50
      // console.log(ms)
      let log_point_vel = ms / 25
      if (log_point_vel > 127) log_point_vel = 127
      // console.log(log_point_vel)
      play_note('f3', 'ch_4', log_point_vel)
      break;
    case yt_ids.watchtime:
      console.log('///~~~ WATCHTIME ~~~///')
      const video_length = data['len']
      let elapsed_time = data['et'].split('%2C')
      let computed_velocity_wt = 1
      console.log(elapsed_time)
      if (elapsed_time.length > 1) {
        console.log('sequence notes')
        const notes = elapsed_time.map(time => Math.floor((time / video_length) * 127))
        console.log(notes)
        add_notes_to_arp(notes)
      } else {
        computed_velocity_wt = Math.floor((elapsed_time[0] / video_length) * 127)
        console.log(computed_velocity_wt)
        play_note('e3', 'ch_5', computed_velocity_wt)
      }

      break;
    case yt_ids.qoe:
      let qoe_vel
      /**
       * use user intent to set something in the system
       */
      if (!!data['user_intent']) {
        console.log('///~~~ QOE? ~~~///')
        console.log('user intent == ', data['user_intent'])
        const ui = parseInt(data['user_intent']) === 0 ? 1 : parseInt(data['user_intent'])
        qoe_vel = Math.floor((ui / 15) * 127)
        if (qoe_vel > 127) qoe_vel = 127
        console.log('computed qoe velocity ==', qoe_vel)
        play_note('d3', 'ch_2', qoe_vel)
      }
      /**
       * You can use this below to send a series of notes
       * to be played in a loop
       */
      const fexp = data['fexp']
        .split('%2C')
        .map(item => {
          let str = Buffer.from(item, 'base64').toString('hex')
          str = str.toUpperCase()
          const hex_arr = []
          for (let i = 0; i < str.length; i += 2) {
            const obj = {}
            const hex_val = '00' + str.charAt(i) + str.charAt(i + 1)
            obj['hex'] = hex_val
            const meaning = unicode.find(item => item.value === hex_val)
            obj['meaning'] = meaning['meaning'] === '' ? meaning['a'] : meaning['meaning']
            hex_arr.push(obj)
          }
          // console.log(hex_arr)
          // const result = str.replace(/\\u/i, ':')
          // console.log(result)
          return hex_arr
        })
      console.log(`
      ///~~~ ESOTERIC UNICODE MESSAGE ~~~///
      |* the following is a pure seculative 
      |* reading of the values of the fexp
      |* also known as experimental flags
      |* and its translation in MIDI
      |* compatible values
      ///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~///
      `)
      console.log(fexp[0])
      let decimal_values = []
      for (let i = 0; i < fexp.length; i++) {
        const element = fexp[i]
        decimal_arr = element.map(item => {
          const note = Math.floor(parseInt(item['hex'], 16) / 4)
          return transpose + note
        })
        decimal_values = decimal_values.concat(decimal_arr)
      }
      // console.log(decimal_values)
      qoe_arp_notes = decimal_values
      /**
       * BWE
       * tells the seconds since beginning of watching
       * and some timing in milliseconds
       */
      const bwe = data['bwe']
      // if (!!cmt) {// console.log(cmt.split(',').length)
      //   const val = cmt.split(',').length / 4
      //   // console.log(val)
      //   qoe_vel = Math.floor(val * 127)
      //   // console.log(qoe_vel)
      // }

      /**
       * BH
       * tells the seconds since beginning and
       * the total amount of seconds of the video
       */
      const bh = data['bh']
      /**
       * VPS
       * tells the seconds since beginning of watching
       * and whether the video is playing "PL" or paused "PA"
       */
      const vps = data['vps']
      break;
    case yt_ids.next:

      break;
    case yt_ids.palyer:

      break;

    default:
      break;
  }
  // const note = data['note']
  // const vel = parseInt(data['velocity'])
  // console.log('data:', note, vel)
  // play_note(note, vel)
  res.send({ response: 'success' })
})


const get_midi_outputs = () => {
  // Count the available output_modular ports.
  const ports = output_modular.getPortCount();
  const midi_ports = []
  // Get the name of a specified output_modular port.
  for (let i = 0; i < ports; i++) {
    const obj = {
      name: output_modular.getPortName(i),
      number: i
    }
    midi_ports.push(obj)
  }
  return midi_ports
}

// get midi outputs
app.get('/midi', (req, res) => {
  console.log('midi requested');
  const midi_outputs = get_midi_outputs()
  res.send({ midi_outputs })
}
)

// set midi output
app.post('/set-midi', (req, res) => {
  const midi_output = req.body
  set_midi_output(midi_output)
  console.log('midi set')
  res.send({ response: 'success' })
}
)




/**
 * They'll need their own package....
 * UTILS
 */


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
}

function compare_arrays(a, b) {
  // TODO: optimize
  return JSON.stringify(a) === JSON.stringify(b);
}



app.listen(port, () => {
  console.log(`listening for yt messages here: http://localhost:${port}`)
})

const yt_ids = {
  next: 'next',
  next_res: 'next-res',
  player: 'player',
  player_res: 'player-res',
  browse: 'browse',
  what_to_watch: 'wtw',
  log: 'log',
  watchtime: 'wt',
  qoe: 'qoe',
  search: 'search',
  playlist: 'edit_playlist',
  log_point: 'log-point'
}