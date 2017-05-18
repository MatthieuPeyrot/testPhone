const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
import {Query} from './utils'

const englishReply = async (result, message, text, isFB, local, length) => {
  if ((result.action && result.action.slug === 'bonjour') || (result.entities && result.entities.salutations)) {
    result.replies.forEach((replyContent, i) => {
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
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
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
        }
      }
    })
  } else if ((result.action && result.action.slug === 'country') || (result.entities && result.entities.salutations)) {
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
  } else if ((result.action && result.action.slug === 'non') || (result.entities && result.entities.non1)) {
    result.replies.forEach((replyContent, i) => {
      if (i < length) {
        message.addReply({ type: 'text', content: replyContent })
      } else {
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
      }
    })
  } else if (result.action && result.action.slug === 'testservice') {
    if (text.toLocaleLowerCase() === 'try') {
      if (isFB) {
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
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
        })
      } else {
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            message.addReply({
              type: 'text',
              content: 'Contact Voxist to test our app. \nPress <tel://33-7-61-39-14-53|here> will start a voice call'
            })
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
  } else if ((result.action && result.action.slug === 'phone') || (result.entities && result.entities.phone)) {
    if (text[0] === '0' && /[0-9]{6,30}/g.test(text)) {
      var num = null
      try {
        num = phoneUtil.format(phoneUtil.parse(text, isFB ? local : 'US'), PNF.E164)
      } catch (e) {
        console.log('no matching')
        console.log(e)
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            message.addReply({ type: 'text', content: replyContent })
          }
        })
      }
      try {
        var numRes = await Query(num)
        if (numRes && numRes.length) {
          console.log(numRes)
          result.replies.forEach((replyContent, i) => {
            if (i < length) {
              message.addReply({ type: 'text', content: replyContent })
            } else {
              message.addReply({
                type: 'quickReplies',
                content: {
                  title: 'Would you prefer to be contacted by Messenger or Voxist?',
                  buttons: [
                    {
                      title: 'Messenger',
                      value: 'messenger'
                    },
                    {
                      title: 'Voxist',
                      value: 'voxist app'
                    }
                  ]
                }
              })
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
        console.log(e)
        result.replies.forEach((replyContent, i) => {
          message.addReply({ type: 'text', content: replyContent })
        })
      }
    } else {
      console.log('no matching')
      result.replies.forEach((replyContent, i) => {
        message.addReply({ type: 'text', content: replyContent })
      })
    }
  } else {
    result.replies.forEach((replyContent, i) => {
      message.addReply({ type: 'text', content: replyContent })
    })
  }
  return message
}

export default englishReply
