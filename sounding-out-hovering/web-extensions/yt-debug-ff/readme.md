## TO DO

- make cc messages in real time

## mouse events at line 9764

search for "this.previousVelocity\_"

generates clickTrackingParam
var d = this.$.historyManager;

search for historyManager line 107575

getInterface calculates clicktrackingparam

## remove limit to ff truncation

[here](https://stackoverflow.com/questions/51687462/firefox-developer-tools-truncates-long-network-response-chrome-does-not-show)

## watch next data is chnaged here:

`https://www.youtube.com/s/desktop/be17f2ce/jsbin/desktop_polymer.vflset/desktop_polymer.js` on line 30554

```javascript
b.prototype._flushProperties = function () {
  this.__dataCounter++;
  var c = this.__data,
    d = this.__dataPending,
    e = this.__dataOld;
  this._shouldPropertiesChange(c, d, e) &&
    ((this.__dataOld = this.__dataPending = null),
    this._propertiesChanged(c, d, e));
  this.__dataCounter--;
};
```

also here line 110381

```javascript
      setInitialItemsOnDataChanged: function (a) {
        this.cancelPendingTasks_();
        a || (a = [
        ]);
        this.items_ = a;
        this.length_ = this.items_.length;
        this.shownItems = this.items_.slice(0, this.initialCount);
        this.shownCount = this.shownItems.length;
        this.canShowMore = this.shownCount < this.length_;
        this.autoFill && (Mh('DISABLE_AUTOFILL') ? this.fillRemainingListItems() : (this.chunkCount_ = this.initialCount, this.lastChunkTime_ = Date.now(), this.canShowMore && eu(this, this.tryRenderChunk_)))
      },
```

## What did I discover lately

log event with `final payload`is sent whenever a window is clodsed

a `qoe?`post message is sent everytime you switch tab
