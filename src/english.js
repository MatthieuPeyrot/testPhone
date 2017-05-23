const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
import {getFireNumber, modConv, updateFireBot} from './utils'

const englishReply = async (result, message, text, isFB, local, length) => {
  if (((result.action && result.action.slug === 'bonjour' && result.action.done) || (result.nextActions && result.nextActions[0] && result.nextActions[0].slug === 'oui' && !result.nextActions[0].done)) || (result.entities && result.entities.salutations)) {
    if (result.nextActions && result.nextActions[0] && result.nextActions[0].slug === 'oui' && !result.nextActions[0].done) length--
    if (!local) {
      result.replies.forEach((replyContent, i) => {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          if (isFB) {
            message.addReply({
              type: 'quickReplies',
              content: {
                title: 'Hello! We need to know your country?',
                buttons: [
                  {
                    title: 'France',
                    value: 'Francia'
                  },
                  {
                    title: 'United Kingdom',
                    value: 'United Kingdom'
                  },
                  {
                    title: 'United States',
                    value: 'United States'
                  },
                  {
                    title: 'USA',
                    value: 'USA'
                  },
                  {
                    title: 'Australia',
                    value: 'Australia'
                  },
                  {
                    title: 'Spain',
                    value: 'Spain'
                  },
                  {
                    title: 'Poland',
                    value: 'Poland'
                  },
                  {
                    title: 'Netherlands',
                    value: 'Netherlands'
                  },
                  {
                    title: 'Other',
                    value: 'Other'
                  }
                ]
              }
            })
          } else {
            message.addReply({
              type: 'quickReplies',
              content: {
                title: 'Hello! We need to know your country?',
                buttons: [
                  {
                    title: 'France',
                    value: 'Francia'
                  },
                  {
                    title: 'United Kingdom',
                    value: 'United Kingdom'
                  },
                  {
                    title: 'United States',
                    value: 'United States'
                  },
                  {
                    title: 'USA',
                    value: 'USA'
                  },
                  {
                    title: 'Australia',
                    value: 'Australia'
                  }
                ]
              }
            })
            message.addReply({
              type: 'quickReplies',
              content: {
                buttons: [
                  {
                    title: 'Spain',
                    value: 'Spain'
                  },
                  {
                    title: 'Poland',
                    value: 'Poland'
                  },
                  {
                    title: 'Netherlands',
                    value: 'Netherlands'
                  },
                  {
                    title: 'Other',
                    value: 'Other'
                  }
                ]
              }
            })
          }
        }
      })
    } else {
      result.replies.forEach((replyContent, i) => {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          if (i <= length) {
            message.addReply({
              type: 'quickReplies',
              content: {
                title: 'Hello! Do you already use Voxist?',
                buttons: [
                  {
                    title: 'Yes',
                    value: 'yes'
                  },
                  {
                    title: 'No',
                    value: 'not'
                  }
                ]
              }
            })
          } else {
            modConv(message.senderId, {tel: null})
          }
        }
      })
    }
  } else if ((result.action && result.action.slug === 'country' && result.action.done) || (result.entities && result.entities.salutations)) {
    result.replies.forEach((replyContent, i) => {
      if (!local) {
        message.addReply({ type: 'text', content: 'Unfortunately Voxist is not yet available in your country.' })
      } else {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          message.addReply({
            type: 'quickReplies',
            content: {
              title: 'Do you already use Voxist?',
              buttons: [
                {
                  title: 'Yes',
                  value: 'yes'
                },
                {
                  title: 'No',
                  value: 'not'
                }
              ]
            }
          })
        }
      }
    })
  } else if (((result.action && result.action.slug === 'non') || (result.nextActions && result.nextActions[0] && result.nextActions[0].slug === 'non' && !result.nextActions[0].done)) || (result.entities && result.entities.non1)) {
    if (result.nextActions && result.nextActions[0] && result.nextActions[0].slug === 'non' && !result.nextActions[0].done) length--
    result.replies.forEach((replyContent, i) => {
      if (i < length) {
        message.addReply({ type: 'text', content: replyContent })
      } else {
        if (i <= length) {
          if (local === 'FR' || local === 'US') {
            message.addReply({
              type: 'quickReplies',
              content: {
                title: 'Want to test Voxist?',
                buttons: [
                  {
                    title: 'Yes',
                    value: 'try'
                  },
                  {
                    title: 'No',
                    value: 'not try'
                  }
                ]
              }
            })
          } else {
            message.addReply({ type: 'text', content: 'Unfortunately test aren\'t available in your country.' })
          }
        } else {
          modConv(message.senderId, {rep2: null})
        }
      }
    })
  } else if (result.action && result.action.slug === 'testservice' && result.action.done) {
    if (text.toLocaleLowerCase() === 'try') {
      if (isFB) {
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            if (local === 'FR') {
              message.addReply({
                type: 'card',
                content: {
                  title: 'Contact Voxist to test our app',
                  subtitle: 'This will initiate a voice call',
                  imageUrl: 'https://images-platform.99static.com/bSeJTjKXpO84gGORB5WWwckBcbc=/0x0:1205x1205/fit-in/900x675/99designs-contests-attachments/72/72376/attachment_72376810',
                  buttons: [
                    {
                      title: 'Call',
                      type: 'phone_number',
                      value: '+33761391453'
                    }
                  ]
                }
              })
            } else {
              message.addReply({
                type: 'card',
                content: {
                  title: 'Contact Voxist to test our app',
                  subtitle: 'This will initiate a voice call',
                  imageUrl: 'https://images-platform.99static.com/bSeJTjKXpO84gGORB5WWwckBcbc=/0x0:1205x1205/fit-in/900x675/99designs-contests-attachments/72/72376/attachment_72376810',
                  buttons: [
                    {
                      title: 'Call',
                      type: 'phone_number',
                      value: '+33761391453'
                    }
                  ]
                }
              })
            }
          }
        })
      } else {
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            if (local === 'FR') {
              message.addReply({
                type: 'text',
                content: 'Contact Voxist to test our app. \nPress <tel://33-7-61-39-14-53|here> will start a voice call'
              })
            } else {
              message.addReply({
                type: 'text',
                content: 'Contact Voxist to test our app. \nPress <tel://33-7-61-39-14-53|here> will start a voice call'
              })
            }
          }
        })
      }
    } else {
      result.replies.forEach((replyContent, i) => {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          message.addReply({ type: 'text', content: 'Thank you for your time. Have a good day' })
        }
      })
    }
  } else if ((result.action && result.action.slug === 'phone' && result.action.done) || (result.entities && result.entities.phone)) {
    if (/[0-9]{6,30}/g.test(text)) {
      var num = null
      try {
        num = phoneUtil.format(phoneUtil.parse(text, local || 'US'), PNF.E164)
      } catch (e) {
        console.log('no matching')
        modConv(message.senderId, {
          'loc': null,
          'non': null,
          'oui': null,
          'rep1': null,
          'rep2': null,
          'tel': null
        })
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            message.addReply({ type: 'text', content: 'The format of your number is not recognized' })
          }
        })
      }
      try {
        var numRes = await getFireNumber(num)
        if (numRes) {
          console.log(numRes)
          result.replies.forEach((replyContent, i) => {
            if (i < length) {
              message.addReply({ type: 'text', content: replyContent })
            } else {
              if (isFB) {
                message.addReply({
                  type: 'quickReplies',
                  content: {
                    title: 'Would you prefer to be contacted by Messenger or Voxist?',
                    buttons: [
                      {
                        title: 'Messenger',
                        value: 'our bot'
                      },
                      {
                        title: 'Voxist',
                        value: 'voxist app'
                      }
                    ]
                  }
                })
              } else {
                message.addReply({
                  type: 'quickReplies',
                  content: {
                    title: 'Would you prefer to be contacted by Slack or Voxist?',
                    buttons: [
                      {
                        title: 'Slack',
                        value: 'our bot'
                      },
                      {
                        title: 'Voxist',
                        value: 'voxist app'
                      }
                    ]
                  }
                })
              }
              modConv(message.senderId, {tel: {raw: num, value: numRes.uuid}})
            }
          })
        } else {
          console.log('no results')
          result.replies.forEach((replyContent, i) => {
            if (i < length) {
              message.addReply({ type: 'text', content: replyContent })
            } else {
              if (local === 'FR' || local === 'US') {
                message.addReply({
                  type: 'quickReplies',
                  content: {
                    title: 'We didn\'t find your number. Want to test Voxist?',
                    buttons: [
                      {
                        title: 'Yes',
                        value: 'try'
                      },
                      {
                        title: 'No',
                        value: 'not try'
                      }
                    ]
                  }
                })
              } else {
                message.addReply({ type: 'text', content: 'We didn\'t find your number. And test aren\'t available in your country.' })
              }
            }
          })
        }
      } catch (e) {
        modConv(message.senderId, {
          'tel': null
        })
        console.log(e)
        result.replies.forEach((replyContent, i) => {
          message.addReply({ type: 'text', content: 'An error is generated please enter again your number' })
        })
      }
    } else {
      console.log('no matching')
      result.replies.forEach((replyContent, i) => {
        message.addReply({ type: 'text', content: 'The format of your number is not recognized' })
      })
    }
  } else if ((result.action && result.action.slug === 'messengerfirst' && result.action.done && /\+/.test(result.memory.tel.raw)) || (result.entities && result.entities.choix1 && /\+/.test(result.memory.tel.raw))) {
    result.replies.forEach((replyContent, i) => {
      message.addReply({ type: 'text', content: replyContent })
    })
    if (text.toLocaleLowerCase() === 'our bot' || text.toLocaleLowerCase() === 'notre bot') {
      console.log('enter')
      try {
        await updateFireBot({name: (isFB ? 'facebook' : 'slack') + '-en', type: (isFB ? 'facebook' : 'slack'), access: message.conversationId}, result.memory.tel.value)
      } catch (e) {
        console.log(e)
      }
    }
  } else {
    result.replies.forEach((replyContent, i) => {
      message.addReply({ type: 'text', content: replyContent })
    })
  }
  return message
}

export default englishReply
