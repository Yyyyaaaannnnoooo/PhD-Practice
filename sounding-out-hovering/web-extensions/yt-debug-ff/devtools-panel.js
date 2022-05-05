window.onload = () => {

  function debug(str) {
    const el = document.querySelector('.debug')
    el.textContent = str
  }

  const to_convert = document.querySelector('#convert')
  to_convert.addEventListener('input', e => {

    const converted = document.querySelector('#conversion')
    converted.textContent = e.target.value
  })


  // console.log('script panel loaded')

  // fetch midi ports at '/midi'
  // debug('fetching midi ports')
  fetch('http://127.0.0.1:3000/midi')
    .then(res => res.json())
    .then(data => {
      build_midi_select(data['midi_outputs'])
    }
    )
    .catch(err => {
      console.log(err)
    })


}

const build_midi_select = data => {
  console.log(data);
  console.log('building midi select')
  const select = document.querySelector('.midi-select')
  data.forEach(port => {
    const option = document.createElement('div')
    option.classList.add('btn')
    option.value = port.number
    option.textContent = port.name
    option.addEventListener('click', e => {
      const value = e.target.value

      fetch('http://127.0.0.1:3000/set-midi',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value })
        })
        .then(response => response.json())
        .then(result => { console.log('Success:', result); })
        .catch(error => { console.error('Error:', error); });
    }

    )
    select.appendChild(option)
  }
  )
}

const max_open_tabs = 5

function handle_request_finished(request) {
  // console.log("Server IP: ", request.serverIPAddress)
  // console.log(request['request']['url'])
  const url = request['request']['url']
  request.getContent().then(([content, mimeType]) => {

    // console.log("MIME type: ", mimeType)
    // console.log(content)
    if (mimeType === "application/json; charset=UTF-8") {
      // console.log(url)
      // console.log("Content: ", JSON.parse(content))


      const json = JSON.parse(content)
      if (url.includes('next?')) {
        // // This handle the request to get new videos
        // console.log('///~~~ next-res ~~~///')
        // console.log(json)
        const lvl1 = 'contents'
        const lvl2 = 'twoColumnWatchNextResults'
        const lvl3_4 = 'autoplay'
        const lvl5 = 'sets'
        const watch_next = json[lvl1][lvl2][lvl3_4][lvl3_4][lvl5][0]['autoplayVideo']
        const url = watch_next['commandMetadata']['webCommandMetadata']['url']

        browser.runtime.sendMessage({
          data: watch_next,
          url
        });

        // // send_message(yt_ids.next_res, json)
        // console.log('///~~~~~~~~~~~~///')
      }
      if (url.includes('player?')) {
        // This handle the request to get new videos
        // console.log('///~~~ player-res ~~~///')
        // // console.log(json)

        // console.log(json['adPlacements'])
        // // send_message(yt_ids.player_res, json)
        // console.log('///~~~~~~~~~~~~///')
      }
      if (url.includes('browse?')) {
        const _1 = 'onResponseReceivedActions'
        // This handle the request to get new videos
        // console.log('///~~~ browse-res ~~~///')
        // console.log(json)
        // send_message(yt_ids.browse, json)
        // console.log('///~~~~~~~~~~~~///')
      }
    }
  });
}

browser.devtools.network.onRequestFinished.addListener(handle_request_finished);





