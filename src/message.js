/*
 * message.js
 * This file contains your bot code
 */

import RECASTAI from 'recastai'
import frenchReply from './french'
import englishReply from './english'
import {GetFBInfo, modConv} from './utils'
import * as admin from 'firebase-admin'
import crypto from 'crypto'

const fire = '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'

const replyMessage = async (message) => {
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
  } catch (e) {
    console.log(e)
  }

  // Instantiate Recast.AI SDK, just for request service
  const client = new RECASTAI(process.env.REQUEST_TOKEN)

  const request = client.request
  const text = message.content

  console.log('I receive: ', text)

// TODO: need to integrate language by bdd here for more faster response
  try {
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

  const senderId = message.senderId
  const userName = message.message.data.userName

  var isFB = false
  var local = null
  var loacalLanguage = null
  try {
    const FBquery = await GetFBInfo(senderId, process.env.PAGES)
    if (FBquery && FBquery.first_name && FBquery.last_name && FBquery.locale && (FBquery.first_name + ' ' + FBquery.last_name === userName)) {
      local = FBquery.locale.replace(/\w+_/g, '')
      loacalLanguage = FBquery.locale.replace(/_\w+/g, '')
      isFB = true
    }
  } catch (e) {
    isFB = false
  }

  console.log('AppUserId: ', senderId)

  // console.log('conversationToken: ', message.conversationId)
  // Call Recast.AI SDK, through /converse route

  request.converseText(text, { conversationToken: senderId })
  .then(async result => {
    // while (result.action && result.action.slug && result.action.slug !== 'oui' && result.replies.length > 1) {
    //   result.replies.pop()
    // }
    if (!local && result.memory && result.memory.loc && result.memory.loc.formatted) {
      console.log(result.memory.loc.formatted.toLowerCase())
      switch (result.memory.loc.formatted.toLowerCase()) {
        case 'france':
        case 'francia':
          local = 'FR'
          break
        case 'united kingdom':
        case 'royaume-uni':
          local = 'GB'
          break
        case 'usa':
        case 'united states':
        case 'etats unis':
          local = 'US'
          break
        case 'australie':
        case 'australia':
          local = 'AU'
          break
        case 'spain':
        case 'espagne':
          local = 'ES'
          break
        case 'poland':
        case 'pologne':
          local = 'PL'
          break
        case 'netherlands':
        case 'pays bas':
          local = 'NL'
          break
        default:
          local = null
      }
    }
    if (local === 'FR' || result.language === 'fr') {
      loacalLanguage = local.toLocaleLowerCase()
    } else {
      loacalLanguage = 'en'
    }
    console.log('loacl: ', local)
    console.log('loacalLanguage: ', loacalLanguage)
    console.log(result.replies.length)
    const length = result.replies.length - 1
    /*
    * YOUR OWN CODE
    * Here, you can add your own process.
    * Ex: You can call any external API
    * Or: Update your mongo DB
    * etc...
    */

    if (!result.replies.length) {
      message.addReply({ type: 'text', content: 'I don\'t have the reply to this yet :)' })
    } else {
      if ((loacalLanguage && loacalLanguage === 'fr') || (result.language && result.language === 'fr' && !loacalLanguage)) {
        try {
          message = await frenchReply(result, message, text, isFB, local, length)
        } catch (e) {
          console.log(e)
          message.addReply({ type: 'text', content: 'Une erreur est survenue, veuillez nous en excuser et recommencer le processus' })
          modConv(senderId, {
            'loc': null,
            'non': null,
            'oui': null,
            'rep1': null,
            'rep2': null,
            'tel': null
          })
        }
      } else {
        try {
          message = await englishReply(result, message, text, isFB, local, length)
        } catch (e) {
          console.log(e)
          message.addReply({ type: 'text', content: 'An error has occurred, please excuse us and restart the process' })
          modConv(senderId, {
            'loc': null,
            'non': null,
            'oui': null,
            'rep1': null,
            'rep2': null,
            'tel': null
          })
        }
      }
    }
    if (result.action) {
      console.log('The conversation action is: ', result.action.slug)
    } else {
      message.addReply({type: 'text', content: 'Say hello for start conversation! \nDites bonjour pour démarer la conversation!'})
    }

    message.reply()
    .then(() => {
      // Do some code after sending messages
    })
    .catch(err => {
      console.error('Error while sending message to channel', err)
    })
  })
  .catch(err => {
    console.error('Error while sending message to Recast.AI', err)
  })
}

export default replyMessage
