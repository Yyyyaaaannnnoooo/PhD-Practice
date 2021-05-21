## what is debugging

SO each browser is usually equipped with some tool for network and algorithm analysis. And they are mainly used by web developers to analyse how their website works when building a webpage.
Debugger are very powerful as they allow the developer to look at how their website behave, but one can use such a tool on any website he likes.

To open the developer tools one can either use a keyboard shortcut, or by clicking on the menu, and a new window should appear somewhere in your browser.
I'd suggest to start to practice this and open the debugger on any website you encounter. just to see what happens.

In our case we will look at the network tool to see what information is sent and received from the youtube servers.



## 23-feb-2021

discovery of today:

```
the home page of yt requests 24 videos at the time.
POST: "https://www.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"

it makes a request with some parameteres that returns a response with 24 videos to populate the home.

zha(a, b) => line 12137 of desktop plymer 
creates the JSON for the request
```

## 25-feb-2021

To Do today:

make a screen recording with a proper overdub of the above finding, also add the `log` the `watchtime` and the third `POST` request from the debugging. also document the advertising, with muBlock deactivated

one Idea could be a synth voice triggered by the log, to hear out how the different parameters influence the sound



## 12-04-2021

When clicking on an AD

```json
Object { context: {…}, events: (6) […], requestTimeMs: 1618221477467, serializedClientEventId: {…} }
​
context: Object { client: {…} }
​
events: Array(6) [ {…}, {…}, {…}, … ]
​​
0: Object { eventTimeMs: 1618221464560, latencyActionTicked: {…}, context: {…} }
​​
1: Object { eventTimeMs: 1618221464560, foregroundHeartbeat: {…}, context: {…} }
​​
2: Object { eventTimeMs: 1618221465373, latencyActionTicked: {…}, context: {…} }
​​
3: Object { eventTimeMs: 1618221467090, visualElementGestured: {…}, context: {…} }
​​​
context: Object { lastActivityMs: "3" }
​​​
eventTimeMs: 1618221467090
​​​
visualElementGestured: Object { csn: "MC44MDA0MjQzMDQyMDEwNDU4", ve: {…}, gestureType: "INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK", … }
​​​​
clientData: Object { externalLinkData: {…} }
​​​​​
externalLinkData: Object { url: "https://www.googleadservices.com/pagead/aclk?sa=L&ai=CcRQXVR…LncQEaMI3Hjek0XeszlQ&adurl=https://neuraldsp.com/plugins&ms=[CLICK_MS]&nb=2&nx=133&ny=105&dim=[DIM]" }
​​​​​
<prototype>: Object { … }
​​​​
csn: "MC44MDA0MjQzMDQyMDEwNDU4"
​​​​
gestureType: "INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK" <== !!!!
​​​​
ve: Object { trackingParams: "CNICEImSBiITCISX27y4-O8CFQ6E3godFcsG3Q==" }
​​​​
<prototype>: Object { … }
​​​
<prototype>: Object { … }
​​
4: Object { eventTimeMs: 1618221467402, latencyActionTicked: {…}, context: {…} }
​​
5: Object { eventTimeMs: 1618221467403, foregroundHeartbeat: {…}, context: {…} }
​​
length: 6
​​
<prototype>: Array []
​
requestTimeMs: 1618221477467
​
serializedClientEventId: Object { serializedEventId: "2wt0YOD3MMWm7gPV7oL4CA", clientCounter: "3278" }
​
<prototype>: Object { … }
background.js:70:13


```



## 13-04-2021

Today I added more debugging functionality to the webextesion, I can visualise headers as well.

Today I found out that every time play and pause are pressed some information is sent to the `https://www.youtube.com/api/stats/qoe?event=streamingstats&fmt=399&afmt=251&cpn=YHrZoHDX_QD4aiqc&ei=PIV1YJK_For57gPA2pGwCg&el=detailpage&docid=GSG09Zg32Ao&ns=yt&fexp=23890959%2C23969934%2C23971175%2C23983296%2C23986023%2C23991912%2C24000197%2C24001373%2C24006795%2C24007246%2C24008565%2C24009748%2C24012117%2C24019274%2C24021967%2C24024809&cl=367285273&seq=9&cbrand=apple&cbr=Firefox&cbrver=88.0&c=WEB&cver=2.20210408.08.00&cplayer=UNIPLAYER&cos=Macintosh&cosver=10.15&cplatform=DESKTOP&cmt=52.181:387.509,52.930:388.277,60.006:395.366&vps=52.181:PL,60.006:PL&bwm=60.006:3977764:0.522&bwe=60.006:8147133&bh=60.006:46.263`server. each new play and sends new information..

Every 30 seconds some information is sent to this url `https://www.youtube.com/api/stats/qoe?event=streamingstats&fmt=137&afmt=251&cpn=wb9O32a0azTmfqaO&ei=dVN1YP6GAovF7gPamIiQDw&el=detailpage&docid=xXgJqQtBJAE&ns=yt&fexp=23890959%2C23943577%2C23969934%2C23983296%2C23986023%2C23991912%2C24000197%2C24001373%2C24006795%2C24007246%2C24008565%2C24009748%2C24012117%2C24014442%2C24019274%2C24021967%2C24024809&cl=367904542&seq=26&cbrand=apple&cbr=Firefox&cbrver=88.0&c=WEB&cver=2.20210411.07.00&cplayer=UNIPLAYER&cos=Macintosh&cosver=10.15&cplatform=DESKTOP&vps=4533.919:PL&bwm=4533.919:8645673:4.440&bwe=4533.919:2360153&cmt=4533.919:494.249&bh=4533.919:45.158`and is not about the playback status

## 14.04.2021

the capturing oh hover data

```javascript
function JRa(a) {
    var b,
    c = [
    ],
    d = !1,
    f = new hi(function (h, l) {
      Uh(a, 'mouseenter', zj(function () {
        var m,
        p,
        r;
        return Ca(function (u) {
          if (1 == u.nextAddress) return b = Ak(),
          m = KRa(a),
          c.push(m),
          p = LRa(a, function () {
            d = !0;
            l(Error('abandon hover'))
          }),
          q(u, m, 2);
          if (3 != u.nextAddress) return p && Zh(p),
          r = MRa(a),
          c.push(r),
          q(u, r, 3);
          h();
          na(u)
        })
      }))
    });
    f.then(function () {
      var h = Ak() - b,
      // hard coded values within youtube hovering capture
      l = qj('minimum_duration_to_consider_mouseover_as_hover', 500),
      m = qj('max_duration_to_consider_mouseover_as_hover', 600000);
      h = Math.round(h);
      l > h || m <= h || (l = a.getScreenLayer ? a.getScreenLayer() : void 0, l = so(l) || '', m = aI($H.getInstance(), a), BRa(l, a.visualElement ? a.visualElement : mo(m), 'INTERACTION_LOGGING_GESTURE_TYPE_HOVER', {
        hoverData: {
          durationHoveredMs: h
        }
      }));
      HRa(a)
    }, function () {
      eI && (eI(), eI = null);
      d && (IRa(a), HRa(a))
    });
    return f
  }
```

## 15.04.2021

Convoluted mouse tracking?

```javascript
//https://www.youtube.com/s/desktop/1857023c/jsbin/desktop_polymer_inlined_html_polymer_flags.vflset/desktop_polymer_inlined_html_polymer_flags.js
// from line 9746 
var Lj = function (a) {
    this.callback_ = a;
    this.position_ = null;
    this.previousTime_ = 0;
    this.previousPosition_ = null;
    this.previousVelocity_ = 0;
    this.cycles_ = [
    ];
    for (a = 0; 4 > a; a++) this.cycles_.push(0);
    this.index_ = 0;
    this.mouseListenerKey_ = Ej(window, 'mousemove', Va(this.onMouseMove_, this));
    this.timerId_ = Jj(Va(this.checkPosition_, this), 25)
  };
  w(Lj, th);
  Lj.prototype.onMouseMove_ = function (a) {
    void 0 === a.pageX_ && gga(a);
    var b = a.pageX_;
    void 0 === a.pageY_ && gga(a);
    this.position_ = new of(b, a.pageY_)
  };
  Lj.prototype.getPosition = function () {
    return this.position_ || new of
  };
  Lj.prototype.checkPosition_ = function () {
    if (this.position_) {
      var a = Hj();
      if (0 != this.previousTime_) {
        var b = this.previousPosition_,
        c = this.position_,
        d = b.x - c.x;
        b = b.y - c.y;
        d = Math.sqrt(d * d + b * b) / (a - this.previousTime_);
        this.cycles_[this.index_] = 0.5 < Math.abs((d - this.previousVelocity_) / this.previousVelocity_) ? 1 : 0;
        for (c = b = 0; 4 > c; c++) b += this.cycles_[c] || 0;
        3 <= b && this.callback_();
        this.previousVelocity_ = d
      }
      this.previousTime_ = a;
      this.previousPosition_ = this.position_;
      this.index_ = (this.index_ + 1) % 4
    }
  };
```

here below the capturing of the hover data in `https://www.youtube.com/s/desktop/1857023c/jsbin/desktop_polymer_inlined_html_polymer_flags.vflset/desktop_polymer_inlined_html_polymer_flags.js` line 107806

```javascript
e.hideThumbnail = function () {
    this.data && this.data.enableHoveredLogging && this.logEvent('INTERACTION_LOGGING_GESTURE_TYPE_HOVER');
    this.removeVideoPreview()
  };
  e.onTap = function () {
    this.removeVideoPreview()
  };
  e.logEvent = function (a) {
    if (!(0 >= this.loadingStartTimeMs)) {
      var b = {
        isMovingThumbnail: this.hasVideoPreview
      };
      if (this.hasVideoPreview && 0 < this.startTimeMs) {
        var c = this.loadingEndTimeMs - this.loadingStartTimeMs;
        0 < c && (b.movingThumbnailLoadingDurationMs = Math.round(c));
        b.durationHoveredMs = Math.round(Hj() - this.startTimeMs)
      }
      this.videoId && (b.videoId = this.videoId);
      this.csn && this.trackingParams && GRa(this.csn, mo(this.trackingParams), a, {
        thumbnailHoveredData: b
      });
      this.startTimeMs = this.loadingEndTimeMs = this.loadingStartTimeMs = - 1;
      this.hasVideoPreview = !1
    }
  };

  function GRa(a, b, c, d) {
    UH(L('use_default_events_client') ? void 0 : wm, a, b, c, d) // void 0 === undefined
  }

  function L(a) {
    a = pj(a);
    return 'string' === typeof a && 'false' === a ? !1 : !!a
  }

  function UH(a, b, c, d, f) {
    d = d || 'INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK'; // either Hover or click if 'd' is undefined than it is a click
    c = {
      csn: b,
      ve: c.getAsJson(),
      gestureType: d
    };
    f && (c.clientData = f);
    f = {
      cttAuthInfo: to(b),
      sequenceGroup: b
    };
    'UNDEFINED_CSN' == b ? TH('visualElementGestured', c, f) : a ? Lk('visualElementGestured', c, a, f) : dm('visualElementGestured', c, f)
  }
```

