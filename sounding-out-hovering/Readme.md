# Sounding Out Hovering

> This is the first practice approach to analyze the youtube algorithm, by creating sounds



## Observation

[Here](observations/20210225-debugging.mov) there is the first observation of how hovering over a video thumbnail is captured by the algorithm and sent to an external server.

## Sniffing / intercepting

Building a web-extension that analyzes the `POST` messages and returns the ones about hovering.

### TO DO:

* create filter to get only the hovering messages 👍🏻
* send out this information to be sounded afterwards, maybe OSC or MIDI 👍🏻
* instead of inserting notes at event insert them as set of 8 maybe with euclidean distribution
* make the performance more browser interactive. To do so try to have a sampling over "straight forward" playing
* make the log or ads event triggering some stuff
* keystroke interaction to clear hover pattern

## Sounding

building a digital instrument that can read JSON and turn them into music, maybe inspired by trackers and breakcore music