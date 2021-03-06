/*
 * bot.js
 *
 * In this file:
 * - received message from a connected channel will be transformed with Recast.AI SDK
 * - received message from test command will be processed by Recast.AI
 *   You can run this command for testing:
 *   curl -X "POST" "http://localhost:5000" -d '{"text": "YOUR_TEXT"}' -H "Content-Type: application/json; charset=utf-8"
 *
 *
 * The Recast.AI SDK will handle the message and call your reply bot function (ie. replyMessage function)
 */

import RECASTAI from 'recastai'

import replyMessage from './message'

// Instantiate Recast.AI SDK

/*
 * Main bot function
 * Parameters are:
 * - body: Request body
 * - response: Response of your server (can be a blank object if not needed: {})
 * - callback: Callback is a function called by Recast.AI hosting system when your code will be hosted
 */
export const bot = (body, response, callback) => {
  const client = new RECASTAI(process.env.REQUEST_TOKEN)
  if (body.message) {
    /*
    * Call the Recast.AI SDK function to handle message from Bot Connector
    * This function will:
    * - Return a response with the status code 200
    * - Create a Message object, easily usable in your code
    * - Call the 'replyMessage' function, with this Message object in parameter
    *
    * If you want to edit the behaviour of your code bot, depending on user input,
    * go to /src/message.js file and write your own code under "YOUR OWN CODE" comment.
    */
    try {
      client.connect.handleMessage({ body }, response, replyMessage)
    } catch (e) {
      console.log(e)
    }

    /*
     * This function is called by Recast.AI hosting system when your code will be hosted
     */
    callback(null, { result: 'Bot answered :)' })
  } else if (body.text) {
    /*
    * If your request comes from the testing route
    * ie curl -X "POST" "https://localhost:5000" -d '{"text": "YOUR_TEXT"}' -H "Content-Type: application/json; charset=utf-8"
    * It just sends it to Recast.AI and returns replies
    */
    client.request.converseText(body.text, { conversationToken: process.env.CONVERSATION_TOKEN || null })
      .then((res) => {
        if (res.reply()) {
          console.log(res)
          callback(null, {
            reply: res.reply(),
            conversationToken: res.conversationToken
          })
        } else {
          callback(null, {
            reply: 'No reply :(',
            conversationToken: res.conversationToken
          })
        }
      })
      .catch((err) => {
        callback(err)
      })
  } else {
    callback('No text provided')
  }
}
