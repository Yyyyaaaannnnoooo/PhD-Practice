/**
 * here below the capturing of the hover data in
 * https://www.youtube.com/s/desktop/1857023c/jsbin/desktop_polymer_inlined_html_polymer_flags.vflset/desktop_polymer_inlined_html_polymer_flags.js
 */

/**
 * line 107806
 * this below is e an object conataining apparently methods to post message to the server
 * the same variable changes its content within the code, mutating between doing one thing or another
 * my guess is to optimize the code since it is quite lenghty
 * 
 * e: {…}
 * buildRequest:e.buildRequest(a, b)
 * constructor:NAb()​​
 * constructor:DK()​​
 * getClientScreen:e.getClientScreen()​​
 * getRequest:e.getRequest(a, b, c)​​
 * getRequestConfig:e.getRequestConfig()​​
 * getRetryStrategy:e.getRetryStrategy()​​
 * getStoreKey:e.getStoreKey()​​ <== try to add breakpoint here
 * isNavigationCommand:e.isNavigationCommand()
 * getApiPaths:e.getApiPaths(a)
 * getExtension:e.getExtension(a)
 * getParams:e.getParams(a)
 * getRetryStrategy:e.getRetryStrategy()​​
 * constructor:e.getRetryStrategy()
 */


/**
 * this part below handles the slideshow happening on mouse hover
 */

var RQ = function () {
  var a = M.apply(this, arguments) || this;
  a.mouseOverDelayJobId = 0;
  a.hideImageDelayJobId = 0;
  a.fadeInImageDelayJobId = 0;
  a.startTimeMs = - 1;
  a.loadingStartTimeMs = - 1;
  a.loadingEndTimeMs = - 1;
  a.hasVideoPreview = !1;
  return a
};
/**
 * I think this below constructs an 
 * Polymer class according to the 
 * Polymer library if it is a thing
 */
n(RQ, M);
n = function (a, b) {
  a.prototype = daa(b.prototype);
  a.prototype.constructor = a;
  if (ka) ka(a, b);
  else for (var c in b) if ('prototype' != c) if (Object.defineProperties) {
    var d = Object.getOwnPropertyDescriptor(b, c);
    d && Object.defineProperty(a, c, d)
  } else a[c] = b[c];
  a.superClass_ = b.prototype
}
var M = function () {
  return PolymerFakeBaseClass.apply(this, arguments) || this
}
/************************************************************************************************
* as you can see here below it becomes the prototype of the function , or rather class RQ
* here they are using this old way to compile classes using the the prototypes within a function
* I guess this is made for retro-compatibility with older flavors of JavaScript
************************************************************************************************/
e = RQ.prototype;
e.attached = function () {
  this.data && (this.isAttachedAndDataSet = !0, this.showThumbnail())
};
e.detached = function () {
  this.isAttachedAndDataSet = !1;
  this.hideThumbnail();
  this.data = void 0;
  this.csn = null
};
e.dataChanged = function () {
  this.data && this.isAttached && !this.isAttachedAndDataSet && (this.isAttachedAndDataSet = !0, this.showThumbnail())
};
e.showThumbnail = function () {
  var a = this;
  this.csn = so();
  Kp('fmth');
  Rj.cancelJob(this.mouseOverDelayJobId);
  this.data && this.data.movingThumbnailDetails && this.data.movingThumbnailDetails.thumbnails ? this.mouseOverDelayJobId = Sj(function () {
    a.loadingStartTimeMs = Hj();
    var b = a.$.thumbnail;
    b.complete ? a.displayMouseOverImage() : a.listen(b, 'load', 'displayMouseOverImage')
  }, 150) : this.toggleClass('show', !0, this.$.play)
};
e.hideThumbnail = function () {
  this.data && this.data.enableHoveredLogging && this.logEvent('INTERACTION_LOGGING_GESTURE_TYPE_HOVER');
  this.removeVideoPreview()
};
e.onTap = function () {
  this.removeVideoPreview()
};
/**
 * line 107813
 * this is the logging function
 * @param {*} a 
 */
e.logEvent = function (a) {
  if (!(0 >= this.loadingStartTimeMs)) {
    var b = {
      isMovingThumbnail: this.hasVideoPreview // true or false depending whether the preview exists
    };
    if (this.hasVideoPreview && 0 < this.startTimeMs) {
      var c = this.loadingEndTimeMs - this.loadingStartTimeMs;
      0 < c && (b.movingThumbnailLoadingDurationMs = Math.round(c));
      /**************************
       * Here check what Hj() is se line [110]
       * it calculates the current time 
       **************************/
      b.durationHoveredMs = Math.round(Hj() - this.startTimeMs) // here the amount of time of hoverigng is computed
    }
    this.videoId && (b.videoId = this.videoId);
    this.csn && this.trackingParams && GRa(this.csn, mo(this.trackingParams), a, {
      thumbnailHoveredData: b
    });
    this.startTimeMs = this.loadingEndTimeMs = this.loadingStartTimeMs = - 1;
    this.hasVideoPreview = !1
  }
};
/**
 * this function below gets the the current time but checks whether 
 * window.ytcsi is enabled
 * or window .performance 
 * or window.timing.performnce
 */
var Hj =
  // if statement 1
  window.ytcsi && window.ytcsi.now ?
    // if true return window.ytcsi.now
    window.ytcsi.now :
    // else check whether any of the four exists
    window.performance && window.performance.timing && window.performance.now && window.performance.timing.navigationStart ?
      // if true return window. performance
      function () {
        return window.performance.timing.navigationStart + window.performance.now()
      } :
      // else return Date()
      function () {
        return new Date().getTime()
      };

function GRa(a, b, c, d) {
  UH(L('use_default_events_client') ? void 0 : wm, a, b, c, d) // void 0 === undefined
}
/**
 * wm might return or start a sort of a interval set at 5 seconds or 5000 ms
 * @param {any} a 
 */
var wm = function (a) {
  var b = this; // this is always the scope of the anonymous function therefore access to all the polymer functions
  this.config_ = null;
  a ? this.config_ = a : lha() && (this.config_ = Jk()); // if a is true so to say not undefined than config_ = a otherwise I gues it needs to be initialized
  Nj(Rj, function () {
    nha(b)
  }, 5000)
};
var Rj = Uj.getInstance();
Nj = function (a, b, c) {
  return a.addJob(b, 0, c)
}
e.addJob = function (a, b, c) {
  void 0 !== c && Number.isNaN(Number(c)) && (c = void 0);
  var d = La('yt.scheduler.instance.addJob');
  return d ? d(a, b, c) : void 0 === c ? (a(), NaN) : Ij(a, c || 0)
};
function nha(a) {
  var b = bl().get('requests', !0);
  if (b) {
    for (var c in b) {
      var d = b[c];
      if (!(60000 > Math.round(Ak()) - d.requestTime)) {
        var f = d.authState,
          h = Zk(Yk(!1));
        x.equals(f, h) && (f = d.request, 'requestTimeMs' in f && (f.requestTimeMs = Math.round(Ak())), bha(a, d.method, f, {
        }));
        delete b[c]
      }
    }
    bl().set('requests', b, 86400, !0)
  }
}
/**
 * @returns a boolean
 */
wm.prototype.isReady = function () {
  !this.config_ && lha() && (this.config_ = Jk());
  return !!this.config_ // <= this returns a boolean
};

/**
 * the functions below in avery convoluted way perform a boolean check 
 * I guess regarding the 'use_default_events_client'
 * by chewcking whether the built window object mj[see below line 149] 
 * contains this EXPERIMENTS_FORCED_FLAGS or EXPERIMENTS_FLAGS
 * @param {*} a 
 */

function L(a) {
  a = pj(a);
  /**
   * single bang inverts a boolean true to false, double bangs tuns a variable into its boolean representation 
   * from https://javascript.plainenglish.io/what-is-double-bang-operator-in-javascript-90fc67ead5a4
   */
  return 'string' === typeof a && 'false' === a ? !1 : !!a
}
/**
 * Line 9435
 * @param {} a 
 */
function pj(a) {
  var b = J('EXPERIMENTS_FORCED_FLAGS', {
  });
  return void 0 !== b[a] ? b[a] : J('EXPERIMENT_FLAGS', {
  })[a]
}
/**
 * Line 9408
 * @param {*} a 
 * @param {*} b 
 */
function J(a, b) {
  return a in mj ? mj[a] : b
}
/**
 * line 9401
 */
var mj = window.yt && window.yt.config_ || window.ytcfg && window.ytcfg.data_ || {};

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
  /**
   * TO DO 
   * check the three functions below
   */
  'UNDEFINED_CSN' == b ? TH('visualElementGestured', c, f) : a ? Lk('visualElementGestured', c, a, f) : dm('visualElementGestured', c, f)
}