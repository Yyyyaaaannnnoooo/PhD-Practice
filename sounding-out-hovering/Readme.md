# Sounding Out Hovering

> This is the first practice approach to analyze the youtube algorithm, by creating sounds

## Using WebMidi.js
>Côté, J. P. (2020). WebMidi.js v2.5.3 [Computer Software]. Retrieved from https://github.com/djipco/webmidi


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
* implement the watch periodic to trigger something as midi
* analyze the `next?` and `player?` endopoints. specially look at how the `trackingParams` or `trackingMetadata` might influence the results
* check the `LOW_USER_ENGAGEMENT_ACTION_LOWER_QUALITY` in the code
* `next?` returns the playlist of videos to be played next 

## Sounding

building a digital instrument that can read JSON and turn them into music, maybe inspired by trackers and breakcore music



## for the next bit

Analyse the history of Bon Appetit how they name squatted youtube with their cooking videos and despite the backlash of racism they are still at the top of searches even if the viewers, me in this case, are not watching their videos no more