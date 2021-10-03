


// function convert_to_string_eval(e) {
//   debug("typing")
//   const text = e.target.textContent
//   const converted = document.querySelector('#converted')
//   converted.textContent = text
// }



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


  debug('script panel loaded');
}
