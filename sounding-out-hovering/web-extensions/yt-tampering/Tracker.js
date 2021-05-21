class Tracker {
  constructor(tracks_number, midi_out, midi_input, tone) {
    this.track_length = 128
    this.tracks = tracks_number
    this.tracker = []
    this.tracker_pointer = 0
    this.play_pause = false

    this.midi_output = midi_out
    this.midi_input = midi_input

    this.initialized = false
    this.clock = 0

    this.tone = tone
    // this.tracker_divs = []
    // this.shown_notes = 8

    // this.container_div = document.createElement('div')
    // this.container_div.setAttribute('class', '')

  }

  init_tracker(bpm) {
    console.log('///~~~ TRACKER INITIALIZED~~~///');
    this.tone.Transport.bpm.value = bpm
    // start/stop the oscillator every quarter note
    this.tone.Transport.scheduleRepeat(this.step_tracker.bind(this), "16n")


    for (let i = 0; i < this.tracks; i++) {
      let track = []
      for (let j = 0; j < this.track_length; j++) {
        track[j] = this.new_note()
        if (i === this.tracks - 1) {
            track[j] = this.new_note('A4', 127)
        }
      }
      this.tracker.push(track)
    }

    // for (let i = 0; i < this.tracks; i++) {
    //   for (let j = 0; j < this.shown_notes; j++) {
    //     this.tracker_divs.push(
    //       document.createElement('div').setAttribute('class', `t${i}-n${j}`)
    //     )
    //   }
    // }

    // this.midi_input.addListener('clock', 'all', this.step_tracker.bind(this))
    // this needs to be fixed when bug in popup.js is fixed
    // if (!this.initialized) 
    //   seterval(this.step_tracker.bind(this), (1000 * 60) / 350)
    // }

    myp5.initialize(this.tracker)

    this.tone.Transport.start()

    console.log(`sending  midi to ${this.midi_output['name']}`)
    this.initialized = true
  }

  set_bpm(bpm) {
    this.tone.Transport.bpm.value = bpm;
  }
  /**
   * 
   * @param {Number} track 
   * @param {String} note 
   * @param {Number} steps 
   * @param {Array} modulation_setting - an array containing values between 0 => 127 
   */
  make_pattern(track, note, euclid, modulation_setting) {
    const pattern = euclid
    let j = 0
    for (let i = 0; i < pattern.length; i++) {
      const step = pattern[i]
      if (step === 0) {
        this.tracker[track][i] = this.new_note()
      } else {
        // in future use some modulation setting
        if (modulation_setting !== undefined) {
          this.tracker[track][i] = this.new_note(note, modulation_setting[j % modulation_setting.length])
        } else {
          this.tracker[track][i] = this.new_note(note, random_127_value())
        }
        j++
      }
    }
    // console.log(this.tracker[track])
    myp5.update_tracker(this.tracker)
  }

  new_note(_note, _vel, _CC_1, _CC_2, _CC_3) {
    return {
      note: _note || null,
      vel: _vel || 0,
      CC_1: _CC_1 || null,
      CC_2: _CC_2 || null,
      CC_3: _CC_3 || null,
    }
  }
  add_note(track, note) {
    // Array.prototype.unshift to add an element ta the beginning of the array
    // this.pause_play()
    /**
     * try to create euclidean patterns of 8 notes instead of just adding a note
     */
    // this.tracker[track].unshift(note)
    // this.tracker[track].pop()
    // this.pause_play()

    this.tracker[track][this.tracker_pointer] = note

    // for (let midi_channel = 0; midi_channel < this.tracks; midi_channel++) {
    //   console.log(this.tracker[midi_channel][0].note)
    // }
    // Array.prototype.pop to remove the last element

    myp5.update_tracker(this.tracker)
  }

  pause_play() {
    this.play_pause = !this.play_pause
  }

  step_tracker() {
    // console.log(this.tracker_pointer)

    this.clock = 0
    for (let track = 0; track < this.tracks; track++) {
      // console.log(`///~~~MIDI CHANNEL ${track} ~~~///`);
      // console.log(this.tracker[track][this.tracker_pointer])
      this.play_note(this.tracker[track][this.tracker_pointer].note, this.tracker[track][this.tracker_pointer].vel)

    }

    // this.debug(parseInt(this.tracker_pointer))
    // if (!this.play_pause && this.tracker_pointer !== 127) this.tracker_pointer++

    myp5.step_tracker(this.tracker_pointer)

    this.tracker_pointer++
    if (this.tracker_pointer >= 127) {
      this.tracker_pointer = 0
    }
  }
  play_note(note, vel) {
    if (note !== null) {
      // midi_out.playNote(note, midi_channel + 1, {velocity: vel})
      //   .stopNote(note, midi_channel + 1, { time: '+250' })
      this.midi_output.playNote(note, 1, { rawVelocity: true, velocity: vel, duration: 750 })
    }
  }

  debug(pointer) {
    console.log(this.tracker)
  }
  // display_tracker() {

  // }

}