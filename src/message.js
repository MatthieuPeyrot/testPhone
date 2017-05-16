/*
 * message.js
 * This file contains your bot code
 */

import RECASTAI from 'recastai'
import mysql from 'mysql'
const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

function Query (connection, num) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT uuid FROM Phones WHERE phone = ?', num, (error, results, fields) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

const replyMessage = (message) => {
  const connection = mysql.createConnection(process.env.SQL_HOST)
  // Instantiate Recast.AI SDK, just for request service
  const client = new RECASTAI(process.env.REQUEST_TOKEN)

  const request = client.request
  const text = message.content

  console.log('I receive: ', text)

  const senderId = message.senderId

  console.log('conversationId: ', senderId)

  console.log('conversationToken: ', message.conversationId)
  // Call Recast.AI SDK, through /converse route

  request.converseText(text, { conversationToken: senderId })
  .then(async result => {
    while (result.action && result.action.slug && result.action.slug !== 'oui' && result.replies.length > 1) {
      result.replies.pop()
    }
    console.log(result)
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
      if (result.action && result.action.slug === 'non') {
        result.replies.forEach(replyContent => message.addReply({
          type: 'quickReplies',
          content: {
            title: 'Voulez vous testez Voxist?',
            buttons: [
              {
                title: 'Oui',
                value: 'test1'
              },
              {
                title: 'Non',
                value: 'test2'
              }
            ]
          }
        }))
      } else if ((result.action && result.action.slug === 'bonjour') || (result.entities && result.entities.salutations)) {
        result.replies.forEach(replyContent => message.addReply({
          type: 'quickReplies',
          content: {
            title: 'Bonjour! Etes vous d\xE9j\xE0 client chez Voxist?',
            buttons: [
              {
                title: 'Oui',
                value: 'oui'
              },
              {
                title: 'Non',
                value: 'non'
              }
            ]
          }
        }))
      } else if (result.action && result.action.slug === 'phone') {
        if (text[0] === '0' && /[0-9]{6,30}/g.test(text)) {
          var num = null
          try {
            num = phoneUtil.format(phoneUtil.parse(text, 'fr'), PNF.E164)
          } catch (e) {
            console.log('no matching')
            result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
          }
          try {
            var numRes = await Query(connection, num)
            if (numRes && numRes.length) {
              console.log(numRes)
              result.replies.forEach(replyContent => message.addReply({
                type: 'quickReplies',
                content: {
                  title: 'Pr\xE9f\xE9rez vous \xEAtre contact\xE9 par Messenger ou notre app?',
                  buttons: [
                    {
                      title: 'Messenger',
                      value: 'facebook'
                    },
                    {
                      title: 'Voxist',
                      value: 'voxist'
                    }
                  ]
                }
              }))
            } else {
              console.log('no results')
              result.replies.forEach(replyContent => message.addReply({
                type: 'quickReplies',
                content: {
                  title: 'Nous n\'avons pas trouvez votre num\xE9ro. Voulez vous testez Voxist?',
                  buttons: [
                    {
                      title: 'Oui',
                      value: 'test1'
                    },
                    {
                      title: 'Non',
                      value: 'test2'
                    }
                  ]
                }
              }))
            }
            connection.destroy()
          } catch (e) {
            console.log(e)
            result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
          }
        } else {
          console.log('no matching')
          result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
        }
      } else if (result.action && result.action.slug === 'testservice') {
        if (text.toLocaleLowerCase() === 'test1') {
          result.replies.forEach(replyContent => message.addReply({
            type: 'card',
            content: {
              title: 'Contactez Voxist pour tester notre app',
              subtitle: 'Ceci va lancer un appel vocal',
              imageUrl: 'https://images-platform.99static.com/bSeJTjKXpO84gGORB5WWwckBcbc=/0x0:1205x1205/fit-in/900x675/99designs-contests-attachments/72/72376/attachment_72376810',
              buttons: [
                {
                  title: 'Appeler',
                  type: 'phone_number',
                  value: '+33761391453'
                }
              ]
            }
          }))
        } else {
          result.replies.forEach(replyContent => message.addReply({ type: 'text', content: 'Merci de nous avoir accordé de votre temps. Bonne journée' }))
        }
      } else if ((!result.action || !result.action.slug) && /[0-9]{11,11}/g.test(text)) {
        result.replies.forEach(replyContent => message.addReply({type: 'text', content: 'Votre application ne prend pas en charge les appels syst\xEAme veuillez appuyer sur le lien suivant pour lancer l\'appel: <tel://33-7-61-39-14-53|Appeler>'}))
      } else {
        result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
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
