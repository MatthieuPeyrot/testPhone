import mysql from 'mysql'
const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const Query = (connection, num) => {
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

const frenchReply = async (result, message, text, isFB, local, length) => {
  const connection = mysql.createConnection(process.env.SQL_HOST)
  if ((result.action && result.action.slug === 'bonjour') || (result.entities && result.entities.salutations)) {
    if (!local) {
      result.replies.forEach((replyContent, i) => {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          message.addReply({
            type: 'quickReplies',
            content: {
              title: 'Bonjour! Nous avons besoin de connaître votre pays?',
              buttons: [
                {
                  title: 'France',
                  value: 'France'
                },
                {
                  title: 'Royaume-Uni',
                  value: 'Royaume-Uni'
                },
                {
                  title: 'Etats Unis',
                  value: 'Etats Unis'
                },
                {
                  title: 'Australie',
                  value: 'Australie'
                },
                {
                  title: 'Espagne',
                  value: 'Espagne'
                },
                {
                  title: 'Pologne',
                  value: 'Pologne'
                },
                {
                  title: 'Pays Bas',
                  value: 'Pays Bas'
                },
                {
                  title: 'Autre',
                  value: 'Autre'
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
    }
  } else if ((result.action && result.action.slug === 'country') || (result.entities && result.entities.salutations)) {
    result.replies.forEach((replyContent, i) => {
      if (!local) {
        message.addReply({ type: 'text', content: 'Malheureusement Voxist n\'est pas encore disponible dans votre pays.' })
      } else {
        if (i < length) {
          message.addReply({ type: 'text', content: replyContent })
        } else {
          message.addReply({
            type: 'quickReplies',
            content: {
              title: 'Utilisez vous déjà Voxist?',
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
              title: 'Voulez vous testez Voxist?',
              buttons: [
                {
                  title: 'Oui',
                  value: 'test oui'
                },
                {
                  title: 'Non',
                  value: 'test pas'
                }
              ]
            }
          })
        } else {
          message.addReply({ type: 'text', content: 'Malheureusement les tests ne sont pas disponibles dans votre pays.' })
        }
      }
    })
  } else if (result.action && result.action.slug === 'testservice') {
    if (text.toLocaleLowerCase() === 'test oui') {
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
                      value: 'messenger de facebook'
                    },
                    {
                      title: 'Voxist',
                      value: 'l\'application voxist'
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
                    title: 'Nous n\'avons pas trouvez votre numéro. Voulez vous testez Voxist?',
                    buttons: [
                      {
                        title: 'Oui',
                        value: 'test oui'
                      },
                      {
                        title: 'Non',
                        value: 'test pas'
                      }
                    ]
                  }
                })
              } else {
                message.addReply({ type: 'text', content: 'Nous n\'avons pas trouvez votre numéro. Et les tests ne sont pas disponibles dans votre pays.' })
              }
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

export default frenchReply
