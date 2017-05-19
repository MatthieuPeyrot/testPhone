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
// import mysql from 'mysql'
import {deleteConv} from './utils'
import * as admin from 'firebase-admin'
import crypto from 'crypto'

// var serviceAccount = require('../test1-24e01-firebase-adminsdk-gv9zk-a007c6290a.json')

require('./config')

const fire = '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'

// const connection = mysql.createConnection(process.env.SQL_HOST)

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
    // connection.query('SELECT phone FROM Phones WHERE phone LIKE "+185%"', function (error, results, fields) {
    //   if (error) console.error(error)
    //   if (results) {
    //     console.log(results)
    //   }
    // })
    try {
      const decipher = crypto.createDecipher(process.env.MYHASH, process.env.PRIVATE)
      var key = decipher.update(fire, 'base64', 'utf8')
      key += decipher.final('utf8')
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.PROJECT,
          clientEmail: process.env.MAIL,
          privateKey: key
        }),
        databaseURL: process.env.FIREBASE_URL
      })
      const db = admin.database()
      const ref = db.ref('/')
      ref.child('Phones').child('+33603434684').on('value', (snapshot) => {
        console.log(snapshot.val())
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.code)
      })
    } catch (e) {
      console.log(e)
    }
    deleteConv('1696871486992920')
    deleteConv('U5CJZS8V9')
    console.log('Our bot is running on port', app.get('port'))
  })
}
