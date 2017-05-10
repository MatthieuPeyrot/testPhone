/*
 * message.js
 * This file contains your bot code
 */

<<<<<<< HEAD
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
=======
import RECASTAI from 'recastai'

const replyMessage = (message) => {
  // Instantiate Recast.AI SDK, just for request service
  const client = new RECASTAI(process.env.REQUEST_TOKEN)

  const request = client.request
>>>>>>> 0e449a2... full es6 ready
  const text = message.content

  console.log('I receive: ', text)

  const senderId = message.senderId

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  console.log('conversationId: ', senderId)

  console.log('conversationToken: ', message.conversationId)
<<<<<<< HEAD

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> d0091fc... get convID
=======
=======
>>>>>>> c361c2c... fix
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ID,
      clientEmail: process.env.FIREBASE_EMAIL,
<<<<<<< HEAD
<<<<<<< HEAD
      privateKey: process.env.FIREBASE_KEY
    }),
    databaseURL: 'https://test-bot-7b5d9.firebaseio.com/'
  })
=======
>>>>>>> 4c6a3dd... wip
=======
      privateKey: process.env.FIREBASE_KEY1 + process.env.FIREBASE_KEY2 + process.env.FIREBASE_KEY3 + process.env.FIREBASE_KEY4 + process.env.FIREBASE_KEY5 + process.env.FIREBASE_KEY6 + process.env.FIREBASE_KEY7 + process.env.FIREBASE_KEY8 + process.env.FIREBASE_KEY9 + process.env.FIREBASE_KEY10 + process.env.FIREBASE_KEY11 + process.env.FIREBASE_KEY12 + process.env.FIREBASE_KEY13 + process.env.FIREBASE_KEY14 + process.env.FIREBASE_KEY15 + process.env.FIREBASE_KEY16 + process.env.FIREBASE_KEY17 + process.env.FIREBASE_KEY18 + process.env.FIREBASE_KEY19 + process.env.FIREBASE_KEY20 + process.env.FIREBASE_KEY21 + process.env.FIREBASE_KEY22 + process.env.FIREBASE_KEY23 + process.env.FIREBASE_KEY24 + process.env.FIREBASE_KEY25 + process.env.FIREBASE_KEY26 + process.env.FIREBASE_KEY27 + process.env.FIREBASE_KEY28
=======
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC086bKLXe2CDjx\nH37uIvsjOH+C6IdgWqPE8k/d1usfje+3jS+RtpCbfn5mhVG4IHu8xLsx5C8//9bi\nXjYWXwolRCqFR7odakTPEZuXezxN9XJEKxJbMulNZJaBNUgpP48gBJ4/9PNu+r+9\nRq8hTueIQ3yWpMhHQspW6+cWFuxudhVYyP+gBHwPZAkElymb/hdlYeINceUxP71M\nKATrWkAcLngu1YHhEnUvoL/wR8NcYG8BXrvBIG/7Eh7k1j8g810DQd3hSXzVnQIU\nCLJDL/a75PnKe3M7cRAofjEOqJFZcMdPsxeMcKO7BvJrmggaqTfBkm8PXP1peRX4\nuvBRNIXTAgMBAAECggEAa/f1zSzUAQlm8Hiag/zbXGiZrMKSBCwRC7KJdRSHtow6\nPItBlvAX2K/hO8rQt8yqCDhaeapthwJgdTFBlJegthu2Q1BI/MQrymH3NKuTj/Cj\n/Yi1qzT1f/hE1VO1eucxvykCQ6ckmVOElKtYU8eA3w1liX1JAzwW/0ZC3CtRZ5aL\n7Y9pXgCS3QY369HqHsl8OBX0ZQuI5d2iPKq8CM44nIEk+ypH9Rd0jqrXo7FbF20g\nVOtBgWyG9XOR0Eq2/UnS70qKrdpP2/Pyvj2ZQ3B6YT+Ur9PxhrWfPot4sqgnOqhp\nfvkmPThdKK//G0JdSOudGaMJuuKC0UJuqfpUnAFAAQKBgQDpvxGt9V8buuIVI/zJ\nVbbc6ZPffSoEQfmW9zpPB782OQhzzNNE3KbhJtpx+5ZuQcRZye39zHV01GzPbYxH\ncmUygUoOWnvRMrhlOFpS/XELPAxtSFI+yFIpwctxmY8lnvoDMK2SsDAOiqoa093p\nlHM2u3/jsao/ZVO8eiQD3Hy1gQKBgQDGLdue4a1vo4gZrWwk4PcGhOdG5BQK7cPK\n0h7HkWrYlhiZkNXOMyQT/oNvYSaoAWqyUpk8naL3KFuFfWMPF7ce0jhftRGPoMXu\nO0/yVFizqIbpobzjaTpN9851Tyzxk2VZ3C0UN2QGGTt7V57WzcyW/G9T3TL3f0sP\nCxmoA94tUwKBgDq++ZuF2qRmgKGdjM+xCidVUQPPOjsdtbPaaL4qDUV8agJojQR2\njD5z/Fy/RVxqjQWf+X9a3n5BUSOEvcfLGWHrGoim9w1puOw/kHvhFIMlUV452enL\ngNLb0Ny5Ij/rR5x7pHQEcd+FvCDH9LLay2YLE6ZPJaGPPs9Uxy5tQK6BAoGASOH4\nkPfiNtpnZToYOX/amTUrcTDUBijnBqI7250pNDoPFfrkBo9cR1YktEOAWe0bdjVW\nUaqPkmHvNqqkUZqhJ96cCOaobK/t2u1JO4+1h20FIMrwkpnSbXYjIZVarAVPErsc\ngQDV8kA5VeUlb04EXcq8jpUc91SDICcu6lFx1i0CgYEAoijUivgydgiqZp2gV3Dw\nkEuFAYtlKg05yGVplp4g6O98C33SXaBn0stWrUtSFDCrvE1sneGTV0yTCw8FutpH\nWp3FOL0IdJeuQJYmhnGozREfLtK9wdAmfi2fQDc8LiLO72WpElzVhv28FggvaSC8\n7CiCOQtcaRgk99xoJcS7tF0=\n-----END PRIVATE KEY-----\n'
>>>>>>> 3c0b0a0... again
    }),
    databaseURL: 'https://test-bot-7b5d9.firebaseio.com/'
  })
>>>>>>> c361c2c... fix
  const db = admin.database()
  const ref = db.ref('/users')
  ref.push({
    username: 'test',
    email: 'test@mail.com'})
  ref.once('value', (snapshot) => {
    console.log(snapshot.val())
  })
>>>>>>> 84b164b... test fire
=======

>>>>>>> b552580... try again
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
