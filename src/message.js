/*
 * message.js
 * This file contains your bot code
 */

<<<<<<< HEAD
import RECASTAI from 'recastai'

const replyMessage = (message) => {
  // Instantiate Recast.AI SDK, just for request service
  const client = new RECASTAI(process.env.REQUEST_TOKEN)

  const request = client.request
=======
const RECAST_AI = require('recastai')

const replyMessage = (message) => {
  // Instantiate Recast.AI SDK, just for request service
  const request = new RECAST_AI.request(process.env.REQUEST_TOKEN, process.env.LANGUAGE)
>>>>>>> 5e01f73... test conv
  const text = message.content

  console.log('I receive: ', text)

  const senderId = message.senderId

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  console.log('conversationId: ', senderId)

  console.log('conversationToken: ', message.conversationId)

=======
  // Call Recast.AI SDK, through /converse route

  console.log('conversationToken: ', senderId)
>>>>>>> 96fd6fb... save id
=======
console.log(message)
  // console.log('conversationToken: ', senderId)
>>>>>>> 5e01f73... test conv
=======
  console.log('conversationToken: ', message.conversationId)
>>>>>>> d0091fc... get convID
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
<<<<<<< HEAD
<<<<<<< HEAD
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
      } else if (result.action.slug === 'phone' && result.replies[0] === 'merci je cherche') {
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
        result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
      }
=======
      // Add each reply received from API to replies stack
<<<<<<< HEAD
      result.replies.forEach(replyContent => message.addReply({ type: 'quickReplies', content: replyContent }))
>>>>>>> 1a20a92... restore
=======
=======
>>>>>>> 5e01f73... test conv
      result.replies.forEach(replyContent => message.addReply({ type: 'text', content: replyContent }))
>>>>>>> af95b3f... text
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
