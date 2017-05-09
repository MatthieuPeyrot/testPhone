/*
 * server.js
 * This file is the core of your bot
 *
 * It creates a little server using express
 * So, your bot can be triggered throught "/" route
 *
 * This file was made for locally testing your bot
 * You can test it by running this command
 * curl -X "POST" "http://localhost:5000" -d '{"text": "YOUR_TEXT"}' -H "Content-Type: application/json; charset=utf-8"
 * You might modify the server port ^^^^  depending on your configuration in config.js file
 */

const express = require('express')
const bodyParser = require('body-parser')
var request = require('superagent')

require('./config')
const bot = require('./bot').bot

const app = express()
app.set('port', process.env.PORT || 5000)
app.use(bodyParser.json())

app.use('/', (request, response) => {
  bot(request.body, response, (error, success) => {
    if (error) {
      console.log('Error in your bot:', error)
      if (!response.headersSent) { response.sendStatus(400) }
    } else if (success) {
      console.log(success)
      if (!response.headersSent) { response.status(200).json(success) }
    }
  })
})

if (!process.env.REQUEST_TOKEN.length) {
  console.log('ERROR: process.env.REQUEST_TOKEN variable in src/config.js file is empty ! You must fill this field with the request_token of your bot before launching your bot locally')

  process.exit(0)
} else {
  app.listen(app.get('port'), () => {
    // request
    //   .post(`https://api.recast.ai/connect/v1/conversations/${'6144ad24-802f-4890-9df1-f45debc32c01'}/messages`)
    //   .send({ messages: [{ type: 'text', content: 'Hello, world!' }] })
    //   .set('Authorization', `Token ${process.env.REQUEST_TOKEN}`)
    //   .end((err, res) => {
    //     if (err) console.log(err)
    //     console.log(res)
    //   })
    console.log('Our bot is running on port', app.get('port'))
  })
}
