
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

const s = function (sketch) {
  sketch.trck = null
  sketch._pointer = 0
  sketch._initialized = false

  sketch.setup = function () {
    document.body.style['userSelect'] = 'none'
    let h = document.body.clientHeight
    let c = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
    c.position(0, 25)
    c.style('pointer-events', 'none')
    c.style('position', 'fixed')
    c.style('z-index', '99999999')
    sketch.colorMode(sketch.RGB, 255, 255, 255, 1)
    sketch.textFont("monospace")
    sketch.textSize(10)
    sketch.textAlign(sketch.CENTER, sketch.CENTER)
    sketch.clear()
    sketch.noStroke()
  }

  sketch.initialize = (tracker) => {
    console.log('///~~~ SKETCH INITIALIZED ~~~///');
    sketch.trck = tracker
    console.log(sketch.trck)
    sketch._initialized = true
  }

  sketch.update_tracker = (tracker) => {
    sketch.trck = tracker
  }

  sketch.step_tracker = (pointer) => {
    sketch._pointer = pointer
  }

  sketch.draw = function () {
    sketch.clear()
    const cell_h = 12
    if (sketch._initialized) {
      const col_w = sketch.floor(sketch.windowWidth / sketch.trck.length)
      const shown_steps = 16
      for (let step_backward = shown_steps - 1; step_backward >= 0; step_backward--) {
        for (let i = 0; i < sketch.trck.length; i++) {
          const track = sketch.trck[i]
          // console.log('///~~~ p5debug ~~~///')
          // console.log(track, sketch._pointer)
          const current_pointer = ((sketch._pointer - step_backward) + 127) % 127
          const note = track[current_pointer]['note']
          const velocity = track[current_pointer]['vel']

          sketch.fill(255, 0, 0, 0.25)
          if(step_backward > 0){
            sketch.fill(0, 255, 0, 0.25)
          }else{
            if(note !== null){
              sketch.fill(255, 0, 0, 1)
            }
          }
          sketch.rect(col_w * i, ((shown_steps * cell_h) - (step_backward * cell_h)) - cell_h / 2, col_w, cell_h)
          sketch.fill(255)
          sketch.text(`: ${note === null ? 0 : note} ::: ${velocity} :`, col_w / 2 + (col_w * i), (shown_steps * cell_h) - (step_backward * cell_h))
        }
      }
    }
  }

  sketch.windowResized = () => {
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight)
  }

}


