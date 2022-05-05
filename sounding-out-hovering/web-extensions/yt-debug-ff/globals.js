const yt_events_names = {
  FHB: 'foregroundHeartbeat',
  VES: 'visualElementShown',
  VESC: 'visualElementStateChanged',
  VEA: 'visualElementAttached',
  VEG: 'visualElementGestured',
  player_stats: 'html5PlayerHealthEvent'
}

function random_127_value(low, high) {
  const l = low || 0
  const h = high || 0
  return l + Math.floor(Math.random() * (128 - h))
}

function is_ads_data(events) {
  return Object.keys(events['context']).includes('adSignalsInfo')
}

function is_hovering_data(event) {
  const v_e_g = 'visualElementGestured'
  return Object.keys(event).includes(v_e_g)
}

function return_inner_event(event) {
  const key_1 = 'context'
  const key_2 = 'eventTimeMs'
  const inner_event = Object.keys(event).filter(key => (key !== key_1 && key !== key_2))
  return {
    event_name: inner_event[0],
    event: event[inner_event[0]]
  }
}

const yt_ids = {
  next: 'next',
  next_res: 'next-res',
  player: 'player',
  player_res: 'player-res',
  browse: 'browse',
  what_to_watch: 'wtw',
  log: 'log',
  watchtime: 'wt',
  qoe: 'qoe',
  search: 'search',
  playlist: 'edit_playlist',
  log_point: 'log_point'
}