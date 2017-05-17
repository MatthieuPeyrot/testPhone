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

export const frenchReply = async (result, message, text, isFB, local, length) => {
  const connection = mysql.createConnection(process.env.SQL_HOST)
  if ((result.action && result.action.slug === 'bonjour') || (result.entities && result.entities.salutations)) {
    result.replies.forEach((replyContent, i) => {
      if (i < length) {
        message.addReply({ type: 'text', content: replyContent })
      } else {
        message.addReply({
          type: 'quickReplies',
          content: {
            title: 'Bonjour! Utilisez vous déjà Voxist?',
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
        })
      }
    })
  } else if ((result.action && result.action.slug === 'non') || (result.entities && result.entities.non1)) {
    result.replies.forEach((replyContent, i) => {
      if (i < length) {
        message.addReply({ type: 'text', content: replyContent })
      } else {
        message.addReply({
          type: 'quickReplies',
          content: {
            title: 'Voulez vous testez Voxist?',
            buttons: [
              {
                title: 'Oui',
                value: 'test'
              },
              {
                title: 'Non',
                value: 'test pas'
              }
            ]
          }
        })
      }
    })
  } else if (result.action && result.action.slug === 'testservice') {
    if (text.toLocaleLowerCase() === 'test1') {
      if (isFB) {
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            message.addReply({
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
              content: 'Contactez Voxist pour tester notre app. \nAppuyez <tel://33-7-61-39-14-53|ici> va lancer un appel vocal'
            })
          }
        })
      }
    } else {
      result.replies.forEach((replyContent, i) => {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          message.addReply({ type: 'text', content: 'Merci de nous avoir accordé de votre temps. Bonne journée' })
        }
      })
    }
  } else if ((result.action && result.action.slug === 'phone') || (result.entities && result.entities.phone)) {
    if (text[0] === '0' && /[0-9]{6,30}/g.test(text)) {
      var num = null
      try {
        num = phoneUtil.format(phoneUtil.parse(text, isFB ? local : 'FR'), PNF.E164)
      } catch (e) {
        console.log('no matching')
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            message.addReply({ type: 'text', content: replyContent })
          }
        })
      }
      try {
        var numRes = await Query(connection, num)
        if (numRes && numRes.length) {
          console.log(numRes)
          result.replies.forEach((replyContent, i) => {
            if (i < length) {
              message.addReply({ type: 'text', content: replyContent })
            } else {
              message.addReply({
                type: 'quickReplies',
                content: {
                  title: 'Préférez vous être contacté par Messenger ou Voxist?',
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
              })
            }
          })
        } else {
          console.log('no results')
          result.replies.forEach((replyContent, i) => {
            if (i < length) {
              message.addReply({ type: 'text', content: replyContent })
            } else {
              message.addReply({
                type: 'quickReplies',
                content: {
                  title: 'Nous n\'avons pas trouvez votre numéro. Voulez vous testez Voxist?',
                  buttons: [
                    {
                      title: 'Oui',
                      value: 'test'
                    },
                    {
                      title: 'Non',
                      value: 'test pas'
                    }
                  ]
                }
              })
            }
          })
        }
        connection.destroy()
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

export const englishReply = async (result, message, text, isFB, local, length) => {
  const connection = mysql.createConnection(process.env.SQL_HOST)
  if ((result.action && result.action.slug === 'bonjour') || (result.entities && result.entities.salutations)) {
    result.replies.forEach((replyContent, i) => {
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
                value: 'no'
              }
            ]
          }
        })
      }
    })
  } else if ((result.action && result.action.slug === 'non') || (result.entities && result.entities.non1)) {
    result.replies.forEach((replyContent, i) => {
      if (i < length) {
        message.addReply({ type: 'text', content: replyContent })
      } else {
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
      }
    })
  } else if (result.action && result.action.slug === 'testservice') {
    if (text.toLocaleLowerCase() === 'try1') {
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
        result.replies.forEach((replyContent, i) => {
          if (i < length) {
            message.addReply({ type: 'text', content: replyContent })
          } else {
            message.addReply({ type: 'text', content: replyContent })
          }
        })
      }
      try {
        var numRes = await Query(connection, num)
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
                      value: 'app'
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
            }
          })
        }
        connection.destroy()
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
