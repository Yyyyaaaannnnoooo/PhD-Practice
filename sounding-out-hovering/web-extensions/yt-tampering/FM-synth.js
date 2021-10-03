console.log('loaded sketch');
let carrier; // this is the oscillator we will hear
let modulator; // this oscillator will modulate the frequency of the carrier

let analyzer; // we'll use this visualize the waveform

// the carrier frequency pre-modulation
let carrierBaseFreq = 80;

// min/max ranges for modulator
let modMaxFreq = 200;
let modMinFreq = 0;
let modMaxDepth = 150;
let modMinDepth = -150;

let env_1
let env_2
function setup() {
  console.log('setup');
  let cnv = createCanvas(800, 400);
  noFill();

  env_1 = new p5.Envelope(0.01, 0.5)
  env_2 = new p5.Envelope(0.001, 0.7)

  carrier = new p5.Oscillator('sine');
  // carrier.amp(0); // set amplitude
  carrier.freq(carrierBaseFreq); // set frequency
  // carrier.start(); // start oscillating

  // try changing the type to 'square', 'sine' or 'triangle'
  modulator = new p5.Oscillator('sawtooth');
  modulator.start();

  // add the modulator's output to modulate the carrier's frequency
  modulator.disconnect();
  carrier.freq(modulator);
  modulator.amp(modMaxDepth)

  // create an FFT to analyze the audio
  analyzer = new p5.FFT();

  // fade carrier in/out on mouseover / touch start
  // toggleAudio(cnv);
}

function draw() {
  background(30);

  // map mouseY to modulator freq between a maximum and minimum frequency
  let modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
  // modulator.freq(modFreq);

  // change the amplitude of the modulator
  // negative amp reverses the sawtooth waveform, and sounds percussive
  //
  let modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
  // modulator.amp(modDepth);

  // analyze the waveform
  waveform = analyzer.waveform();

  // draw the shape of the waveform
  stroke(255);
  strokeWeight(10);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, -height / 2, height / 2);
    vertex(x, y + height / 2);
  }
  endShape();

  strokeWeight(1);
  // add a note about what's happening
  text('Modulator Frequency: ' + modFreq.toFixed(3) + ' Hz', 20, 20);
  text(
    'Modulator Amplitude (Modulation Depth): ' + modDepth.toFixed(3),
    20,
    40
  );
  text(
    'Carrier Frequency (pre-modulation): ' + carrierBaseFreq + ' Hz',
    width / 2,
    20
  );
}

function keyPressed() {
  switch (key) {
    case ' ':
      toggleAudio()
      break;
    case 't':
      carrier.start()
      modulator.freq(env_2)
      env_2.play()
      carrier.freq(env_1)
      env_1.play(carrier)
      break;
  }
}

let start_stop = true
// helper function to toggle sound
function toggleAudio() {
  if (start_stop) {
    carrier.amp(0)
    start_stop = !start_stop
  } else {
    carrier.amp(0.5)
    start_stop = !start_stop
  }
  // cnv.mouseOver(function () {
  //   carrier.amp(1.0, 0.01);
  // });
  // cnv.touchStarted(function () {
  //   carrier.amp(1.0, 0.01);
  // });
  // cnv.mouseOut(function () {
  //   carrier.amp(0.0, 1.0);
  // });
}
