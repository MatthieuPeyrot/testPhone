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

import express from 'express'
import bodyParser from 'body-parser'
import {bot} from './bot'
import mysql from 'mysql'
import {deleteConv, getFireNumber, updateFireBot, getFireBot} from './utils'

require('./config')

const connection = mysql.createConnection(process.env.SQL_HOST)

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
  app.listen(app.get('port'), async () => {
    connection.query('SELECT * FROM Voicemails', function (error, results, fields) {
      if (error) console.error(error)
      if (results) {
        console.log(results)
      }
    })
    try {
      const result = await getFireNumber('+33761391453')
      // await updateFireBot({name: 'bot', type: 'facebook-fr', access: '6098592f-e819-40a4-96f5-dc4f17b85583'}, 'vm-c642f6f5-bfc8-4b7e-809b-9020d974b0be')
      const service = await getFireBot('vm-c642f6f5-bfc8-4b7e-809b-9020d974b0be', '1696871486992920')
      console.log(service)
      console.log(result)
    } catch (e) {
      console.log(e)
    }
    deleteConv('1696871486992920')
    deleteConv('U5CJZS8V9')
    console.log('Our bot is running on port', app.get('port'))
  })
}
