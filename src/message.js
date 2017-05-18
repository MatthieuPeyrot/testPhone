/*
 * message.js
 * This file contains your bot code
 */

import RECASTAI from 'recastai'
import frenchReply from './french'
import englishReply from './english'
import {GetFBInfo} from './utils'

const replyMessage = async (message) => {
  // Instantiate Recast.AI SDK, just for request service
  const client = new RECASTAI(process.env.REQUEST_TOKEN)

  const request = client.request
  const text = message.content

  console.log('I receive: ', text)

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
    if (local === 'FR') {
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
    if (result.action) {
      console.log('The conversation action is: ', result.action.slug)
    }

    if (!result.replies.length) {
      message.addReply({ type: 'text', content: 'I don\'t have the reply to this yet :)' })
    } else {
      if ((loacalLanguage && loacalLanguage === 'fr') || (result.language && result.language === 'fr' && !loacalLanguage)) {
        try {
          message = await frenchReply(result, message, text, isFB, local, length)
        } catch (e) {
          message = message.addReply({ type: 'text', content: 'Une erreur est survenue, veuillez nous en excuser' })
        }
      } else {
        try {
          message = await englishReply(result, message, text, isFB, local, length)
        } catch (e) {
          message = message.addReply({ type: 'text', content: 'An error has occurred, please excuse us' })
        }
      }
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
