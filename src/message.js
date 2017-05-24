/*
 * message.js
 * This file contains your bot code
 */

import RECASTAI from 'recastai'
import frenchReply from './french'
import englishReply from './english'
import {GetFBInfo, modConv} from './utils'

const replyMessage = async (message) => {
  // Instantiate Recast.AI SDK, just for request service
  const client = new RECASTAI(process.env.REQUEST_TOKEN)

  const request = client.request
  const text = message.content

  console.log('I receive: ', text)

  console.dir('message: ' + message)


// TODO: need to integrate language by bdd here for more faster response

  const senderId = message.senderId
  const userName = message && message.message && message.message.data && message.message.data.userName ? message.message.data.userName : null

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

  console.log('conversationToken: ', message.conversationId)
  // Call Recast.AI SDK, through /converse route

  request.converseText(text, { conversationToken: senderId })
  .then(async result => {
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
      if (local) {
        loacalLanguage = local.toLocaleLowerCase()
      } else {
        loacalLanguage = result.language
      }
    } else {
      loacalLanguage = 'en'
    }
    console.log('loacl: ', local)
    console.log('loacalLanguage: ', loacalLanguage)
    console.log(result.replies.length)
    const length = result.replies.length - 1

    console.debug('result: ' + result)
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
        console.log(result.memory)
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
