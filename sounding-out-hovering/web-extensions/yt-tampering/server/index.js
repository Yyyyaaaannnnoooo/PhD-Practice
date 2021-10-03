const express = require('express')
const body_parser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
//Here we are configuring express to use body-parser as middle-ware.
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());


app.post('/log-point', (req, res) => {
    console.log('Got body:', req.body)
    res.send({response: 'success'})
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })