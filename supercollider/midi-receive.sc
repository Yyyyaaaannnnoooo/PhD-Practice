(
s.boot;
MIDIClient.init;
MIDIIn.connectAll;

MIDIdef(\note_on).enable;



SynthDef(\hoover,
    {
        arg env_decay = 15;
        var snd, freq, bw, delay, decay, env_snd, env_verb;
        freq = \freq.kr(440);
        freq = freq * Env([-5, 6, 0], [0.1, 1.7], [\lin, -4]).kr.midiratio;
        bw = 1.035;
        snd = { DelayN.ar(Saw.ar(freq * ExpRand(bw, 1 / bw)) + Saw.ar(freq * 0.5 * ExpRand(bw, 1 / bw)), 0.01, Rand(0, 0.01)) }.dup(20);
        snd = (Splay.ar(snd) * 3).atan;
        // snd = snd * Env.asr(0.01, 1.0, 1.0).kr(0, \gate.kr(1));
        // env_snd = EnvGen.kr(Env.asr(0.01, 0.2, 0.2), doneAction: 2);
        // snd = snd * Env.asr(0.01, 1.0, 1.0).kr(0, \gate.kr(1));
        env_snd = EnvGen.kr(Env.perc(0.01, env_decay, 1), doneAction: 2);
        snd = snd * env_snd;
        snd = FreeVerb2.ar(snd[0], snd[1], 0.3, 0.9);
        // snd = snd * Env.asr(0, 1.0, 4, 6).kr(2, \gate.kr(1));
        // env_verb = EnvGen.kr(Env.asr(0, 1.0, 4, 6), doneAction: 2);
        env_verb = EnvGen.kr(Env.perc(0, env_decay, 1), doneAction: 2);
        snd = snd * env_verb;
        Out.ar(\out.kr(0), snd * \amp.kr(0.1));
}).add;


SynthDef(\gabberkick, {
	arg env_decay = 0.5;
    var snd, freq, high, lfo;
    freq = \freq.kr(440) * (Env.perc(0.001, 0.08, curve: -1).ar * 48 * \bend.kr(1)).midiratio;
    snd = Saw.ar(freq);
    snd = (snd * 100).tanh + ((snd.sign - snd) * -8.dbamp);
    high = HPF.ar(snd, 300);
    lfo = SinOsc.ar(8, [0, 0.5pi]).range(0, 0.01);
    high = high.dup(2) + (DelayC.ar(high, 0.01, lfo) * -2.dbamp);
    snd = LPF.ar(snd, 100).dup(2) + high;
    snd = RLPF.ar(snd, 7000, 2);
    snd = BPeakEQ.ar(snd, \ffreq.kr(3000) * XLine.kr(1, 0.8, 0.3), 0.5, 15);
	// snd = snd * Env.asr(0.001, 1, 0.05).ar(2, \gate.kr(1));
	snd = snd * EnvGen.kr(Env.perc(0, env_decay, 1), doneAction: 2);
    Out.ar(\out.kr(0), snd * \amp.kr(0.1));
}).add;



SynthDef.new(\tone,
    {
        arg freq=440, amp=0.3, gate=0;
        var sig, env;
        sig = LFTri.ar(freq)!2;
        env = EnvGen.kr(Env.perc, doneAction: 2);
        sig = sig * env * amp;
        Out.ar(0, sig);
}).add;




SynthDef(\hasherTest,
    {
        arg rate = 1, h_freq = 60, index = 1000, tRate = 100,
        out = 0, fRate = 0.1;

        var t_trig = LFPulse.kr(0.5/fRate, 0.5);
        var random = LFNoise0.ar(rate, add:1);
        var noise = Hasher.ar(random);
        var sound = Saw.ar((h_freq+(noise*index)), Decay.kr(Impulse.kr(tRate), noise*0.001)).tanh;
        // sound = Pan2.ar(sound, noise-0.3*2);
        sound = Pan2.ar(sound, 0);
        FreeSelf.kr(t_trig);
        Out.ar(out, sound * 0.3);
}).add;


/*
* To handle poliphony we create an array as big as the possible notes
*/
~notes = Array.newClear(128);

~instruments = Array.newClear(8);
~instruments.put(0, \hoover);
~instruments.put(1, \hasherTest);
~instruments.put(2, \tone);
~instruments.put(3, \gabberkick);
)
MIDIdef(\note_on).disable;
MIDIdef(\note_on).enable;




(
MIDIdef.noteOn(\note_on, {
	// velocity, note number, channel, source
	arg vel, nn, chan, src;
	// here below we call the synth
	// and we store it in the array
	/*	~notes[nn] = Synth.new(
	\tone,
	[
	\freq, nn.midicps,
	\amp, vel.linexp(1, 127, 0.01, 0.3),
	\gate, 1,
	]
	);*/
	var rate = 100.rand;
	var h_freq = 10000.rand;
	var index = 20000.rand;
	var tRate = 1000.rand;
	[rate, h_freq, index, tRate].postln;

	Synth.new(
		~instruments.at(chan),
		[
			\freq, nn.midicps,
			\amp, vel.linexp(1, 127, 0.01, 0.3),
			\gate, 1,
			\amp: 2.dbamp,
			\rate, rate,
			\h_freq, h_freq,
			\index, index,
			\tRate, tRate,
		]
	);
	"/////////////~~~~~~~~~~~~~~~~~~~~~////////////////".postln;
	// chan.postln; // <= debug midi
	// [vel, nn, chan, src].postln; // <= debug midi
});

MIDIdef.noteOff(\note_off, {
	arg vel, nn;
	"note off".postln;
	/*[vel, nn].postln;
	"note off".postln;*/
	// set the gate to 0 to urn off the sustain of the note
	/*~notes[nn].set(\gate, 0);
	// remove the synth from the array
	~notes[nn] = nil;*/
});
)

