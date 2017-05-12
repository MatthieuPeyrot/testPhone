/*
 * message.js
 * This file contains your bot code
 */

import RECASTAI from 'recastai'
import mysql from 'mysql'

var connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_LOGIN,
  password: process.env.SQL_PASS,
  database: 'data'
})

const replyMessage = (message) => {
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
  .then(result => {
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
      if (result.action.slug === 'non') {
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
      } else if (result.action.slug === 'bonjour') {
        result.replies.forEach(replyContent => message.addReply({
          type: 'quickReplies',
          content: {
            title: 'Bonjour! Etes vous déjà client chez Voxist?',
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
      } else if (result.action.slug === 'phone') {
        if (text[0] === '0' && /[0-9]{10,10}/g.test(text)) {
          var num = text.replace(/0/, '+33')
          connection.query(`SELECT uuid WHERE phone = ${num} FROM Phones`, function (error, results, fields) {
            if (error) {
              console.log(error)
              result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
            }
            if (results) {
              console.log(results)
              result.replies.forEach(replyContent => message.addReply({
                type: 'quickReplies',
                content: {
                  title: 'Préférez vous être contacté par Messenger ou notre app?',
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
                  title: 'Nous n\'avons pas trouvez votre numéro. Voulez vous testez Voxist?',
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
          })
        } else {
          console.log('no matching')
          result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
        }
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
